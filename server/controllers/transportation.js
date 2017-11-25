exports.getAll = (req, res) => {
    try {
        var db = require('../../database')
        var Transportation = require('../models/transportation')(db)
        Transportation.find({}, (err, transportations) => {
            if (err) res.send('Error: ' + err)
            res.send(transportations)
        })
    } catch (e) {
        res.send('Error: ' + e.message);
    }
}

exports.get = (req, res) => {
    try {
        var id = req.query.id
        var db = require('../../database')
        var Transportation = require('../models/transportation')(db)
        Transportation.findOne({id}, (err, transportation) => {
            if(err) res.send('Error: ' + err)
            res.send(transportation)
        })
    } catch (e) {
        res.send('Error: ' + e.message);
    }
}

exports.create = function (req, res) {
    try {
        var data = req.body
        var db = require('../../database')
        var Transportation = require('../models/transportation')(db);
        var newTransportation = {
            means: data.means,
        }
        new Transportation(newTransportation).save((err, newTran) => {
            if (err) res.send('Error: ' + err)
            res.send(newTran)
        })
    } catch (e) {
        res.send('Error: ' + e.message);
    }
}