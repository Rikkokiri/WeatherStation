const mongoose = require('mongoose')

// ----------------
// Move to config

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true })

// -----------------

const readingSchema = new mongoose.Schema({
  sensorname: String,
  temperature: Number,
  pressure: Number,
  humidity: Number,
  date: Date,
  temperatureOut: Number,
  humidityOut: Number,
  pressureOut: Number
})

// Format method
readingSchema.statics.format = (reading) => {
  return {
    id: reading._id,
    sensorname: reading.sensorname,
    temperature: reading.temperature,
    pressure: reading.pressure,
    humidity: Math.round(reading.humidity * 100) / 100,
    date: new Date(reading.date).getTime(),
    temperatureOut: Math.round((reading.temperatureOut - 273.15) * 100) / 100,
    humidityOut: reading.humidityOut,
    pressureOut: reading.pressureOut
  }
}

const Reading = mongoose.model('Reading', readingSchema)

module.exports = Reading