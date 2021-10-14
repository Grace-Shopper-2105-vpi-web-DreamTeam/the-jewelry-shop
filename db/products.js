const { client } = require('./index')

// adaptors needed 

// create product (ADMIN)

const createProduct = async ({name, description, price, quantity, categoty, photo}) => {
    try {
        const {
            rows: [product]
        } = await client.query(
            `
            INSTER INTO products (name, description, price, quantity, catagory, photo)
            VALUES ($1, $2, $3, $4, $5, $6)
            returning *;
            `,
            [name, description, price, quantity, categoty, photo]
        );
        return product;
    } catch (error) {
        throw error;
    }
}

// get all products

const getAllProducts = async () => {
    try {
        const {
            rows: products
        } = await client.query(
            `
            SELECT *
            FROM products;
            `
        );
        return products;
    } catch (error) {
        throw error;
    }
}

// get product by id

const getProductById = async (id) => {
    try {
        const {
            rows: [product]
        } = await client.query(
            `
            SELECT * 
            FROM products
            WHERE id=$1;
            `,
            [id]
        );
        return product;
    } catch (error) {
        throw error;
    }
}

// get products by catagory 

const getProductByCatagoty = async (catagory) => {
    try {
        const {
            rows: [product]
        } = await client.query(
            `
            SELECT * 
            FROM products
            WHERE catagory=$1
            `, 
            [catagory]
        );
        return product;
    } catch (error) {
        throw error;
    }
}

// edit product (ADMIN)

const updateProduct = async ({id, name, description, price, quantity, categoty, photo}) => {
    const fields = {name, description, price, quantity, categoty, photo}
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index +1}`).join(", ");
    if(setString.length === 0 ) {
        return;
    }

    try {
        const {
            rows: [product]
        } = await client.query(
            `
            UPDATE products
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
            `,
            Object.values(fields)
        );
        return product;
    } catch (error) {
     throw error;   
    }
}

// delete product (ADMIN)

const deleteProduct = async (id) => {
    try {
        const {
            rows: [deletedProdcut] 
        } = await client.query(
            `
            DELETE FROM products
            WHERE id=$1
            RETURNING *;
            `, 
            [id]
        );
        return deletedProdcut;
    } catch (error) {
        throw error;
    }
}

// add product to cart (TBC if this is something that should be in the cart file)

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    getProductByCatagoty,
    updateProduct,
    deleteProduct
}