const db = require('./db');

module.exports = {
    updateDescription(index, description) {
        db.updateDescription(index, description);
    },
    updatePassword(index, key, password) {
        db.updatePassword(index, key, password);
    }
};