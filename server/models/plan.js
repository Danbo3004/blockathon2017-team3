var mongoose = require('mongoose')

var Schema = mongoose.Schema
var Mixed = Schema.Types.Mixed
var ObjectId = Schema.ObjectId

var Plan = new Schema({
    transportation  : { type: ObjectId, ref: "Transportation" },
    calendar        : { type: ObjectId, ref: "Calendar" },
    accommodation   : { type: ObjectId, ref: "Accommodation"}
})

module.exports = (db) => {
    return db.model('Plan', Plan)
}