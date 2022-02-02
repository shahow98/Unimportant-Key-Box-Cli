#!/usr/bin/env node

const process = require('process');
const { Command } = require('commander');
const add = require('../src/core/add');

const program = new Command();
program.showHelpAfterError();
program.command('index <index> [description]')
    .description('add a index;(example: "index" or "index description")')
    .action((index, description) => {
        add.addIndex(index, description);
    });


program.command('key <key> <password> [index]')
    .description('add a key;(example: "key password" or "key password index")')
    .action((key, password, index) => {
        add.addKey(index, key, password);
    });

program.parse(process.argv);