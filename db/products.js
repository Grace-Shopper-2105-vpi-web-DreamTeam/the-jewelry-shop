const { client } = require('./index')

// adaptors needed 

// create product (ADMIN)

const createProduct = async ({name, description, price, quantity, categoty, photo}) => {
    try {
        const {
            rows: [product]
        } = await client.query(
            `INSTER INTO products (name, description, price, quantity, catagory, photo)
            VALUES ($1, $2, $3, $4, $5, $6)
            returning *;
            `,
            [name, description, price, quantity, categoty, photo]
        )
        return product
    } catch (error) {
        throw error;
    }
}

// delete product (ADMIN)

// edit product (ADMIN)

// get all products

// get product by id

// get products by catagory 

// add product to cart (TBC if this is something that should be in the cart file)

module.exports = {
    createProduct
}