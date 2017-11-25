exports.getAll = (req, res) => {
    try {
        var db = require('../../database')
        var Plan = require('../models/plan')(db)
        Plan.find({}, (err, plans) => {
            if (err) res.send('Error: ' + err)
            res.send(plans)
        })
    } catch (e) {
        res.send('Error: ' + e.message);
    }
}

exports.get = (req, res) => {
    try {
        var _id = req.query.id
        var db = require('../../database')
        var Plan = require('../models/plan')(db)
        var Transportation = require('../models/transportation')(db)
        var Calendar = require('../models/calendar')(db)
        var Accommodation = require('../models/accommodation')(db)

        Plan.findOne({ _id })
            .populate('transportation')
            .populate('calendar')
            .populate('accommodation')
            .exec((err, plan) => {
            if (err) res.send('Error: ' + err)
            res.send(plan)
        })
    } catch (e) {
        res.send('Error: ' + e.message);
    }
}

exports.create = function (req, res) {
    try {
        var data = req.body
        var db = require('../../database')
        var Plan = require('../models/plan')(db);
        var newPlan = {
            transportation: data.transportation,
            calendar: data.calendar,
            accommodation: data.accommodation
        }
        new Plan(newPlan).save((err, newPln) => {
            if (err) res.send('Error: ' + err)
            res.send(newPln)
        })
    } catch (e) {
        res.send('Error: ' + e.message);
    }
}