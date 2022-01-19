
import express from 'express';
const app = express() 

const config = {
  '__dirname': 'views',
  '__dirnameOther': 'public',
  'extensions': 'html'
}

app.use(express.static(config['__dirname'], { extensions: [config['extensions']] }));
app.use(express.static(config['__dirnameOther'], { extensions: [config['extensions']] }));

import index from './routes/index.js'
import api from './routes/api.js'
import * as DatabaseManager from './database/databaseManager.js'

app.use('/', index)
app.use('/api', api) 

export default app
