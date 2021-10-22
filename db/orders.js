const { client } = require("./index")

async function getAllOrders() {
    try {
        const { rows: orders } = await client.query(`
            SELECT *
            FROM orders;
        `)

        return orders;
    } catch (error) {
        throw error;
    }
}

async function createOrder({userId}) {
    try {
        const { rows: [order] } = await client.query(`
            INSERT INTO orders("userId")
            VALUES ($1)
            RETURNING *;
        `, [userId])

        return order;
    } catch (error) {
        throw error;
    }
}

async function getOrderByUserId(id) {
    try {
        const {rows: [ order ] } = await client.query(`
            SELECT id, "userId"
            FROM orders
            WHERE id=${id}
        `)

        return order;
    } catch (error) {
        throw error;
    }
} 

module.exports = {
    getAllOrders,
    createOrder,
    getOrderByUserId
}