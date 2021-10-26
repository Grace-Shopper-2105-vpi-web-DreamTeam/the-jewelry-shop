const { client } = require("./index");
const { attachProductInfoToOrderItem, attachAllProductInfoToOrderItemAndToOrder } = require("./orderItems");

//need to attach order items to order via orderID

async function getAllOrders() {
    try {
        const { rows: orders } = await client.query(`
            SELECT *
            FROM orders;
        `)

        return attachAllProductInfoToOrderItemAndToOrder(orders);
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

async function getOrdersByUserId(userId) {
    try {
        const {rows: orders } = await client.query(`
            SELECT *
            FROM orders
            WHERE "userId"=${userId}
        `)

        return attachAllProductInfoToOrderItemAndToOrder(orders);
    } catch (error) {
        throw error;
    }
} 

const getOrderById = async (orderId) => {
    try {
        const {rows: [order]} = await client.query(`
            SELECT * 
            FROM orders
            WHERE id=$1;
            `,[orderId]);

        const orderItems = await attachProductInfoToOrderItem(orderId);

        order.order_items = orderItems.filter((orderItem) => orderItem.orderId = order.id)
        
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