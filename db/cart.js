const {client} = require("./index.js");

const { 
    attachProductInfoToCartItem,
    getCartItemByCartId
} = require("./cart_item");

const { createOrder, getOrderById } = require("./orders.js");

const { addOrderItemToOrder } = require("./orderItems");

const { getProductById, updateProduct } = require("./products")



//this seems to be working. create on log in. on front end, if not logged cart saved in local storage. Force log in before checking out. Create cart based on local storage then allow checkout. 
const createCart = async ({ userId, isActive }) => {

    if(!isActive && isActive !== false ) {
        isActive = true;
    }

    try {

        const {
            rows: [cart]
        } = await client.query(
            `
            INSERT INTO cart ("userId", "isActive")
            VALUES ($1, $2)
            RETURNING *;
            `, 
            [userId, isActive]
        );

        return cart;
    } catch (error) {
        throw error;
    }
}

//this seems to be working
const getCartByCartId = async (cartId) => {
    try {
        const {
            rows: [cart]
        } = await client.query(`
            SELECT *
            FROM cart 
            WHERE id=$1
            AND "isActive" = true;
        `, [cartId]
        );

        if(!cart) {
            return;
        }
        const cartItems = await attachProductInfoToCartItem(cartId);

        cart.cartItems = cartItems.filter((cartItem) => cartItem.cartId = cart.id);

        return cart
        //return attachProductInfoToCartItemAndToCart(cart);
    } catch (error) {
        throw error;
    }
}

// this seems to be working
const getCartByUserId = async (userId) => {
    try {
        const {
            rows: [cart]
        } = await client.query(`
            SELECT * 
            FROM cart 
            WHERE "userId"=$1
            AND "isActive" = true
        `, [userId]);

        if (cart) {
           const thisCartId = cart.id;
           const cartItems = await attachProductInfoToCartItem(thisCartId);
           cart.cartItems = cartItems.filter((cartItem) => cartItem.cartId = cart.id);
        }
       
        return cart;
        
    } catch (error) {
        throw error;
    }
}


const deleteCart = async (cartId) => {
    try {
        const {
            rows: [ inactiveCart ]
        } = await client.query(`
            UPDATE cart
            SET "isActive" = false
            WHERE id=$1
            RETURNING *
        `, [cartId]
        );

        const cartItems = await attachProductInfoToCartItem(cartId);

        inactiveCart.cartItems = cartItems.filter((cartItem) => cartItem.cartId = inactiveCart.id)

        return inactiveCart;
        
    } catch (error) {
        throw error;
    }

}

const checkoutCart = async (cartId) => {

    try{
        const inactiveCart = await deleteCart(cartId);

        const userId = inactiveCart.userId

        const cartItemsToGetTotal = await attachProductInfoToCartItem(cartId);

        const total = cartItemsToGetTotal.reduce(function(sum, current) {
            return sum + Number(current.total);
          }, 0);

        const newOrder = await createOrder({userId: userId, total: total})

        const orderId = newOrder.id;

        const cartItems = await getCartItemByCartId(cartId);

        cartItems.forEach((cartItem) => {
            cartItem.orderId = orderId;
            delete cartItem.id;
            delete cartItem.cartId;
        });
        
        await Promise.all(cartItems.map(addOrderItemToOrder));
        
        const newOrderWithItems = await getOrderById(orderId);
        
        await getInventoryChange(cartId);
        
        return newOrderWithItems;
    } catch (error) {
        throw error;
    }
}

    const getInventoryChange = async (cartId) => {

        try {
            const cartItems = await getCartItemByCartId(cartId);

            const quantitiesToUpdateWithProductId = cartItems.filter((cartItem) => 
                delete cartItem.orderId
            )

            const productIds = quantitiesToUpdateWithProductId.map((item) => item.productId)

            const productsToUpdate = await Promise.all(productIds.map(getProductById));

            for (let productId1 of productsToUpdate) {
                for (let productId2 of quantitiesToUpdateWithProductId) {
                    if(productId1.id === productId2.productId) {
                        productId1.inventory = productId1.inventory - productId2.quantity
                    }
                }
            }
            
            const updatedProducts = await Promise.all(productsToUpdate.map((product) => updateProduct(product.id, {inventory: product.inventory})));

            return updatedProducts;
            
        } catch (error) {
            throw error
        }

    }
   

   
   // TODO: Create an order from the cart we just made inactive and fill the order_items table 
   // 1. Create an order (takes in userId and cart total (which can be calculated from the above inactiveCart's products))
   
   //const order = await createOrder({userId: req.user.id, total: 100});
   
   //not sure if we are doing total.
   
   // 2. Use this order Id and loop through each of the products in the inactive cart, and create a order_item for each of them

//   // const newOrder = await addOrderItemToOrder({
//     productId,
//     orderId,
//     quantity

// })
    // 3. After all the items are added to the order, we send back that final order   


module.exports = { 
    createCart, 
    getCartByCartId,  
    getCartByUserId,
    deleteCart,
    checkoutCart 
}


// dont think this is working...do we even need?
// const getAllActiveCarts = async () => {
//     try {
//         const {
//             rows: activeCarts
//         } = await client.query(
//             `
//             SELECT * 
//             FROM cart
//             WHERE "isActive" = true
//             `
//         );

//         // const cartItems = await attachProductInfoToCartItem();

//         // console.log(" the cart items are", cartItems)

//         // activeCarts.forEach((activeCart) => {
//         //     activeCart.cartItems = cartItems.filter((cartItem) => cartItem.cartId = activeCart.id)
//         // })

//         // return activeCarts

//         return attachProductInfoToCartItemAndToCart(activeCarts);
//     } catch (error) {
//         throw error;
//     }
// }


// if a user has an active cart, or the cart 
// const addUserIdToCart = async (user_id, cart_id) => {

//     console.log(userId)
//     try {
//         const checkForUser = await getCartByUserId(user_id);

//         const checkForCart = await getCartById(cart_id);

//         let cartExists = false;

//         if (checkForCart !== undefined) {
//             cartExists = checkForCart;
//         }

//         console.log("user is", checkForUser);

//         console.log("cart is", checkForCart);

//         console.log("cart exists is", cartExists)

//         if(checkForUser) {
//             return 
//         } else if (cartExists.user_id !== null) {
//             return 
//         } else {
//             const {
//                 rows: [updatedCart]
//             } = await client.query(`
//                 UPDATE cart
//                 SET "userId" = $1
//                 WHERE id = $2
//                 RETURNING *;
//                 `, 
//                 [user_id, cart_id])
            
//             // const cartItems = await attachProductInfoToCartItem(cart_id);

//             // updatedCart.cartItems = cartItems.filter((cartItem) => cartItem.cartId = updatedCart.id);

//             // return updatedCart;
//         }
//     } catch (error) {
//         throw error;
//     }

// }