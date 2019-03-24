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
  date: Date
})

// Format method
readingSchema.statics.format = (reading) => {
  return {
    id: reading._id,
    sensorname: reading.sensorname,
    temperature: reading.temperature,
    pressure: reading.pressure,
    humidity: reading.pressure,
    date: reading.date
  }
}

const Reading = mongoose.model('Reading', readingSchema)

module.exports = Reading