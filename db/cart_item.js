const {client} = require("./index.js");

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

const getCartItemById = async (cartItemId) => {

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

        return cart_item;

    } catch (error) {
        throw error;
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
        throw error;
    }
}

const attachProductInfoToCartItem = async (cartId) => {
    try {
        const { rows: cartItems } = await client.query(`
            SELECT cart_item.id as cart_item_id, cart_item."productId", cart_item."cartId", products.title, products.description, products.price, products.image, products.inventory, cart_item.quantity*products.price as total
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
        throw error;
    }
}

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
        throw error;
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