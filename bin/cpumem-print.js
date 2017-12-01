#!/usr/bin/env node
const commander = require('commander')
const printCpuMem = require('../lib')
const clc = require('cli-color')

commander
  .usage('[pid]')
  .option('-i --interval <seconds>', 'Print interval seconds', 1)
  .parse(process.argv)

const {args} = commander
if (args.length === 0) {
  commander.outputHelp()
  process.exit()
}

const pid = Number(args[0])
if (isNaN(pid)) {
  console.error(clc.red(`Wrong PID are given. PID must be a number.`))
  commander.outputHelp()
  process.exit(1)
}

const options = {
  interval: Number(commander.interval)
}

printCpuMem(pid, options)
