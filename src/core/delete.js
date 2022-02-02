const db = require('./db');

module.exports = {
    deleteIndex(index) {
        db.deleteIndex(index);
    },
    deleteKey(index, key) {
        db.deleteKey(index, key);
    }
};