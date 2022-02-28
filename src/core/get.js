const db = require('./db');

module.exports = {
    outputKey(index = 'default', key) {
        const password = db.getPassword(index, key);
        return JSON.stringify({ index, key, password }, null, 4);
    },
    outputIndex(index = 'defualt') {
        return (db.hasIndex(index) ? JSON.stringify(db.indexes[index], null, 4) : '{}');
    },
};