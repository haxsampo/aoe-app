const express = require('express')
const app = express()
const cors = require('cors')

const civilizations = require('./utils/civstats')
const {punit} = require('./utils/CivUtils')

app.use(cors())

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/civs', (req, res) => {
  res.json(civs)
})

app.get('/api/civs/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const civUnits = civilizations.find(c => c.id === id).units[0]
  //console.log(civUnits)
  const punits = punit(id)
  let highestValueUnit = ''
  let highestValue = 0
  for (let unit in civUnits) {
    if (civUnits[unit] > highestValue) {
      highestValue = civUnits[unit]
      highestValueUnit = unit
    }
  }
  //console.log("jeejee",highestValueUnit, highestValue)
  res.send({unit: highestValueUnit, value: highestValue})
})

module.exports = app