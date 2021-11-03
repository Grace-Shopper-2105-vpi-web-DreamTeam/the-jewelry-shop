const express = require("express");

const cartItemRouter = express.Router();

const {
    addItemToCart,
    getCartItemById,
    deleteCartItem,
    getAllCartItems,
    updateCartItemQuantity
} = require("../db/cart_item");

const { getCartByCartId } = require("../db/cart");

const { requiredNotSent } = require("./utils");



cartItemRouter.use((req, res, next) => {
    console.log("A request is being made to /cartItem");

    next();
});

//this works, but don't think we will actually need on front end
cartItemRouter.get('/', async (req, res, next) => {
    try {
        const allCartItems = await getAllCartItems();
        res.send(allCartItems)
    } catch (err) {
        res.send(err)
    }
});

//I think we only want to send back the new cart item sent.... then when you got to view your cart, it would show up with all the information there...or do we send the whole updated cart back? 
  cartItemRouter.post('/:cartId/items', async (req, res, next) => {
    console.count()
    const { productId, quantity } = req.body
    console.count()
    const { cartId } = req.params;
    console.count()
    try {
      console.count()
      const cart = await getCartByCartId(cartId);
      console.count()
      if (!cart) {
        console.count()
            next({
                name: "Cart Not Found",
                message: `A Cart with Id ${cartId} Was Not Found`
            });  

      } else{
        console.count()
        const newCartItem = await addItemToCart({
          cartId,
          productId,
          quantity
        })          
          if (newCartItem) {
            console.count()
              // const newCartItemWithProductInfo = await attachProductInfoToCartItem(cartId)
              // res.send(newCartItemWithProductInfo);
              res.send(newCartItem);
          } else {
            console.count()
            next();
          }
        }
    }catch (err) {
      console.count()
      next(err);
    }
  });


//this seems to work 
cartItemRouter.patch("/:cartItemId", async (req, res, next) => {
  const { cartItemId } = req.params;
  const { quantity } = req.body;

  try {
    const cartItemToUpdate = await getCartItemById(cartItemId);

    if(!cartItemToUpdate) {
      next({
        name: "Cart Item Not Found",
        message: `An Item with Id ${cartItemId} was not found in this cart`
      })
    } else if (!quantity || quantity < 1) {
      next({
        name: "InvalidItemQuantity",
        message: `Please input a valid quantity`
      })
    }else {
      const updatedCartItem = await updateCartItemQuantity(quantity, cartItemId);
      res.send(updatedCartItem);
    }
  } catch (error) {
    next(error);
  }
})

//this seems to work 
cartItemRouter.delete("/:cartItemId", async (req, res, next) => {
    const { cartItemId } = req.params;

    try {
        const cartItemToDelete = await getCartItemById(cartItemId);

        if (!cartItemToDelete) {
            next({
                name: "Cart Item Not Found",
                message: `An Item with Id ${cartItemId} was not found in this cart`
            })
        } else {
            const deletedCartItem = await deleteCartItem(cartItemId);
            res.send(deletedCartItem)
        }
    } catch (error) {
        next(error);
    }
})


module.exports = cartItemRouter;