#!/usr/bin/env node

const appInfo = require('../package.json');
const process = require('process');
const { Command } = require('commander');
const program = new Command();
program.showHelpAfterError();
program.version(appInfo.version)
    .command('add', 'add a index or key')
    .command('update', 'update a password by key')
    .command('del', 'delete a index or key')
    .command('list', 'list key indexes')
    .parse(process.argv);