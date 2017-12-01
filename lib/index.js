const usage = require('usage')
const {promisify} = require('util')
const asleep = require('asleep')
const lookupAsync = promisify(usage.lookup)
const clc = require('cli-color')

const CPU_HEAD = clc.blueBright('CPU(%)')
const MEMORY_HEAD = clc.blueBright('Memory(MB)')

const padSpace = (str) => ('          ' + str).slice(-1 * Math.max(str.length, 10))

async function printCpuMem (pid, options = {}) {
  const {
    interval = 1
  } = options
  while (true) {
    let stat
    try {
      stat = await lookupAsync(Number(pid), { keepHistory: true })
    } catch (e) {
      console.error(e)
      return
    }
    let {cpu, memory} = stat
    cpu = padSpace(cpu.toFixed(1))
    memory = padSpace((memory / (1024 * 1024)).toFixed(3))
    console.log(` ${CPU_HEAD}:${cpu}  ${MEMORY_HEAD}:${memory}`)
    await asleep(interval * 1000)
  }
}

if (!module.parent) {
  printCpuMem(process.pid)
}

module.exports = printCpuMem
