const config = require("./config.json");
const MD5 = require("crypto-js/md5");
const fs = require("fs");
const path = require("path");

const DEFAULT_DIR = ".unimportant-key-box-cli";

function saveConfig() {
  fs.writeFileSync(
    path.join(__dirname, "..", "config/config.json"),
    JSON.stringify(config, null, 4),
    "utf-8"
  );
}

function backups() {
  // ${backups}/.unimportant-key-box-cli
  const backupsDir = path.join(config.db, DEFAULT_DIR);
  console.log(backupsDir);
  fs.access(backupsDir, fs.constants.F_OK, (err) => {
    if (err && err.code == 'ENOENT') {
      if (!fs.mkdirSync(backupsDir, { recursive: true })) {
        return;
      }
      fs.copyFileSync(
        path.join(__dirname, "..", "config/config.json"),
        path.join(backupsDir, "config.json")
      );

      const dbDir = path.join(backupsDir, "db");
      if (!fs.mkdirSync(dbDir, { recursive: true })) {
        return;
      }
      const dbFiles = fs.readdirSync(path.join(__dirname, "..", "db"), {
        encoding: "utf-8",
      });
      dbFiles.forEach((file) => {
        fs.copyFileSync(
          path.join(__dirname, "..", "db", file),
          path.join(dbDir, file)
        );
      });
    }
  });
}

module.exports = {
  props: {
    CRYPTO: "crypto",
    KEY: "key",
    DB: "db"
  },
  init() {
    if (!config.key) {
      config.key = MD5(Math.floor(Math.random() * Math.pow(1, 10))).toString();
    }
    if (!config.backups) {
      config.db = process.env.HOME || process.env.USERPROFILE || __dirname;
    }
    saveConfig();
    backups();
  },
  hasProp(prop) {
    return config.hasOwnProperty(prop);
  },
  setting(prop, value) {
    config[prop] = value;
    saveConfig();
  },
  getProp(prop) {
    return config[prop];
  },
  getConfig() {
    return JSON.stringify(config, null, 4);
  },
  backups() {
    backups();
  },
};
