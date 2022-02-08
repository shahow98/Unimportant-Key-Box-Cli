const path = require('path');
const fs = require('fs');
const config = require('../config/config.json');
const crypto = require(`../crypto/${config.crypto}`);

const INDEXES = 'indexes';
const DEFAULT_INDEX = 'default';

const db = {
    indexes: read(INDEXES),
    addIndex(index = DEFAULT_INDEX, desc = '') {
        if (!this.hasIndex(index)) {
            indexesIncrement(index, desc);
        }
    },
    deleteIndex(index) {
        if (this.hasIndex(index)) {
            indexesDecrement(index);
        }
    },
    addKey(index = DEFAULT_INDEX, key, password) {
        if (!this.hasKey(index, key)) {
            let indexRecord = {};
            if (this.hasIndex(index)) {
                indexRecord = this.getIndex(index);
            } else {
                this.addIndex(index);
            }
            indexRecord[key] = encrypt(password);
            write(index, indexRecord);

            keyIncrement(index, key);
        } else {
            throw new Error('error: key is exist, try update it!');
        }
    },
    updateDescription(index, desc) {
        if (this.hasIndex(index)) {
            this.indexes[index].description = desc;
            write(INDEXES, db.indexes);
        } else {
            throw new Error('error: index is not exist, try add it!');
        }
    },
    updatePassword(index = DEFAULT_INDEX, key, password) {
        if (this.hasKey(index, key)) {
            const indexRecord = this.getIndex(index);
            indexRecord[key] = encrypt(password);
            write(index, indexRecord);
        } else {
            throw new Error('error: key is not exist, try add it!');
        }
    },
    deleteKey(index = DEFAULT_INDEX, key) {
        if (this.hasKey(index, key)) {
            const indexRecord = this.getIndex(index);
            delete indexRecord[key];
            write(index, indexRecord);

            keyDecrement(index, key);
        }
    },
    getPassword(index = 'default', key) {
        if (this.hasKey(index, key)) {
            return decrypt(this.getIndex(index)[key]);
        } else {
            throw new Error(`error: no such index or key, index: ${index}, key: ${key}.`);
        }
    },
    getIndex(index) {
        if (this.hasIndex(index)) {
            return read(index);
        } else {
            throw new Error(`error: no such index, index: ${index}.`);
        }
    },
    hasKey(index, key) {
        if (this.hasIndex(index)) {
            const keys = this.indexes[index].keys;
            if (keys.includes(key)) {
                return true;
            }
        }
        return false;
    },
    hasIndex(index) {
        return this.indexes[index] ? true : false;
    },
    getIndexes() {
        return this.indexes;
    }
};

function indexesIncrement(index, desc) {
    db.indexes[index] = {
        total: 0,
        description: desc,
        keys: []
    };
    write(INDEXES, db.indexes);
    write(index, {});
}

function indexesDecrement(index) {
    delete db.indexes[index];
    write(INDEXES, db.indexes);
    rm(index);
}

function keyIncrement(index, key) {
    const indexRecord = db.indexes[index];
    indexRecord.total++;
    indexRecord.keys.push(key);

    write(INDEXES, db.indexes);
}

function keyDecrement(index, key) {
    const indexRecord = db.indexes[index];
    indexRecord.total--;
    for (let i = 0; i < indexRecord.keys.length; i++) {
        if (indexRecord.keys[i] == key) {
            indexRecord.keys.splice(i, 1);
            break;
        }
    }

    write(INDEXES, db.indexes);
}

function read(name) {
    let jsonObj = null;
    try {
        const json = fs.readFileSync(indexPath(name), 'utf-8');
        jsonObj = JSON.parse(json);
    } catch (error) {
        throw new Error(`error: no such JSON file, open: '${name}.json'`);
    }
    return jsonObj;
}

function write(name, obj) {
    fs.writeFileSync(indexPath(name), JSON.stringify(obj), 'utf-8');
}

function rm(name) {
    fs.unlinkSync(indexPath(name));
}

function indexPath(name) {
    return path.join(__dirname, '..', 'db', `${name}.json`);
}

function encrypt(message) {
    return crypto.encrypt(message);
}

function decrypt(message) {
    return crypto.decrypt(message);
}

module.exports = db;