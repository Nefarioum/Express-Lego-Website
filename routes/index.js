const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.redirect('/home');
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


module.exports = router
