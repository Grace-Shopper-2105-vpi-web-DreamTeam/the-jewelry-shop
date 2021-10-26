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

const attachProductInfoToOrderItem = async (orderId) => {
    try {
        const { rows: orderItems } = await client.query(`
            SELECT order_item.id as order_item_id, order_item."productId", order_item."orderId", products.title, products.description, products.price, order_item.quantity
            FROM order_item
            INNER JOIN products
            ON products.id = order_item."productId"
            WHERE order_item."orderId" = $1;
        `, [orderId]);

        return orderItems;
    } catch (error) {
        throw error;
    }
}

const attachAllProductInfoToOrderItemAndToOrder = async (orders) => {
    const ordersToReturn = [...orders];
    const binds = orders.map((_, index) => `$${index + 1}`).join(", ");
    const orderIds = orders.map((order) => order.id);

    if (!orderIds?.length) return;

    try {
        const { rows: orderItems } = await client.query(`
            SELECT order_item.id as order_item_id, order_item."productId", order_item."orderId", products.title, products.description, products.price, order_item.quantity
            FROM products
            JOIN order_item ON products.id = order_item."productId"
            WHERE order_item."orderId" IN(${binds});
        `, orderIds);

        for (const order of ordersToReturn) {
            const itemsToAdd = orderItems.filter((orderItem) => orderItem.orderId === order.id);
            order.order_items = itemsToAdd;
        }

        return ordersToReturn;
    } catch (error) {
        throw error;
    }

}


module.exports = {
   addOrderItemToOrder,
   getOrderItemsByOrder,
   attachProductInfoToOrderItem,
   attachAllProductInfoToOrderItemAndToOrder
}