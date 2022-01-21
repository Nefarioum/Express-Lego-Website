import express from 'express';
const router = express.Router()

import { ItemController } from '../controllers/index.js';

const handleAsyncLoading = (f) => {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

router.get('/store/', (req, res) => {  
  const ItemHandler = new ItemController();

  (handleAsyncLoading(ItemHandler.get(res)));
})

/*
router.get('/:resource/:id', (req, res) => {
  res.json({
    confirmation: 'success',
    resource: req.params.resource,
    id: req.params.id,
    query: req.query 
  })
}) */



//router.get('/messages', asyncWrap(getMessages));

export default router