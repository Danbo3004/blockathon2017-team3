
exports.get = (req, res) => {
    try {
        var db = require('../../database')
        var Test = require('../models/test')(db);
        Test.find({}, (err, test) => {
            if(err) res.send('Error: ' + err);
            res.send(test);
        })
    } catch(e) {
        res.send('Error' + e.message)
    }
}

exports.testPost = (req, res) => {
    try {
        var db = require('../../database')
        var Test = require('../models/test')(db);
        var newDocument = {
            name: 'Kieu Tri Dang'
        }
        new Test(newDocument).save((err, newDoc) => {
            if(err) res.send('Error: ' + err)
            res.send(newDoc)
        })
    } catch(e) {
        res.send('Error: ' + e.message)
    }
}