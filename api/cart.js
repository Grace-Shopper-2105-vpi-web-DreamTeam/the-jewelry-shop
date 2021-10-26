const express = require("express");
const cartRouter = express.Router();

const { 
    createCart, 
    getCartByCartId,  
    getCartByUserId,
    deleteCart,
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

//make a check to confirm that the user getting the cart has the same id as the cart's user id
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
        if (req.user.id !== +userId) {
            next({
                name: "Not Owner of This Cart",
                message: `Logged In User Does Not Match Requested User`
            })
        }
        res.send({ cart })
    } catch ({ name, message }) {
        next({ name, message })
    }
});

cartRouter.post("/:userId", requireLogin, async (req, res, next) => {
    const { userId } = req.params;

    const cartToCheck = await getCartByUserId(userId);

        if(cartToCheck) {
            next({
                name: "ActiveCartExistsError",
                message: `An active cart already exists for this user`
            })
        }

    try {

        const cart = await createCart({ userId });
        if (cart) {
            res.send(cart);

        } else if (req.user.id !== +userId) {
            next({
                name: "Not Authorized",
                message: `Logged In User Does Not Match Requested User`
            })
        } else {
            next({
                name: "Missing UserId or Cart is inActive Error",
                message: "Please Make Sure You Are Logged and Your Cart is Active"
            })
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
})


//make a check to confirm that the user getting the cart has the same id as the cart's user id
cartRouter.delete("/deactivatecart/:cartId", requireLogin, async (req, res, next) => {
  const { cartId } = req.params;

  try {
      const cartToBeMadeInactive = await getCartByCartId(cartId);

      if(!cartToBeMadeInactive) {
          next({
            name: "Cart Not Found",
            message: `No Cart found by Id ${cartId}`
          }) 
       } else {

          const inactiveCart = await deleteCart(cartId);

          //const inactiveCart = await checkoutCart(cartId);

          res.send(inactiveCart)
      }
  } catch (error) {
      next(error);
  }
})


//make a check to confirm that the user getting the cart has the same id as the cart's user id
cartRouter.delete("/:userId", requireLogin, async (req, res, next) => {
    const { userId } = req.params;
  
    try {
        const cartToBeMadeInactive = await getCartByUserId(userId);

        const cartId = cartToBeMadeInactive.id
  
        if(!cartToBeMadeInactive) {
            next({
              name: "Cart Not Found",
              message: `No Cart found by Id ${userId}`
            }) 
         } else if (req.user.id !== +userId) {
            next({
                name: "Not Owner of This Cart",
                message: `You're Not Authorized to Make Changes to This Cart`
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