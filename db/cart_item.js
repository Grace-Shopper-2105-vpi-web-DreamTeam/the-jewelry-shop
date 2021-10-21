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

// const getCartItemsByCartId = async (id) => {
//     try {
//         const { rows: cartItems } = await client.query(`
//             SELECT products.title, cart_item.quantity products.price, 
//             FROM products
//             INNER JOIN cart_item
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

// const attachProductInfoToCartItem = async () => {
//     try {
//         const { rows: products } = await client.query(`
//             SELECT title, price
//             FROM products
//             WHERE "isActive" = true;
//         `);

//         const { rows: cartItems } = await client.query(`
//             SELECT * 
//             FROM cart_item 
//             WHERE "productId"
//             IN( ${products.map(product => product.id).join(', ')});
//         `);

//         return cartItems
//     } catch (error) {
//         throw error;
//     }
    
// }

// edit cart item 

// delete cart item 

module.exports = { 
    addItemToCart,
    //getCartItemsByCartId
    //attachProductInfoToCartItem
}