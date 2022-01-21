import express from 'express';
const router = express.Router()

import { ItemController } from '../controllers/index.js';

router.get('/', (req, res) => {
  console.log('hi');
  res.redirect('/home');
})

router.get('/store', (req, res) => {
  const ItemControl = new ItemController();
  //res.json('/home');
})

/*
router.get('/index', (req, res) => {
  res.send('This is the Send Route')
})

router.get('/json', (req, res) => {
  res.json({
    confirmation: 'success',
    data: 'this is a sample json route.'
  })
}) */

router.get('*', function(req, res){
  if (res.req.client._httpMessage.req.originalUrl.includes('/js/pages/')) return res.status(202)
  res.sendFile('error404.html', { root: "views/" } );
});


export default router