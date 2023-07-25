const  db  = require('../models')
const User = db.user;
const express = require('express')
const bcrypt = require('bcryptjs')

exports.create = (req, res) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        role: req.body.role
    })

     res.redirect('/admin/users');
}

exports.update = (req, res) => {
    const email = req.params.email

    User.update({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        role: req.body.role
    }, {
        where: {email:email}
    })

    res.redirect('/admin/users/edit/' + email)
}

exports.findAll = (req, res) => {
    User.findAll().then((user) => {
        res.render('userAdmin', {data: user})
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    })
}

exports.findOne = (req, res) => {
    const email = req.params.email
    User.findByPk(email).then((user) => {
        if(user){
            res.render('EdituserAdmin', {data: user})
        }else{
            res.redirect('/admin/users')
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error retrieving User with email=" + email
        })
    })
}

exports.delete = (req, res) => {
    const email = req.params.email;

    User.destroy({
        where: { email: email}
    })
    
    res.redirect('/admin/users')
}
