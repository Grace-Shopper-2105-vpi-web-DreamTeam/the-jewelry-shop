const {client} = require("./index.js");
//need to check that the manipulator of the cart item is the use

// create cart item 

const addItemToCart = async ({cartId, productId, quantity}) => {

    try {
        const {
            rows: [cart_item]
        } = await client.query(`
            INSERT INTO cart_item ("cartId", "productId", quantity)
            VALUES ($1, $2, $3)
            ON CONFLICT ("cartId", "productId") DO NOTHING
            RETURNING *
        `,
        [cartId, productId, quantity]
        );
        
        return cart_item;
    } catch (error) {
        throw error;
    }
} 

//this exists just for testing purposes 
const getAllCartItems = async () => {
    try {
        const {
            rows: cartItems
        } = await client.query(
            `
            SELECT *
            FROM cart_item;
            `
        );
        return cartItems;
    } catch (error) {
        throw error
    }
}


//this seems to be working
const getCartItemById = async (cartItemId) => {

    console.log(cartItemId)

    try {
        const {
        rows: [cart_item]
        } = await client.query(`
            SELECT cart_item.*, products.title, products.description, products.price
            FROM cart_item
            INNER JOIN products
            ON products.id = cart_item."productId"
            WHERE cart_item.id = $1
        `, [cartItemId]);

        console.log("cart item", cart_item)

        // if (!cart_item) {
        //     return null;
        // }

        return cart_item;

    } catch (error) {
        
    }
}

const getCartItemByCartId = async (cartId) => {
    try {
        const { rows: cartItems } = await client.query(`
            SELECT * 
            FROM cart_item
            WHERE cart_item."cartId" = $1;
        `, [cartId]);

        return cartItems;
    } catch (error) {
        throw (error)
    }
}

//this seems to be working

const attachProductInfoToCartItem = async (cartId) => {
    try {
        const { rows: cartItems } = await client.query(`
            SELECT cart_item.id as cart_item_id, cart_item."productId", cart_item."cartId", products.title, products.description, products.price, cart_item.quantity*products.price as total
            FROM cart_item
            INNER JOIN products
            ON products.id = cart_item."productId"
            WHERE cart_item."cartId" = $1;
        `, [cartId])

        return cartItems
    } catch (error) {
        throw error;
    }
    
}

// edit cart item qantity - this seems to be working

const updateCartItemQuantity = async (quantity, cartItemId) => {
    try {
        const {
            rows: [updatedCartItem]
        } = await client.query(
            `
            UPDATE cart_item
            SET quantity = $1
            WHERE id = $2
            RETURNING *;
            `, [quantity, cartItemId]
        )
        
        return updatedCartItem;
    } catch (error) {
        
    }
}

// delete cart item - this seems to be working

const deleteCartItem = async (cartItemId) => {
    try {
        const {
            rows: [deletedCartItem]
        } = await client.query(`
            DELETE FROM cart_item
            WHERE cart_item.id=$1
            RETURNING *
        `, [cartItemId]
        );

        return deletedCartItem;
        
    } catch (error) {
        
    }
}

module.exports = { 
    addItemToCart,
    getCartItemById,
    getCartItemByCartId,
    attachProductInfoToCartItem,
    deleteCartItem, 
    getAllCartItems,
    updateCartItemQuantity
}


// const attachProductInfoToCartItemAndToCart = async (carts) => {
//     const cartsToReturn = [...carts];
//     const binds = carts.map((_, index) => `$${index + 1}`).join(", ");
//     const cartIds = carts.map((cart) => cart.id);

//     if (!cartIds?.length) return;

//     try {
//         const { rows: cartItems } = await client.query(`
//             SELECT cart_item.*, products.title, products.description, products.price, cart_item.quantity
//             FROM products
//             JOIN cart_item ON products.id = cart_item."productId"
//             WHERE cart_item."cartId" IN(${binds});
//         `, cartIds);

//         for (const cart of cartsToReturn) {
//             const itemsToAdd = cartItems.filter((cartItem) => cartItem.cartId = cart.id);

//             cart.cart_items = itemsToAdd;
//         }

//         return cartsToReturn;
//     } catch (error) {
//         throw error;
//     }

// }