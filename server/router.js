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

    var callendar = require('./controllers/calendar')
    router.get('/callendars', callendar.getAll)
    router.get('/callendar', callendar.get)
    router.post('/callendar', callendar.create)

    var plan = require('./controllers/plan')
    router.get('/plans', plan.getAll)
    router.get('/plan', plan.get)
    router.post('/plan', plan.create)
    router.put('/plan/add-trip-mate', plan.addTripMate)

    var user = require('./controllers/user')
    router.get('/users', user.getAll)
    router.get('/user', user.get)
    router.post('/user', user.create)

    app.use('/api/v1', router)
}