#!/usr/bin/env node

const process = require('process');
const { Command } = require('commander');
const list = require('../src/core/list');

const program = new Command();
program.showHelpAfterError();
program.option('-i, --index <index>', 'output a index')
    .parse(process.argv);

const options = program.opts();

if (options.index) {
    console.log(list.outputIndex(options.index));
} else {
    console.log(list.outputIndexes());
}