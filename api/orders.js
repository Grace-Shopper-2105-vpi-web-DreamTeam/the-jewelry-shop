const express = require('express');
const ordersRouter = express.Router();
const { JWT_SECRET } = process.env;
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { getOrderItemsByOrder, addOrderItemToOrder } = require('../db/orderItems');

//db functions we need 
//getOrderById
//deleteOrder

const {
    getAllOrders,
    createOrder,
    getOrderByUserId,
    getOrderById
} = require("../db/orders");

const {
    requireLogin,
    requireAdmin,
    requiredNotSent
} = require("./utils");

ordersRouter.get("/",requireLogin,requireAdmin, async (req, res, next) => {
    try {
        res.send(await getAllOrders());
    } catch (error) {
        next(error);
    }
})

ordersRouter.get("/:orderId/order", requireLogin, async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const order = await getOrderById(orderId);

        if (!order) {
            next({
                name: "OrderNotFound",
                message: `Order Not Found with Id ${orderId}`
            })
        }
        if (req.user.id !== order.userId) {
            next({
                name: "Not authorized",
                message: `The Order with Id ${orderId} is Not Associated With Your UserId}`
            })
        }
        res.send({ order })
    } catch ({ name, message }) {
        next({ name, message })
    }
});

ordersRouter.get("/:userId",requireLogin, async (req, res, next) => {
    try {
        const { userId } = req.params;
        const orders = await getOrderByUserId(userId);

        if (!orders) {
            next({
                name: "OrderNotFound",
                message: `Order found with Id ${userId}`
            })
        }

        if (req.user.id !== +userId) {
            next({
                name: "Not authorized",
                message: `Logged in user does not match requested user ${userId}`
            })
        }

        res.send({ orders })
    } catch ({ name, message }) {
        next({ name, message })
    }
});

//Do we even need this if we are going to create the order on checkout?
ordersRouter.post("/:userId/order", requireLogin, async (req, res, next) => {
    const { userId } = req.params;
 
    if (req.user.id !== +userId) {
        next({
            name: "Not authorized",
            message: `Logged in user does not match requested user ${userId}`
        })
    }

    try {
        const order = await createOrder({ userId });
        if (order) {
            res.send(order);
        } else {
            next({
                name: "Missing UserId Error",
                message: "You Must Be Logged In to Create An Order"
            })
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
})


// Maybe not necessary, I was thinking maybe this should be done during the checkout phase in the cart.js checkoutCart db function


// ordersRouter.post('/:orderId/items', requiredNotSent({ requiredParams: ['productId','quantity'] }), async (req, res, next) => {
//     const { productId, quantity } = req.body
//     const { orderId } = req.params

//     try {
//         const order = await getOrderById(orderId);
//         const items = await getOrderItemsByOrder(order);
//         if (order) {
//             const dupOrder = items.find(item => items.productId === productId);
//             if (dupOrder) {
//                 next({
//                     name: "Item not added",
//                     message: "This item is already associated with the order"
//                 });

//             } else {
//                 const newOrder = await addOrderItemToOrder({
//                     productId,
//                     orderId,
//                     quantity
                
//                 })
//                 if (newOrder) {
//                     res.send(newOrder);
//                 } else {
//                     next();
//                 }
//             }
//         }
//     } catch (err) {
//         next(err);
//     }
// });



module.exports = ordersRouter;