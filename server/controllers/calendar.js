exports.getAll = (req, res) => {
    try {
        var db = require('../../database')
        var Calendar = require('../models/calendar')(db)
        Calendar.find({}, (err, calendars) => {
            if (err) res.send('Error: ' + err)
            res.send(calendars)
        })
    } catch (e) {
        res.send('Error' + e.message);
    }
}

exports.get = (req, res) => {
    try {
        var id = req.params.id
        var db = require('../../database')
        var Calendar = require('../models/calendar')(db)
        Calendar.findOne({ id }, (err, calendar) => {
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
        var Calendar = require('../models/calendar')(db);
        var newCalendar = {
            destination: data.destination,
            from: data.from,
            from: data.to,
        }
        new Calendar(newCalendar).save((err, newCal) => {
            if (err) res.send('Error: ' + err)
            res.send(newCal)
        })
    } catch (e) {
        res.send('Error: ' + e.message);
    }
}