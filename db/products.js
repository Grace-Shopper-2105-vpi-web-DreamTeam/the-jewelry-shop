const {client} = require("./index.js");

const createProduct = async ({title, description, category, price, inventory, image, isActive}) => {

    if(!isActive && isActive !== false ) {
        isActive = true;
    }

     try {
        const {
            rows: [product]
        } = await client.query(
            `
            INSERT INTO products (title, description, category, price, inventory, image, "isActive")
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (title) DO NOTHING
            RETURNING *;
            `,
            [title, description, category, price, inventory, image, isActive]
        );
        return product;
    } catch (error) {
        throw error;
    }
}

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

const updateProduct = async (id, fields = {}) => {

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

const deleteProduct = async (id) => {
    try {

        await client.query(`
            DELETE FROM cart_item
            WHERE "productId" = $1;
        `, [id]);

        await client.query(`
            DELETE FROM order_item
            WHERE "productId" = $1;
        `, [id]);
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