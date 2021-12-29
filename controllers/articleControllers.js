const Content = require('../models/content');
const fs = require('fs');
const Photo = require('../../PCAT/models/Photo');

exports.getDetailArticle = async (req, res) => {
  const content = await Content.findById(req.params.id);
  res.render('posts', {
    content,
  });
};

exports.addContent = async (req, res) => {
  const uploadDir = 'public/uploads';
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  let uploadImage = req.files.image;
  let UploadPath = __dirname + '/../public/uploads/' + uploadImage.name;
  uploadImage.mv(UploadPath, async () => {
    await Content.create({
      ...req.body,
      slidePhoto: '/uploads/' + uploadImage.name,
    });
    res.redirect('/');
  });
};

exports.getAllPost = async (req, res) => {
  const page = req.query.page || 1;
  const photoPerPage = 3;
  const totalPhotos= await Content.find().countDocuments();
  const contents = await Content.find({})
  .sort('-dateCreated')
  .skip((page-1)*photoPerPage)
  .limit(photoPerPage)
  res.render('index', {
    contents,
    current:page,
    pages:Math.ceil(totalPhotos/ photoPerPage)
  });
};

exports.deletePost = async (req, res) => {
  const content = await Content.findOne({ _id: req.params.id });
  let deleteImage = __dirname + '/../public' + content.slidePhoto;
  fs.unlinkSync(deleteImage);
  await Content.findByIdAndRemove(req.params.id);

  res.redirect('/');
};

exports.UpdatePost = async (req, res) => {
  const content = await Content.findOne({ _id: req.params.id });
  content.title = req.body.title;
  content.descriptions = req.body.descriptions;
  content.save();
  res.redirect(`/articles/${req.params.id}`);
};
