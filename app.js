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
    res.status(400).send(error);
  }
});
app.get('/user/:id', (req, res) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => res.send(user))
    .catch((e) => res.status(400).send(e));
});

app.post('/user', (req, res) => {
  let data = req.body;

  User.create({
    username: 'user',
    jsonField: data,
  })
    .then(function (user) {
      res.send('User created');
    })
    .catch((e) => res.status(400).send(e));
});

app.delete('/user/:id', (req, res) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => user.destroy())
    .then((resp) => res.send('User deleted'))
    .catch((e) => res.status(400).send(e));
});

app.put('/user/:id', (req, res) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      user.jsonField = req.body;
      return user.save();
    })
    .then((resp) => res.send('User updated'))
    .catch((e) => res.status(400).send(e));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
