const express = require('express')
const app = express()
const nodeRequest = require('request')
const querystring = require('querystring')
require('dotenv').config()

// API keys
const OpenWeatherApiKey = process.env.OPENWEATHERMAP_API_KEY

// Models
const Reading = require('./models/reading')
const Sensor = require('./models/sensor')

// ----------- Middleware -----------

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())

app.use(express.static('build'))


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

// Get weather data if longitude and latitude data is present
// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
// http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}
// Refenrence: https://medium.com/@tkssharma/writing-neat-asynchronous-node-js-code-with-promises-async-await-fa8d8b0bcd7c
function retrieveWeatherData(latitude, longitude) {
  var options = {
    url: 'http://api.openweathermap.org/data/2.5/weather?',
    qs: {
      APPID: OpenWeatherApiKey,
      lat: latitude,
      lon: longitude
    }
  }

  // Return a new promise
  return new Promise(function (resolve, reject) {
    // Do async job
    nodeRequest.get(options, function (err, resp, body) {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(body))
      }
    })
  })

}

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
      response.json(readings.map(Reading.format))
    })
})

//-------- Get a single reading ----------------
app.get('/api/readings/:id', (request, response) => {
  Reading
    .findById(request.params.id)
    .then(reading => {
      if (reading) {
        response.json(Reading.format(reading))
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

  var weatherDataPromise = retrieveWeatherData(body.latitude, body.longitude);

  weatherDataPromise.then(result => {

    console.log('Promise result', result)

    const reading = new Reading({
      sensorname: body.name,
      temperature: body.temperature,
      pressure: body.pressure,
      humidity: body.humidity,
      date: new Date(),
      temperatureOut: result.main.temp,
      humidityOut: result.main.humidity,
      pressureOut: result.main.pressure
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
    .catch(promiseError => {
      console.log('error:', promiseError)
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