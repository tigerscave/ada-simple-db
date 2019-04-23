const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5420;

const db = require('./queries');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use("/public", express.static(__dirname + "/public"));

app.get('/', (req, res) => {
  res.render('index.ejs')
});

app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.get('/createUser', (req, res) => {
  res.render('createUser.ejs')
})
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);

app.set('view engine', 'ejs');


app.listen(port, () => {
  console.log(`App runnning on port ${port}.`)
});