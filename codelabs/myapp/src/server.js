/**
 * Module dependencies.
 */
import { start } from './express'
require('dotenv').config()
const http = require('http')
var logger = require('winston')
var mongoose = require('mongoose')
/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// const MongoClient = require('mongodb').MongoClient;
const uri =
  'mongodb+srv://akarsh:akarsh@cluster0.eginw.mongodb.net/test?retryWrites=true&w=majority'
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

mongoose.connect(uri, {
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
