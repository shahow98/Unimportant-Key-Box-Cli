#!/usr/bin/env node

const process = require('process');
const { Command } = require('commander');
const get = require('../src/core/get');

const program = new Command();
program.showHelpAfterError();
program.command('index [index]')
    .description('get a index;(example: "index")')
    .action((index) => {
        console.log(get.outputIndex(index));
    });


program.command('key <key> [index]')
    .description('get a key;(example: "key" or "key index")')
    .action((key, index) => {
        console.log(get.outputKey(index, key));
    });

program.parse(process.argv);