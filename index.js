const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())

const logger = (request, response, next) => {
  console.log('Method: ', request.method)
  console.log('Path: ', request.path)
  console.log('Body: ', request.body)
  console.log('-------------------')
  next()
}

app.use(logger)

// -----------------------------------
// ============ TEST DATA ============
let readings = [
  {
    id: 1,
    sensorName: 'Bedroom sensor',
    temperature: 22.12,
    humidity: 25.23
  }
]

// --------------------------------
// ============ ROUTES ============

//-------- Get all readings ----------------
app.get('/api/readings', (request, response) => {
  response.json(readings)
})

//-------- Get a single reading ----------------
app.get('/api/readings/:id', (request, response) => {
  const id = Number(request.params.id)
  const reading = readings.find(reading => reading.id === id)

  if (reading) {
    response.json(reading)
  } else {
    response.status(404).end()
  }
})

//-------- New reading ----------------
app.post('/api/newreading/', (request, response) => {
  console.log('Received a new reading at', new Date())
  console.log('Message: ', request.body)

  response.status(200).end()
})

const error = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(error)


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})