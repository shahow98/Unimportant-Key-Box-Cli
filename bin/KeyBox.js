#!/usr/bin/env node

const appInfo = require('../package.json');
const config = require('../src/config/config');
const process = require('process');
const { Command } = require('commander');

config.init();

const program = new Command();
program.showHelpAfterError();
program.version(appInfo.version)
    // .command('config', 'user configuration')
    .command('get', 'get a key')
    .command('add', 'add a index or key')
    .command('update', 'update a password by key')
    .command('del', 'delete a index or key')
    .command('list', 'list key indexes')
    .parse(process.argv);