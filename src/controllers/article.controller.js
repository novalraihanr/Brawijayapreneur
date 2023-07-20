const  db  = require('../models')
const Article = db.article;
const express = require('express')
const path = require("path")

exports.create = (req, res) => {
    Article.create({
        id_article: req.body.id_article,
        title : req.body.title,
        author : req.body.author,
        tags : req.body.tags,
        file_url : '\\'+ req.file.path
    })

     res.redirect('/admin/articles');
}

exports.download = (req, res) => {
    const id = req.params.id
    Article.findByPk(id).then((article) => {
        var file = path.resolve(__dirname, '..') + '\\' +article.file_url.split('\\').slice(2).join('\\')
        res.download(file)
    })
}

exports.findAllAdmin = (req, res) => {
    Article.findAll().then((article) => {
        res.render('articleAdmin', {data: article})
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id
    Article.findByPk(id).then((article) => {
        res.render('EditarticleAdmin', {data: article})
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    })
}

exports.findAll = (req, res) => {
    Article.findAll().then((article) => {
        res.render('article', {data: article})
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    })
}

exports.findAllinTags = (req, res) => {
    const tags = req.query.tags
    if(tags == "all"){
        Article.findAll().then((article) => {
            res.render('article', {data: article})
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        })
    }else{
        Article.findAll({
            where : {
                tags: tags
            }
        }).then((article) => {
            console.log(article)
            res.render('article', {data: article})
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        })
    }
}

exports.findAllinTagsAdmin = (req, res) => {
    const tags = req.query.tags
    if(tags == "all"){
        Article.findAll().then((article) => {
            res.render('articleAdmin', {data: article})
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        })
    }else{
        Article.findAll({
            where : {
                tags: tags
            }
        }).then((article) => {
            console.log(article)
            res.render('articleAdmin', {data: article})
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        })
    }
}

exports.update = (req, res) => {
    const id = req.params.id

    Article.update({
        id_article: req.body.id_article,
        title: req.body.title,
        author: req.body.author,
        tags: req.body.tags
    }, {
        where: {id_article:id}
    })

    res.redirect('/admin/articles/edit/' + id.toString())
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Article.destroy({
        where: { id_article: id}
    })
    
    res.redirect('/admin/articles')
}
