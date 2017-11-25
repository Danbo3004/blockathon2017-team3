var mongoose = require('mongoose')

var Schema = mongoose .Schema
var Mixed = Schema.Types.Mixed

var Calendar = new Schema({
    destination     : { type: Mixed, default: {} },
    from            : { type: Date, default: Date.now()},
    to              : { type: Date, default: Date.now()},
})

module.exports = (db) => {
    return db.model('Calendar', Calendar)
}