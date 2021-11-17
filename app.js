const express = require('express');
const cors = require('cors');
const uniqid = require('uniqid');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const connection = require('./db-config');

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
  } else {
    console.log(
      'connected to database with threadId :  ' + connection.threadId
    );
  }
});

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
  connection.query(
    'SELECT * FROM post INNER JOIN user ON authorId = user.id WHERE country = (?)',
    [destination],
    (err, results) => {
      if (err) {
        res.status(500).send(`An error occurred: ${err.message}`);
      } else {
        res.status(200).send(results);
      }
    }
  );
});

app.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  connection.query(
    'SELECT * FROM post p INNER JOIN user ON authorId = user.id WHERE authorId = (?)',
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
  const { name, date, message, photos } = req.body;
  const { destination } = req.params;
  extractImageUrlsFromGroupUrl(photos).then((pictures) => {
    let extractedPhotos = pictures.toString();

    connection.query(
      'SELECT username FROM user WHERE '
      'INSERT INTO user(username) VALUES (?)',
      [name],
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
                res.status(201).send(result);
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
