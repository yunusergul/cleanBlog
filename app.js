const express = require('express');
const mongoose = require('mongoose');

const ejs = require('ejs');
const path = require('path');

const Content = require('./models/content')

const app = express();


//connect DB
mongoose.connect('mongodb://127.0.0.1:27017/cleanBlog-onn-db');


//template engine
app.set("view engine", "ejs");

//middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());


app.get('/', async (req, res) => {
  const contents = await Content.find({})
  res.render('index',{
    contents
  })
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

app.post('/content', async (req, res)=>{
  await Content.create(req.body)
  res.redirect('/')
})


const port = 3000;
app.listen(port, () => {
  console.log(` localhost:${port}`);
});
