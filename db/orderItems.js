const { client } = require("./index")

// need to attach product infor 

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

async function getOrderItemsByOrder (id) {
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM order_item
            WHERE "orderId"=${id};
        `)
        return rows;
    } catch (error) {
        throw error;
    }
}



module.exports = {
   addOrderItemToOrder,
   getOrderItemsByOrder
}