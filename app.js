const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const blogPosts = [
  {
    id: 1,
    name: 'Nicolas C.',
    avatar:
      'https://images.unsplash.com/photo-1623330188314-8f4645626731?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=417&q=80https://unsplash.com/photos/-Tc8w2Kvsf8',
    date: { beginning: '12/06/2020', end: '21/06/2020' },
    message: 'blablabla',
    tags: ['food', 'thrills', 'hiking'],
    photos: [],
    country: 'indonesia',
  },
  {
    id: 2,
    name: 'Erembert Q.',
    avatar: 'https://unsplash.com/photos/6anudmpILw4',
    date: { beginning: '24/02/2019', end: '22/03/2019' },
    message: 'blablablablabla',
    tags: ['architecture', 'museum', 'history', 'culture'],
    photos: [],
    country: 'ivory coast',
  },
  {
    id: 3,
    name: 'Joshua B.',
    avatar:
      'https://images.unsplash.com/photo-1624561172888-ac93c696e10c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=389&q=80',
    date: { beginning: '02/09/2021', end: '16/09/2021' },
    message: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
    totam quis nam. Placeat modi error non eveniet eligendi expedita autem
    officia? Aperiam soluta, iste sequi, perferendis aliquam molestiae
    expedita nisi molestias asperiores quidem, omnis veritatis. Commodi
    cupiditate nulla quo ab quod accusamus ex? Aperiam fugiat dolores
    quaerat nam rem, a nihil ex? Pariatur in ullam delectus eius. Ad, illum
    neque.`,
    tags: ['music', 'religion', 'culture'],
    photos: [],
    country: 'japan',
  },
];

app.get('/destinations/:destination/blog-posts', (req, res) => {
  const { destination } = req.params;
  console.log(destination);
  res.send(blogPosts.filter((post) => post.country === destination));
});

app.get('/blog-posts/:id');

app.post('/destinations/:destination/blog-posts');

app.listen(5000, () => console.log('server listening on port 5000'));
