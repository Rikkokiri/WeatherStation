const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true })

const Reading = mongoose.model('Note', {
  content: String,
  date: Date,
  important: Boolean
})

module.exports = Reading