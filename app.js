
import express from 'express';
const app = express() 

import index from './routes/index.js'
import api from './routes/api.js'
import * as DatabaseManager from './database/databaseManager.js'

app.use('/api', api) 
app.use('/', index)

export default app
