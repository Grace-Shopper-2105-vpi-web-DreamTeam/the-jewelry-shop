const {client} = require("./index.js");


//this will create cart. on front end have cart created if guest user clicks to shop page & save cart id in local storage. if user logs in create cart then and save user id on log in. will not run if cart already exists. 
const createCart = async ({ userId, isActive }) => {

    if(!isActive && isActive !== false ) {
        isActive = true;
    }

    try {

        const {
            rows: [cart]
        } = await client.query(
            `
            INSERT INTO cart ("userId", "isActive")
            VALUES ($1, $2)
            RETURNING *;
            `, 
            [userId, isActive]
        );

        return cart;
    } catch (error) {
        throw error;
    }
}

const getAllActiveCarts = async () => {
    try {
        const {
            rows: activeCarts
        } = await client.query(
            `
            SELECT * 
            FROM cart
            WHERE "isActive" = true
            `
        );
        return activeCarts;
    } catch (error) {
        throw error;
    }
}
const getCartById = async (id) => {
    try {
        const {
            rows: [cart]
        } = await client.query(`
            SELECT * 
            FROM cart 
            WHERE id=$1
            AND "isActive" = true;
        `, [id]
        );

        if(!cart) {
            return;
        }
        return cart;
    } catch (error) {
        throw error;
    }
}
// this will get the cart & all cart itmes (and in front end be what we use to display cart. Use attach cartitems to cart here)
// const getCartByCartId = async (id) => {
//     console.log(id)
//     try {
//         const { 
//             rows: [cart] 
//         } = await client.query(`
//             SELECT cart.*, cart_item.id, cart_item."productId", cart_item.quantity
//             FROM cart
//             INNER JOIN cart_item
//             ON cart_item."cartId" = cart.id
//             WHERE cart.id = $1
//         `, [id]
//         );

//         // SELECT title, cart_item.quantity, price, cart_item.quantity*price AS total
//         //     FROM products
//         //     INNER JOIN cart_item
//         //     ON cart_item."productId" = products.id
//         //     LEFT JOIN cart.id = cart_item."cartId"
//         //     WHERE cart.id = $1
//         // `, [id]
        
//         return cart;
    
//     } catch (error) {
//         throw error;
//     }
// } 

// if a user has an active cart, or the cart 
const addUserIdToCart = async (userId, cartId) => {

    console.log(userId)
    try {
        const checkForUser = await getCartByUserId(userId);

        const checkForCart = await getCartById(cartId);

        let cartExists = false;

        if (checkForCart !== undefined) {
            cartExists = checkForCart;
        }

        console.log("user is", checkForUser);

        console.log("cart is", checkForCart);

        console.log("cart exists is", cartExists)

        if(checkForUser) {
            return 
        } else if (cartExists.userId !== null) {
            return 
        } else {
            const {
                rows: [updatedCart]
            } = await client.query(`
                UPDATE cart
                SET "userId" = $1
                WHERE id = $2
                RETURNING *;
                `, 
                [userId, cartId])
    
            return updatedCart;
        }
    } catch (error) {
        throw error;
    }

}

// not sure if we will end up using this. 

const getCartByUserId = async (id) => {
    try {
        const {
            rows: [cart]
        } = await client.query(`
            SELECT * 
            FROM cart 
            WHERE "userId"=${id}
            AND "isActive" = true;
        `);

        // if(!cart) {
        //     return;
        // }
        return cart;
    } catch (error) {
        throw error;
    }
}

//will update cart status to checkedout = true. maybe change to isActive and change to false on checkout. on front end, on checkout will call this and create order. 
const checkoutCart = async (id) => {
    try {
        const {
            rows: [ checkedoutCart ]
        } = await client.query(`
            UPDATE cart
            SET "isActive" = false
            WHERE id=$1
            RETURNING *
        `, [id]
        );
        
        return checkedoutCart;
    } catch (error) {
        throw error;
    }

}

module.exports = { 
    createCart, 
    getAllActiveCarts,
    getCartById,  
    getCartByUserId,
    addUserIdToCart,
    checkoutCart, 
  
}