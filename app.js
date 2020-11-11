const express = require('express');
const app = express();
const port = 3000;
const { User, db } = require('./db');

app.get('/', async (req, res) => {
  await db.sync();
  const users = await User.findAll();

  res.send(users);
});
app.get('/create', (req, res) => {
  User.create({
    username: 'Scott',
    jsonField: {
      likes: ['running', 'node'],
    },
  })
    .then(function (user) {
      user.jsonField.likes.push('tests');
      return user.save();
    })
    .then(function (user) {
      res.send('Hello World!');
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
