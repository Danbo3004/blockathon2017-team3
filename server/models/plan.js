var mongoose = require('mongoose')

var Schema = mongoose.Schema
var Mixed = Schema.Types.Mixed
var ObjectId = Schema.ObjectId

var Plan = new Schema({
    owner           : { type: ObjectId, ref: "User"},
    tripMates       : [{ type: ObjectId, ref: "User"}],
    transportation  : { type: ObjectId, ref: "Transportation" },
    calendar        : { type: ObjectId, ref: "Calendar" },
    accommodation   : { type: ObjectId, ref: "Accommodation"},
    contractAddress : { type: String, default: ''},
    confirmCount    : { type: Number, defaut: 0 }
})

module.exports = (db) => {
    return db.model('Plan', Plan)
}