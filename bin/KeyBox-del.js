#!/usr/bin/env node

const process = require('process');
const { Command } = require('commander');
const del = require('../src/core/delete');

const program = new Command();
program.showHelpAfterError();
program.command('index <index>')
    .description('delete a index;')
    .action((index) => {
        del.deleteIndex(index);
    });


program.command('key <key> [index]')
    .description('delete a key;')
    .action((key, index) => {
        del.deleteKey(index, key);
    });

program.parse(process.argv);