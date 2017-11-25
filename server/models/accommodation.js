var mongoose = require('mongoose')

var Schema = mongoose.Schema
var Mixed = Schema.Types.Mixed

var Accommodation = new Schema({
    name    : { type: String, default: '' },
    image   : { type: String, default: ''},
    price   : { type: Number, default: 0},
})

module.exports = (db) => {
    return db.model('Accommodation', Accommodation)
}