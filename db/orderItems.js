const { client } = require("./index")

async function addOrderItemToOrder({orderId, productId, quantity}) {
    try {
        const { rows: [order] } = await client.query(`
            INSERT INTO order_item("orderId", "productId", quantity)
            VALUES ($1,$2,$3)
            RETURNING *;
        `, [orderId, productId, quantity])

        return order;
    } catch (error) {
        throw error;
    }
}



module.exports = {
   addOrderItemToOrder
}