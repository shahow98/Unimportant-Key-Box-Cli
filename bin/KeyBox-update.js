#!/usr/bin/env node

const process = require('process');
const { Command } = require('commander');
const update = require('../src/core/update');

const program = new Command();
program.showHelpAfterError();
program.command('desc <index> <description>')
    .description('update a description by index;(example: "index" or "index description")')
    .action((index, description) => {
        update.updateDescription(index, description);
    });


program.command('pwd <key> <password> [index]')
    .description('update a password by key;(example: "key password" or "key password index")')
    .action((key, password, index) => {
        update.updatePassword(index, key, password);
    });

program.parse(process.argv);