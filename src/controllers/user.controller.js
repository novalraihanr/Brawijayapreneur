const  db  = require('../models')
const User = db.user;
const express = require('express')

exports.count = (req,res,next) => {
    User.findAll({
        attributes: [[db.sequelize.fn('count', db.sequelize.col('email')), 'count']]
    }).then(user => {
        res.json({data: user});
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    })
}

exports.findAll = (req, res) => {
    User.findAll().then(user => {
        res.send(user);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    })
}

exports.findOne = (req, res) => {
    const email = req.params.email
    User.findByPk(id).then(user => {
        if(user){
            res.send(user);
        }else{
            res.status(404).send({
                message: `Cannot find User with email=${email}.`
            });
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
    }).then(num => {
        if(num == 1){
            res.send({
                message: "User was successfully deleted"
            })
        }else {
            res.send({
                message: `Cannot delete User with email=${email}.`
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: "Could not delete User with email=" + email
        })
    })        
}
