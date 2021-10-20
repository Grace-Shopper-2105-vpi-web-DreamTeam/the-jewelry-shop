const { unstable_renderSubtreeIntoContainer } = require("react-dom");
const {client} = require("./index.js");
//add cart item to cart

const createCart = async ({ userId, isCeckedOut }) => {
    try {
        const {
            rows: [cart]
        } = await client.query(
            `
            INSERT INTO cart ("userId", "isCheckedOut")
            VALUES ($1, $2)
            RETURNING *;
            `, 
            [userId, isCeckedOut]
        );

        return cart;
    } catch (error) {
        throw error;
    }
}

module.exports = { 
    createCart
}