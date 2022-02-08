#!/usr/bin/env node

const process = require('process');
const readline = require('readline');
const { Command } = require('commander');
const config = require('../src/config/config');

const program = new Command();
program.showHelpAfterError();
program.command('set <prop> <value>')
    .description('set a configuration property;(example: "property value")')
    .action((prop, value) => {
        if (config.hasProp(prop)) {
            if (prop == 'key') {
                console.log('Resetting the key will cause the old account pair to become invalid!');
            }
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            rl.question('Overwrite configuration?(y/n) ', (answer) => {
                if (answer == 'y') {
                    config.setting(prop, value);
                }

                rl.close();
            });
        }
    });


program.command('show')
    .description('output user configuration;')
    .action(() => {
        console.log(config.getConfig());
    });

program.parse(process.argv);