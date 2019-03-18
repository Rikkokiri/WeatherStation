const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI
console.log('URL', url)

mongoose.connect(url, { useNewUrlParser: true })

const Reading = mongoose.model('Reading', {
  sensorname: String,
  temperature: Number,
  pressure: Number,
  humidity: Number,
  date: Date
})

const reading = new Reading({
  sensorname: 'YokkilaSensor',
  temperature: 25.58,
  pressure: 98956.52,
  humidity: 21.87207,
  date: new Date()
})

/*
reading
  .save()
  .then(response => {
    console.log('reading saved!')
    mongoose.connection.close()
  })
  */

const Sensor = mongoose.model('Sensor', {

})