#!/usr/bin/env node

const process = require('process');
const { Command } = require('commander');
const get = require('../src/core/get');

const program = new Command();
program.showHelpAfterError();
program.argument('<key>', 'input a key')
    .argument('[index]', 'input a index')
    .description('get a key;(example: "key" or "key index")')
    .action((key, index) => {
        console.log(get.outputKey(index, key));
    });

program.parse(process.argv);