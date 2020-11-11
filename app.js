const express = require('express');
const app = express();
const port = 3000;
const { User, db } = require('./db');

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
