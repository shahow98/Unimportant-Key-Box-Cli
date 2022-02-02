const db = require('./db');

module.exports = {
    addIndex(index, description) {
        db.addIndex(index, description);
    },
    addKey(index, key, password) {
        db.addKey(index, key, password);
    }
};