const config = require('./config.json');
const MD5 = require('crypto-js/md5');
const fs = require('fs');
const path = require('path');

function saveConfig() {
    fs.writeFileSync(path.join(__dirname, '..', 'config/config.json'), JSON.stringify(config, null, 4), 'utf-8');
}

module.exports = {
    init() {
        if (!config.key) {
            config.key = MD5(Math.floor(Math.random() * Math.pow(1, 10))).toString();
        }
        saveConfig();
    },
    hasProp(prop) {
        return config.hasOwnProperty(prop);
    },
    setting(prop, value) {
        config[prop] = value;
        saveConfig();
    },
    getConfig() {
        return JSON.stringify(config, null, 4);
    }
}