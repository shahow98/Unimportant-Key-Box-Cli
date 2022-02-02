const db = require('./db');

module.exports = {
    outputIndex(index) {
        return (db.hasIndex(index) ? JSON.stringify(db.indexes[index], null, 4) : '{}');
    },
    outputIndexes() {
        return JSON.stringify(db.indexes, null, 4);
    }
};