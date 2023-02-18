'user strict';
var dbConn = require('./../db/db.config');

var UserModel = function (userModel) {
    this.first_name = userModel.first_name;
    this.last_name = userModel.last_name;
    this.email = userModel.email;
    this.phone = userModel.phone;
    this.password = userModel.password;
};

UserModel.create = function (newUser, result) {
    dbConn.query("INSERT INTO user set ?", newUser, function (err, res) {
        try {
            if (err) {
                result(err, null);
            } else {
                result(null, res.insertId);
            }
        } catch (er) {

        }
    });
};

UserModel.findById = function (email, result) {
    dbConn.query("Select * from user where email = ? ", email, function (err, res) {
        try {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        } catch (er) {

        }
    });
};

UserModel.findAll = function (result) {
    dbConn.query("Select * from user", function (err, res) {
        if (err) {
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

module.exports = UserModel;
