var mongoose = require('mongoose')

var Schema = mongoose.Shema
var Mixed = Schema.Types.Mixed

var Accommodation = new Schema({
    name    : { type: String, default: '' },
    image   : { type: String, default: ''},
    price   : { type: Number, default: 0},
})