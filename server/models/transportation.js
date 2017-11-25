var mongoose = require('mongoose')

var Schema = mongoose.Schema;
var Mixed = Schema.Types.Mixed;

var Transportation = new Schema({
    means: [{ type: String, default: '' }]
})

module.exports = (db) => {
    return db.model('Transportation', Transportation)
}