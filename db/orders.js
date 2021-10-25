const { client } = require("./index")

//need to attach order items to order via orderID

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

async function createOrder({userId, total}) {
    try {
        const { rows: [order] } = await client.query(`
            INSERT INTO orders("userId", total)
            VALUES ($1, $2)
            RETURNING *;
        `, [userId, total])

        return order;
    } catch (error) {
        throw error;
    }
}

async function getOrdersByUserId(id) {
    try {
        const {rows: orders } = await client.query(`
            SELECT *
            FROM orders
            WHERE "userId"=${id}
        `)

        return orders;
    } catch (error) {
        throw error;
    }
} 

const getOrderById = async (id) => {
    try {
        const {rows: [order]} = await client.query(`
            SELECT * 
            FROM orders
            WHERE id=$1;
            `,[id]);
        return order;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllOrders,
    createOrder,
    getOrdersByUserId,
    getOrderById
}