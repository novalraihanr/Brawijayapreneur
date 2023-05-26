const config = require('../config/auth');
const { db } = require('../models')
const User = db.user
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const express = require('express')

exports.register = async (req, res) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    return res.redirect('/login');

    // res.status(201).json({
    //     success : true
    // });


    // User.findOne({
    //     where: {
    //         email: req.body.email
    //     }  
    // })
    // .then((user) => {
    //     if(user) {
    //         return res.status(404).json({
    //             massage: 'email is exist, cannot create the same email'
    //         }) 
    //     }
        
    // })
    // .catch((err) => {
    //     res.status(500).json({
    //         massage: err.massage
    //     })
    // })
}

exports.login = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {
        if(!user) {
            return res.status(404).json({
                massage: 'email not found'
            }) 
        }
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

        if(!passwordIsValid) {
            return res.status(400).json({
                accessToken: null,
                massage: 'invalid password'
            })
        }

        const userData = {
            id: user.id,
            name: user.name,
            email: user.email
        }

        const token = jwt.sign(userData, config.secret, {
            expiresIn: 86400
        })

        res.cookie("token", token, {
            httpOnly: true,
        });
        
        res.redirect('/welcomeHome')

        // res.status(200).json({
        //     id: user.id,
        //     name: user.name,
        //     email: user.email,
        //     accessToken: token,
        //     massage: "login berhasil"
        // })
    }).catch((err) => {
        res.status(500).json({
            massage: err.massage
        })
    })

    
}
