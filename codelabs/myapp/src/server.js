/**
 * Module dependencies.
 */
import { start } from './express'
require('dotenv').config()
const http = require('http')
var logger = require('winston')
/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */
var mongoose = require('mongoose')
mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
// Bootstrap sequelize models
const server = http.createServer(start())
const PORT = process.env.PORT || 4000
server.listen(process.env.PORT || 4000, () => {
  logger.info(`Application started on port ${PORT}`, process.env.PORT || 4000)
})

export default server
