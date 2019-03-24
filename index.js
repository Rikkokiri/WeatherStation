const express = require('express')
const app = express()

// Models
const Reading = require('./models/reading')
const Sensor = require('./models/sensor')

// ----------- Middleware -----------

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


// --------------------------------
// ============ HELPER METHODS ============


// --------------------------------
// ============ ROUTES ============

//-------- Get all sensors -----------------
app.get('/api/sensors', (request, response) => {
  Sensor
    .find({}, { __v: 0 })
    .then(sensors => {
      response.json(sensors)
    })
})

app.post('/api/sensors', (request, response) => {

})

//-------- Get all readings ----------------
app.get('/api/readings', (request, response) => {
  Reading
    .find({}, { __v: 0 })
    .then(readings => {
      response.json(readings)
    })
})

//-------- Get a single reading ----------------
app.get('/api/readings/:id', (request, response) => {
  Reading
    .findById(request.params.id)
    .then(reading => {
      if (reading) {
        response.json(reading)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: "malformatted id" })
    })
})

//-------- New reading ----------------
app.post('/api/newreading/', (request, response) => {
  console.log('Received a new reading at', new Date())
  console.log('Message: ', request.body)

  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'sensor name missing' })
  }
  if (body.temperature === undefined) {
    return response.status(400).json({ error: 'temperature missing' })
  }
  if (body.humidity === undefined) {
    return response.status(400).json({ error: 'humidity missing' })
  }
  if (body.pressure === undefined) {
    return response.status(400).json({ error: 'pressure missing' })
  }

  // Save sensor / update timestamp
  const sensor = {
    name: body.name,
    lastonline: new Date()
  }

  Sensor
    .findOneAndUpdate({ name: body.name },
      sensor,
      { upsert: true, new: true })
    .then(savedSensor => {
      console.log('Saved sensor', savedSensor)
    })

  const reading = new Reading({
    sensorname: body.name,
    temperature: body.temperature,
    pressure: body.pressure,
    humidity: body.humidity,
    date: new Date()
  })

  reading
    .save()
    .then(savedReading => {
      console.log('Saved reading', reading)
      response.json(savedReading).status(200).end()
    })
    .catch(error => {
      console.log(error)
      response.status(500).send({ error: "Unknown error" })
    })
})

const error = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(error)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})

app.on('close', () => {
  mongoose.connection.close()
})