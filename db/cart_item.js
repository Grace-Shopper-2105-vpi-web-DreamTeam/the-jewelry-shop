
const { report } = require("../api/products.js");
const {client} = require("./index.js");
//need to check that the manipulator of the cart item is the user

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

const getCartItems = async () => {
    try {
        const {
            rows: cart_items
        } = await client.query(`
            SELECT * 
            FROM cart_item
        `)
    } catch (error) {
        
    }
}
// const getCartItemsByCartId = async (id) => {
//     try {
//         const { rows: cartItems } = await client.query(`
//             SELECT products.title, cart_item.quantity products.price, 
//             FROM cart_item
//             INNER JOIN products
//             ON cart_item."productId" = products.id
//             WHERE cart_item."cartId" = $1;
//         `, [id]);

//         if (!cartItems) {
//             return
//         } else {
//             return cartItems
//         }
//     } catch (error) {
//         throw error
//     }
// }

const attachProductInfoToCartItem = async (id) => {
    try {
        const { rows: cartItems } = await client.query(`
            SELECT cart_item.id as cart_item_id, cart_item."productId", cart_item."cartId", products.title, products.description, products.price, cart_item.quantity
            FROM cart_item
            INNER JOIN products
            ON products.id = cart_item."productId"
            WHERE cart_item."cartId" = $1;
        `, [id])

        return cartItems
    } catch (error) {
        throw error;
    }
    
}

const attachProductInfoToCartItemAndToCart = async (carts) => {
    const cartsToReturn = [...carts];
    const binds = carts.map((_, index) => `$${index + 1}`).join(", ");
    const cartIds = carts.map((cart) => cart.id);

    if (!cartIds?.length) return;

    try {
        const { rows: cartItems } = await client.query(`
            SELECT cart_item.*, products.title, products.description, products.price, cart_item.quantity
            FROM products
            JOIN cart_item ON products.id = cart_item."productId"
            WHERE cart_item."cartId" IN(${binds});
        `, cartIds);

        for (const cart of cartsToReturn) {
            const itemsToAdd = cartItems.filter((cartItem) => cartItem.cartId = cart.id);

            cart.cart_items = itemsToAdd;
        }

        return cartsToReturn;
    } catch (error) {
        throw error;
    }

}

// edit cart item 

// delete cart item 

module.exports = { 
    addItemToCart,
    getCartItems,
    //getCartItemsByCartId
    attachProductInfoToCartItem,
    attachProductInfoToCartItemAndToCart
}