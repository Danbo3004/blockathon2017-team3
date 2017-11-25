var express = require('express')

module.exports = function (app) {
    var router = express.Router();
    
    var test = require('./controllers/test')
    router.get('/test', test.get)
    router.post('/test', test.testPost)

    var accommodation = require('./controllers/accommodation')
    router.get('/accommodations', accommodation.getAll)
    router.get('/accommodation', accommodation.get)
    router.post('/accommodation', accommodation.create)

    var transportation = require('./controllers/transportation')
    router.get('/transportations', transportation.getAll)
    router.get('/transportation', transportation.get)
    router.post('/transportation', transportation.create)

    app.use('/api/v1', router)
}