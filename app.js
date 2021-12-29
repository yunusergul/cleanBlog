const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');

const ejs = require('ejs');

const pageCppntroller = require('./controllers/pageControllers');
const articleControllers = require('./controllers/articleControllers');
const app = express();

//connect DB
mongoose.connect('mongodb://127.0.0.1:27017/cleanBlog-onn-db');

//template engine
app.set('view engine', 'ejs');

//middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

app.get('/update_post', pageCppntroller.updatePost);
app.get('/add_post', pageCppntroller.getAddAticle);
app.get('/about', pageCppntroller.getAboutPage);
app.get('/articles/edit/:id', pageCppntroller.UpdatePostPage);
app.get('/', articleControllers.getAllPost);

app.post('/articles', articleControllers.addContent);
app.get('/articles/:id', articleControllers.getDetailArticle);
app.delete('/articles/:id', articleControllers.deletePost);
app.put('/articles/:id', articleControllers.UpdatePost);

const server = app.listen(process.env.PORT || 5000, () => {
  const port = server.address().port;
  console.log(`Express is working on port ${port}`);
});