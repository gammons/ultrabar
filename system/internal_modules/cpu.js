import os from 'os'

const os = require('os')

function delta() {
  const cpus = os.cpus()

  return cpus.map(cpu => {
    const times = cpu.times
    return {
      tick: Object.keys(times).filter(time => time !== 'idle').reduce((tick, time) => { tick+=times[time]; return tick }, 0),
      idle: times.idle,
    }
  })
}

let startMeasures = delta()
setInterval(() => {
  const endMeasures = delta()
  const percentageCPU = endMeasures.map((end, i) => {
    return ((end.tick - startMeasures[i].tick) / (end.idle - startMeasures[i].idle) * 100).toFixed(3) + '%'
  })

  console.log(percentageCPU.join(' '), '\n')

  // reset
  startMeasures = delta()
}, 2000)

