exports.getAll = (req, res) => {
    try {
        var db = require('../../database')
        var Accommodation = require('../models/accommodation')(db)
        Accommodation.find({}, (err, accommodations) => {
            if(err) resizeBy.send('Error: ' + err)
            res.send(accommodations)
        })
    } catch(e) {
        res.send('Error' + e.message);
    }
}

exports.create = function(req, res) {
    try {
        debugger
        var data = req.body.data
        var db = require('../../database')
        var newAccommodation = {
            name    : data.name,
            image   : data.image,
            price   : data.price,
        }
        new Accommodation(newAccommodation).save((err, newAcc) => {
            debugger
            if(err) res.send('Error: ' + err)
            res.send(newAcc)
        })
    } catch(e) {
        res.send('Error: ' + e.message);
    }
}