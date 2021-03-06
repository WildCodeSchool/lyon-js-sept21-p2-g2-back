const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const connection = require('./db-config');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const privateKey = process.env.UPLOAD_CARE_PRIVATE_KEY;
const publicKey = process.env.UPLOAD_CARE_PUBLIC_KEY;
function extractImageUrlsFromGroupUrl(groupId) {
  return axios
    .get(`https://api.uploadcare.com/groups/${groupId}/`, {
      headers: {
        Authorization: `Uploadcare.Simple ${publicKey}:${privateKey}`,
        Accept: 'application/vnd.uploadcare-v0.5+json',
      },
    })
    .then((res) => res.data.files.map((f) => f.original_file_url));
}

app.get('/destinations/:destination/blog-posts', (req, res) => {
  const { destination } = req.params;
  let sql =
    'SELECT p.id, p.authorId, p.pictures, p.postContent, p.country, p.tripDate, u.username, u.avatar FROM post p INNER JOIN user u ON p.authorId = u.id WHERE country = (?)';
  let parameters = [destination];
  if (req.query.tags) {
    if (typeof req.query.tags === 'string') {
      sql = `SELECT p.id, p.authorId, p.pictures, p.postContent, p.country, p.tripDate, u.username, u.avatar FROM post p INNER JOIN user u ON p.authorId = u.id INNER JOIN post_tag t ON p.id = t.postId WHERE p.country=? AND tags LIKE ?`;
      parameters.push(`%${req.query.tags}%`);
    } else {
      sql =
        'SELECT p.id, p.authorId, p.pictures, p.postContent, p.country, p.tripDate, u.username, u.avatar FROM post p INNER JOIN user u ON p.authorId = u.id INNER JOIN post_tag t ON p.id = t.postId WHERE p.country=? AND (tags LIKE ?';
      let tagsArray = [];
      for (let i = 0; i < req.query.tags.length; i++) {
        let foundTag = `%${req.query.tags[i]}%`;
        tagsArray.push(foundTag);
        if (tagsArray.length === req.query.tags.length) {
          sql += ' OR tags LIKE ?)';
        } else if (tagsArray.length > 1) {
          sql += ' OR tags LIKE ?';
        }
      }
      tagsArray.unshift(destination);
      parameters = tagsArray;
    }
  }
  connection.query(sql, parameters, (err, results) => {
    if (err) {
      res.status(500).send(`An error occurred: ${err.message}`);
    } else {
      // eslint-disable-next-line
      console.log(results);
      res.status(200).send(results);
    }
  });
});

app.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  connection.query(
    'SELECT p.*, u.* FROM post p INNER JOIN user u ON p.authorId = u.id WHERE p.id = (?)',
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send(`An error occurred: ${err.message}`);
      } else {
        res.status(200).send(results);
      }
    }
  );
});

app.get('/posts/:id/comments', (req, res) => {
  const { id } = req.params;
  connection.query(
    'SELECT * FROM comment WHERE postId = (?)',
    [id],
    (err, results) => {
      if (err) {
        res.status(500).send(`An error occurred: ${err.message}`);
      } else {
        res.status(200).send(results);
      }
    }
  );
});

app.post('/destinations/:destination/blog-posts', (req, res) => {
  const { name, avatar, date, message, tags, photos } = req.body;
  const { destination } = req.params;
  extractImageUrlsFromGroupUrl(photos).then((pictures) => {
    let extractedPhotos = pictures.toString();
    connection.query(
      'SELECT * FROM user WHERE username = (?)',
      [name],
      (err, result) => {
        console.error(err);
        if (result[0]) {
          console.log('Username already exists');
          const existingID = result[0].id;
          connection.query(
            'INSERT INTO post (authorId, tripDate, postContent, pictures, country) VALUES (?, ?, ?, ?, ?)',
            [existingID, date, message, extractedPhotos, destination],
            (err, result) => {
              console.error(err);
              if (err) {
                res.status(500).send(`An error occurred: ${err.message}`);
              } else {
                connection.query(
                  'INSERT INTO post_tag (postId, tags) VALUES (?, ?)',
                  [result.insertId, tags],
                  (err) => {
                    if (err) res.status(500).send(err.message);
                    else {
                      res.status(201).send({
                        id: result.insertId,
                        date,
                        message,
                        tags,
                        extractedPhotos,
                        destination,
                      });
                    }
                  }
                );
              }
            }
          );
        } else {
          connection.query(
            'INSERT INTO user(username, avatar) VALUES (?, ?)',
            [name, avatar],
            (err, results) => {
              if (err) {
                res.status(500).send(`An error occurred: ${err.message}`);
              } else {
                const insertedID = results.insertId;
                connection.query(
                  'INSERT INTO post (authorId, tripDate, postContent, pictures, country) VALUES (?, ?, ?, ?, ?)',
                  [insertedID, date, message, extractedPhotos, destination],
                  (err, result) => {
                    if (err) {
                      res.status(500).send(`An error occurred: ${err.message}`);
                    } else {
                      connection.query(
                        'INSERT INTO post_tag (postId, tags) VALUES (?, ?)',
                        [result.insertId, tags],
                        (err) => {
                          if (err) res.status(500).send(err.message);
                          else {
                            res.status(201).send({
                              id: result.insertId,
                              date,
                              message,
                              tags,
                              extractedPhotos,
                              destination,
                            });
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  });
});

app.post('/blog-posts/:id/comments', (req, res) => {
  const { commentAuthor, content } = req.body;
  const { id } = req.params;
  connection.query(
    'INSERT INTO comment(postId, commentAuthor, content) VALUES (?, ?, ?)',
    [id, commentAuthor, content],
    (err, results) => {
      if (err) {
        res.status(500).send(`An error occurred: ${err.message}`);
      } else {
        res.status(201).send(results);
      }
    }
  );
});

app.listen(5000, () => console.log('server listening on port 5000'));
