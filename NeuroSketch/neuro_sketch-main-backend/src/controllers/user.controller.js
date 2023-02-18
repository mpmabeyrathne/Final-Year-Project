'use strict';

const UserModel = require('../models/user.model');

exports.findAll = function (req, res) {
    UserModel.findAll(function (err, user) {
        try {
            if (err)
                res.send(err);
            res.send(user);
        } catch (er) {

        }
    });
};


exports.create = function (req, res) {


    try {
        const new_user = new UserModel(req.body);

        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({error: true, message: 'Please provide all required field'});
        } else {
            UserModel.create(new_user, function (err, user) {
                if (err)
                    res.send(err);
                res.json(
                    {
                        error: false,
                        message: "User added successfully!",
                        data: user
                    });
            });
        }
    } catch (er) {
    }
};


exports.findById = function (req, res) {
    try {
        UserModel.findById(req.params.email, function (err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    } catch (er) {
    }
};
