var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Mixed = mongoose.Schema.Types.Mixed;

var Test = new Schema({
    name: { type: String, default: '' }
})

module.exports = (db) => {
    return db.model('Test', Test)
}