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

server.listen(5000 || process.env.PORT, () => {
  logger.info('Application started on port ', 5000 || process.env.PORT)
})

export default server
