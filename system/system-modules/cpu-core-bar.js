import os from 'os'

const MeasureTimeInSecs = 2

const delta = () => {
  const cpus = os.cpus()

  return cpus.map(cpu => {
    const times = cpu.times
    return {
      tick: Object.keys(times).filter(time => time !== 'idle').reduce((tick, time) => { tick+=times[time]; return tick }, 0),
      idle: times.idle,
    }
  })
}


export default () => {
  return new Promise(resolve => {
    const startMeasure = delta()
    setTimeout(() => {
      const endMeasure = delta()
      const percentageCPU = endMeasure.map((end, i) => {
        return ((end.tick - startMeasure[i].tick) / (end.idle - startMeasure[i].idle) * 100).toFixed(3)
      })
      resolve(percentageCPU)
    }, MeasureTimeInSecs * 1000)
  })
}
