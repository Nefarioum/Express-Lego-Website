
const express = require('express')
const app = express() 

const config = {
  '__dirname': 'views',
  '__dirnameOther': 'public',
  'extensions': 'html'
}

app.use(express.static(config['__dirname'], { extensions: [config['extensions']] }));
app.use(express.static(config['__dirnameOther'], { extensions: [config['extensions']] }));


const index = require('./routes/index')
const api = require('./routes/api') 

app.use('/', index)
app.use('/api', api) 

module.exports = app
