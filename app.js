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

const blogPosts = [
  {
    id: 1,
    name: 'Nicolas C.',
    avatar:
      'https://images.unsplash.com/photo-1623330188314-8f4645626731?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=417&q=80https://unsplash.com/photos/-Tc8w2Kvsf8',
    date: { beginning: '12.06.2020', end: '21.06.2020' },
    message:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
    tags: ['food', 'thrills', 'hiking'],
    photos: [
      'https://images.unsplash.com/photo-1523592121529-f6dde35f079e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',

      'https://images.unsplash.com/photo-1501179691627-eeaa65ea017c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      'https://images.unsplash.com/photo-1526494631344-8c6fa6462b17?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
    ],
    country: 'indonesia',
  },
  {
    id: 2,
    name: 'Erembert Q.',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
    date: { beginning: '24.02.2019', end: '22.03.2019' },
    message:
      'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
    tags: ['architecture', 'museum', 'history', 'culture'],
    photos: [
      'https://images.unsplash.com/photo-1545889238-ae8ff5ab582f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=869&q=80',
      'https://images.unsplash.com/photo-1588388866431-15cbdbe37634?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
      'https://images.unsplash.com/photo-1586397205525-231a3e327902?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
    ],
    country: 'argentina',
  },
  {
    id: 3,
    name: 'Joshua B.',
    avatar:
      'https://images.unsplash.com/photo-1624561172888-ac93c696e10c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=389&q=80',
    date: { beginning: '02.09.2021', end: '16.09.2021' },
    message: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
    totam quis nam. Placeat modi error non eveniet eligendi expedita autem
    officia? Aperiam soluta, iste sequi, perferendis aliquam molestiae
    expedita nisi molestias asperiores quidem, omnis veritatis. Commodi
    cupiditate nulla quo ab quod accusamus ex? Aperiam fugiat dolores
    quaerat nam rem, a nihil ex? Pariatur in ullam delectus eius. Ad, illum
    neque.`,
    tags: ['music', 'religion', 'culture'],
    photos: [
      'https://images.unsplash.com/photo-1480796927426-f609979314bd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
      'https://images.unsplash.com/photo-1528164344705-47542687000d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=892&q=80',
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
      'https://images.unsplash.com/photo-1533050487297-09b450131914?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    ],
    country: 'japan',
  },
];

app.get('/destinations/:destination/blog-posts', (req, res) => {
  const { destination } = req.params;
  // console.log(destination);
  connection.query(
    `SELECT * FROM post WHERE country=${destination}`,
    (err, results) => {
      if (err) {
        res.status(500).send(`An error occurred: ${err.message}`);
      } else {
        res.status(200).send(results);
      }
    }
  );
  // res.send(blogPosts.filter((post) => post.country === destination));
});

app.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.send(blogPosts.filter((post) => post.id === parseInt(id)));
});

app.post('/destinations/:destination/blog-posts', (req, res) => {
  const { name, message, date, tags, photos } = req.body;
  console.log(photos);
  extractImageUrlsFromGroupUrl(photos).then((pictures) => {
    const { destination } = req.params;
    const newPost = {
      id: uniqid(),
      name,
      message,
      date,
      tags,
      photos: pictures,
      country: destination,
    };
    res.send('Received data');

    blogPosts.push(newPost);
    console.log(newPost);
  });
});

// app.post('/destinations/:destination/blog-posts', (req, res) => {
//   const { name } = req.body;
//   const { destination } = req.params;
//   const newPost = {
//     name,
//     country: destination,
//   };
//   console.log(newPost);
//   res.send('Received data');

//   connection.query(
//     'INSERT INTO test2 (name, country) VALUES (?, ?)',
//     [name, destination],
//     function (err) {
//       if (err) throw err;
//       console.log('DONE');
//     }
//   );
// });

app.listen(5000, () => console.log('server listening on port 5000'));
