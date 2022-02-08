const ENC_UTF8 = require('crypto-js/enc-utf8');
const AES = require('crypto-js/aes');
const config = require('../config/config.json');

module.exports = {
    encrypt(message) {
        return AES.encrypt(message, config.key).toString();
    },
    decrypt(message) {
        return AES.decrypt(message, config.key).toString(ENC_UTF8);
    }
};