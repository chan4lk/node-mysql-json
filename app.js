const express = require('express');
const app = express();
const port = 3000;
const { User, db } = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', async (req, res) => {
  try {
    await db.sync();
    const users = await User.findAll();

    res.send(users);
  } catch (error) {
    res.send(error);
  }
});
app.get('/create', (req, res) => {
  let user = req.query.user;
  let like = req.query.like;
  User.create({
    username: user,
    jsonField: {
      likes: [like],
    },
  })
    .then(function (user) {
      user.jsonField.likes.push('tests');
      return user.save();
    })
    .then(function (user) {
      res.send('User created');
    });
});

app.post('/create', (req, res) => {
  let data = req.body;

  User.create({
    username: 'user',
    jsonField: data,
  }).then(function (user) {
    res.send('User created');
  });
});

app.delete('/:id', (req, res) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => user.destroy())
    .then((resp) => res.send('User deleted'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
