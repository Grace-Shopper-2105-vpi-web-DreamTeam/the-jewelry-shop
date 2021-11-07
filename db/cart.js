const {client} = require("./index.js");

const { 
    attachProductInfoToCartItem,
    getCartItemByCartId
} = require("./cart_item");

const { createOrder, getOrderById } = require("./orders.js");

const { addOrderItemToOrder } = require("./orderItems");

const { getProductById, updateProduct } = require("./products")

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
    } catch (error) {
        throw error;
    }
}

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
   
module.exports = { 
    createCart, 
    getCartByCartId,  
    getCartByUserId,
    deleteCart,
    checkoutCart 
}
