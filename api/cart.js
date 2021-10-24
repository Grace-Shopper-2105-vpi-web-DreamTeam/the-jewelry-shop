const express = require("express");
const cartRouter = express.Router();

const { 
    createCart, 
    getCartByCartId,  
    getCartByUserId,
    checkoutCart,  
} = require("../db/cart")

const { requireLogin } = require("./utils");

cartRouter.use((req, res, next) => {
    console.log("A request is being made to /cart");

    next();
});

cartRouter.get("/:cartId/cart", async (req, res, next) => {
    try {
        const { cartId } = req.params;
        const cart = await getCartByCartId(cartId);

        if (!cart) {
            next({
                name: "Cart Not Found",
                message: `Cart Not Found with cartId ${cartId}`
            })
        }
        res.send({ cart })
    } catch ({ name, message }) {
        next({ name, message })
    }
});

cartRouter.get("/:userId/usercart", requireLogin, async (req, res, next) => {
    try {
        const { userId } = req.params;
        const cart = await getCartByUserId(userId);

        if (!cart) {
            next({
                name: "Cart Not Found",
                message: `Cart Not Found with userId ${userId}`
            })
        }
        res.send({ cart })
    } catch ({ name, message }) {
        next({ name, message })
    }
});

cartRouter.post("/:userId", async (req, res, next) => {
    const { userId } = req.params;
    
    try {
        const cart = await createCart({ userId });
        if (cart) {
            res.send(cart);
        } else {
            next({
                name: "Missing UserId or cart is inActive Error",
                message: "Please make sure you are login and your cart is active"
            })
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
})

cartRouter.patch("/:cartId", requireLogin, async (req, res, next) => {
  const { cartId } = req.params;
  try {
      const cartToBeMadeInactive = await getCartByCartId(cartId);

      if(!cartToBeMadeInactive) {
          next({
            name: "Cart Not Found",
            message: `No Cart found by Id ${cartId}`
          })
      } else {
          const inactiveCart = await checkoutCart(cartId);
          res.send(inactiveCart)
      }
  } catch (error) {
      next(error);
  }
})


module.exports = cartRouter;

