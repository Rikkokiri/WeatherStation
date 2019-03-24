const mongoose = require('mongoose')

// ---------------

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true })

// ---------------

const sensorSchema = new mongoose.Schema({
  name: String,
  firstonline: {
    type: Date,
    default: new Date()
  },
  lastonline: {
    type: Date,
    default: new Date()
  }
})

// Format method
sensorSchema.statics.format = (sensor) => {
  return {
    id: sensor._id,
    name: sensor.name,
    firstonline: new Date(sensor.firstonline).getTime(),
    lastonline: new Date(sensor.lastonline).getTime()
  }
}

const Sensor = mongoose.model('Sensor', sensorSchema)

module.exports = Sensor