var mongoose = require('mongoose')

var Schema = mongoose.Schema
var Mixed = Schema.Types.Mixed
var ObjectId = Schema.ObjectId

var User = new Schema({
    fullName   : { type: String, default: '' },
    avatar     : { type: String, default: '' },
    gender     : { type: String, default: '' },
    email      : { type: String, default: '' }
})

module.exports = (db) => {
    return db.model('User', User)
}