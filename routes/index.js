import express from 'express';
const router = express.Router()

const config = {
  '__dirname': 'views',
  '__dirnameOther': 'public',
  'extensions': 'html'
}

router.use(express.static(config['__dirname'], { extensions: [config['extensions']] }));
router.use(express.static(config['__dirnameOther'], { extensions: [config['extensions']] }));

router.get('/', (req, res) =>  res.redirect('/home'));

router.get('*', function(req, res){
  if (res.req.client._httpMessage.req.originalUrl.includes('/js/pages/')) return res.status(202)
  res.sendFile('error404.html', { root: "views/" } );
});


export default router