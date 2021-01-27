import express from 'express'
import cors from 'cors'
//console.log("hi");
import routes from './routes/index'
//console.log("hi2");

import mongoose from 'mongoose'

require("dotenv").config()
const app = express()

// init middleware
app.use(cors())
app.use(express.json())
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://love-diary.anyday.com.tw:3000')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

const port = process.env.PORT || 4000
const dboptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  auto_reconnect: true,
  useUnifiedTopology: true,
  poolSize: 10
}
// TODO : connect mongodb here
//const mongoose = require('mongoose')
console.log("process.env.MONGO_URL: "+process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// 取得資料庫連線狀態
const db = mongoose.connection;
db.on('error', err => console.error('connection error', err));  // 連線異常
db.once('open', db => console.log('Connected to MongoDB'));     // 連線成功

routes(app)

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})
