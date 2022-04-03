import express from 'express';
const router = express.Router()

import { ItemController } from '../controllers/index.js';
const ItemHandler = new ItemController();

import CartItem from '../models/CartItem.js'

const handleAsyncLoading = (f) => {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

router.get('/store/', (req, res) => {  
  handleAsyncLoading(ItemHandler.getAll(res));
})


router.get('/store/:id', (req, res) => {
  handleAsyncLoading(ItemHandler.get(res, req.params.id));
}) 

router.get('/store/cart/:product/:amount/:type', (req, res) => {
  const ProductSlug = parseInt(req.params.product);
  const ProductAmount = parseInt(req.params.amount);
  const ProductType = parseInt(req.params.type == 0 ? req.params.type : 1);

  ItemHandler.get(res, ProductSlug, false).then((Item) => {
    if (Item.id) {
      if (typeof req.session.shoppingcart === 'undefined') req.session.shoppingcart = [];

        let ItemFound = false;

        req.session.shoppingcart.forEach(function(ShoppingItem, Index) {
          if (ShoppingItem.item.id == ProductSlug) {
            const ShoppingCartItem = new CartItem(this[Index].item, this[Index].quantity)
           
            this[Index].quantity = (ProductType ? ShoppingCartItem.addQuantity(ProductAmount) : ShoppingCartItem.removeQuantity(ProductAmount));

            ItemFound = true;

            return res.json({status: `Success`, message: `Successfully ${(ProductType ? 'added' : 'subtracted')} ${ProductAmount} more ${ShoppingCartItem.item.name} (Total: ${ShoppingCartItem.quantity})`});
          }
        }, req.session.shoppingcart)

        if (ItemFound) return;

        const ShoppingCartItem = new CartItem(Item, ProductAmount)
        req.session.shoppingcart.push(ShoppingCartItem)

        return res.json({status: `Success`, message: `Successfully added ${ShoppingCartItem.item.name} (x${ShoppingCartItem.quantity}) to cart!`});
    } else {
      return res.json({status: `Fail`, message: `The item you searched for does not exist :(`});
    }
  })
}) 

router.get('/store/cart/remove/:product', (req, res) => {
  const ProductSlug = parseInt(req.params.product);
  
  if (typeof req.session.shoppingcart === 'undefined') return res.json({message: 'Your cart is empty!'});

  let ItemFound = false;

  req.session.shoppingcart.forEach(function(ShoppingItem, Index) {
    if (ShoppingItem.item.id == ProductSlug) {
      this.splice(Index, 1);

      ItemFound = true;

      return res.json({status: `Success`, message: `Successfully removed ${ShoppingItem.item.name} from your cart!`});
    }
  }, req.session.shoppingcart)

  if (ItemFound) return;

  return res.json({status: `Fail`, message: `The item you tried to remove is not currently inside your cart.`});

}) 

router.get('/store/cart/empty', (req, res) => {  
  if (typeof req.session.shoppingcart === 'undefined') return res.json({message: 'Your cart is empty!'});

  req.session.shoppingcart = [];
  return res.json({status: `Success`, message: `Successfully emptied your cart!`});
}) 

router.get('/store/cart/view', (req, res) => {
  if (typeof req.session.shoppingcart === 'undefined' || req.session.shoppingcart.length === 0) return res.json({message: 'Your cart is empty!'});

  return res.json(req.session.shoppingcart);
}) 

export default router