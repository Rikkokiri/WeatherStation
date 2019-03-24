if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// TODO: Port and mongo_ur stuff
/*
let port = process.env.PORT
let mongoUrl = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
  port = process.env.TEST_PORT
  mongoUrl = process.env.TEST_MONGODB_URI
}
*/

let mongoUrl = process.env.MONGODB_URI

let weatherApiKey = process.env.OPENWEATHERMAP_API_KEY

module.exports = {
  mongoUrl,
  weatherApiKey
}