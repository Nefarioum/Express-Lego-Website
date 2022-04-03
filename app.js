
import express from 'express';
import session from 'express-session';

const app = express() 

import index from './routes/index.js'
import api from './routes/api.js'
import * as DatabaseManager from './database/databaseManager.js'

app.use(session({
    secret: 'hello',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use('/api', api) 
app.use('/', index)

export default app
