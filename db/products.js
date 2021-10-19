const {client} = require("./index.js");

// adaptors needed 

// create product (ADMIN)

const createProduct = async ({title, description, category, price, inventory, isActive}) => {

    if(!isActive && isActive !== false ) {
        isActive = true;
    }

     try {
        const {
            rows: [product]
        } = await client.query(
            `
            INSERT INTO products (title, description, category, price, inventory, "isActive")
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (title) DO NOTHING
            RETURNING *;
            `,
            [title, description, category, price, inventory, isActive]
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

//getAllAvailableProducts 

const getAllActiveProducts = async () => {
    try {
        const { 
            rows: activeProducts 
        } = await client.query(
            `
            SELECT * 
            FROM products
            WHERE "isActive" = true;
            `
        );
        return activeProducts
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

const getProductByCategory = async (category) => {
    try {
        const {
            rows: products
        } = await client.query(
            `
            SELECT * 
            FROM products
            WHERE category=$1
            AND "isActive"=true;
            `, 
            [category]
        );
        return products;
    } catch (error) {
        throw error;
    }
}

// edit product (ADMIN)

const updateProduct = async (id, fields = {}) => {

    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index +1}`).join(", ");
    if(setString.length === 0 ) {
        return;
    }

    console.log("the id is", id);

    console.log("the fields are", fields);
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

const deactivateProduct = async (id) => {
    try {
        const {
            rows: [deactivatedProdcut] 
        } = await client.query(
            `
            UPDATE products
            SET "isActive" = false
            WHERE id=$1
            RETURNING *;
            `, 
            [id]
        );
        return deactivatedProdcut;
    } catch (error) {
        throw error;
    }
}
// add product to cart (TBC if this is something that should be in the cart file)

module.exports = {
    createProduct,
    getAllProducts,
    getAllActiveProducts,
    getProductById,
    getProductByCategory,
    updateProduct,
    deleteProduct, 
    deactivateProduct
}