const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const config = require('./config/config.js')()

const app = express()

app.use(serveStatic(path.join(__dirname, '/dist')))

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

require('./routes')(app)

app.listen(config.port || 4000)
console.log(`server started on port ${config.port}`)
