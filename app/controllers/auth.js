var logger = require('../utils/logger');
    UserModel = require('../models/user'),
    jwt = require('jwt-simple'),
    config = require('../config/env'),
    _ = require('lodash');

function AuthCtrl () {
    var me = this;

    me.login = function (req, res) {
        var username = req.body.username,
            password = req.body.password;

        if (_.isEmpty(username) || _.isEmpty(password)) {
            return res.status(400).send('Missing username or password');
        }

        UserModel.findOne({username: username}, function (err, user) {
            if (err) {
                logger.trace(err);
                return res.status(500).send(err.toString());
            }

            if (!user) return res.status(404).send('User\'s not found');

            if (user.password !== password) return res.status(400).send('Invalid password');

            var token = jwt.encode({
                id: user._id.toString(),
                username: user.username.toString()
            }, config.auth.secret);

            res.json({token: token});
        });

    }

    me.register = function (req, res) {
        var username = req.body.username,
            password = req.body.password;

        if (_.isEmpty(username) || _.isEmpty(password)) {
            return res.status(400).send('Missing username or password');
        }

        UserModel.findOne({username: username}, function (err, user) {
            if (err) {
                logger.trace(err);
                return res.status(500).send(err.toString());
            }

            if (user) return res.status(400).send('User already registered');

            UserModel.create({username: username, password: password}, function (err, user) {
                if (err) {
                    logger.trace(err);
                    return res.status(500).send(err.toString());
                }

                res.status(201).end();
            });
        });

    }


}

module.exports = new AuthCtrl();
