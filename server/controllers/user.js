exports.getAll = (req, res) => {
    try {
        var db = require('../../database')
        var User = require('../models/user')(db)
        User.find({}, (err, users) => {
            if (err) res.send('Error: ' + err)
            res.send(users)
        })
    } catch (e) {
        res.send('Error' + e.message);
    }
}

exports.get = (req, res) => {
    try {
        var _id = req.query.id
        var db = require('../../database')
        var User = require('../models/user')(db)
        User.findOne({ _id }, (err, user) => {
            if (err) res.send('Error: ' + err)
            res.send(calendar)
        })
    } catch (e) {
        res.send('Error: ' + e.message);
    }
}

exports.create = function (req, res) {
    try {
        var data = req.body
        var db = require('../../database')
        var User = require('../models/user')(db);
        var newUser = {
            fullName: data.fullName,
            avatar: data.avatar,
            gender: data.gender,
            email: data.email,
        }
        new User(newUser).save((err, newUsr) => {
            if (err) res.send('Error: ' + err)
            res.send(newUsr)
        })
    } catch (e) {
        res.send('Error: ' + e.message);
    }
}