
const Content = require('../models/content')
exports.getAddAticle = (req, res) => {
    res.render('add_post')
  }

  exports.updatePost =  (req, res) => {
    res.render('update_post')
  }

exports.getAboutPage = (req, res) => {
    res.render('about')
  }

  exports.UpdatePostPage = async (req, res) => {
    const content = await Content.findOne({_id: req.params.id});
    res.render('update_post', {
        content
    })
  }