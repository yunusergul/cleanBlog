const express = require('express');
const ejs = require('ejs');
const app = express();

app.set("view engine", "ejs")
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
});

app.get('/post', (req, res) => {
  res.render('post')
});

app.get('/add_post', (req, res) => {
  res.render('add_post')
});

app.get('/about', (req, res) => {
  res.render('about')
});

const port = 3000;
app.listen(port, () => {
  console.log(` localhost:${port}`);
});
