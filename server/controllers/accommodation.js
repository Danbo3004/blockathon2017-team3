exports.getAll = (req, res) => {
    try {
        var db = require('../../database')
        var Accommodation = require('../models/accommodation')(db)
        Accommodation.find({}, (err, accommodations) => {
            if(err) res.send('Error: ' + err)
            res.send(accommodations)
        })
    } catch(e) {
        res.send('Error' + e.message);
    }
}

exports.get = (req, res) => {
    try {
        var id = req.params.id
        var db = require('../../database')
        var Accommodation = require('../models/accommodation')(db)
        Accommodation.findOne({ id }, (err, accommodation) => {
            if (err) res.send('Error: ' + err)
            res.send(accommodation)
        })
    } catch (e) {
        res.send('Error: ' + e.message);
    }
}

exports.create = function(req, res) {
    try {
        var data = req.body
        var db = require('../../database')
        var Accommodation = require('../models/accommodation')(db);
        var newAccommodation = {
            name    : data.name,
            image   : data.image,
            price   : data.price,
        }
        new Accommodation(newAccommodation).save((err, newAcc) => {
            if(err) res.send('Error: ' + err)
            res.send(newAcc)
        })
    } catch(e) {
        res.send('Error: ' + e.message);
    }
}