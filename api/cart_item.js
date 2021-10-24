const express = require("express");
const { getCartByCartId } = require("../db/cart");
const cartItemRouter = express.Router();

const {
    addItemToCart,
    getCartItemById,
    attachProductInfoToCartItem,
    deleteCartItem,
    getAllCartItems,
    updateCartItemQuantity
} = require("../db/cart_item")

// const { 
//    getCartByCartId
// } = require("../db/cart")

const { requiredNotSent } = require("./utils");



cartItemRouter.use((req, res, next) => {
    console.log("A request is being made to /cartItem");

    next();
});

cartItemRouter.get('/', async (req, res, next) => {
    try {
        const allCartItems = await getAllCartItems();
        res.send(allCartItems)
    } catch (err) {
        res.send(err)
    }
});

//   cartItemRouter.post('/:cartId/items',requiredNotSent({requiredParams: ['productId', 'quantity']}), async (req, res, next) => {
//     const { productId, quantity } = req.body
//     const {cartId} = req.params

//     try {
//       const cart = await getCartByCartId(cartId);
//       const items = await getAllCartItems();

//       if (!cart) {
//             next({
//                 name: "Cart Not Found",
//                 message: `A Cart with Id ${cartId} Was Not Found`
//             });  

//           }else{
//         const newCartItem = await addItemToCart({
//           cartId,
//           productId,
//           quantity
//         })          
//         if (newCartItem) {
//             const newCartItemWithProductInfo = await attachProductInfoToCartItem(cartId)
//           res.send(newCartItemWithProductInfo);
//           } else {
//             next();
//           }
//           }
//         }catch (err) {
//       next(err);
//     }
//   });

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