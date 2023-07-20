const  db  = require('../models')
const User = db.user
const Article = db.article 
const express = require('express')

exports.count = (req,res,next) => {
    User.count().then(user => {
        Article.count().then(article => {
            const data = {
                userTotal : user.toString(),
                articleTotal : article.toString()
            }
            //  res.json(data);
            res.render('indexAdmin', {UserCount: data.userTotal, ArticleCount: data.articleTotal})
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        })
     }).catch(err => {
         res.status(500).send({
             message: err.message
         });
     })
 }

 