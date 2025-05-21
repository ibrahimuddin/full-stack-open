const express = require('express')
const mongoose = require('mongoose')
const { PORT, MONGODB_URI } = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

const app = express()

mongoose.connect(MONGODB_URI)

app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app