const express = require("express");

const productsRouter = express.Router();

const {
    createProduct,
    getAllProducts,
    getProductById,
    getProductByCatagoty,
    updateProduct,
    deleteProduct
} = require("../db");

const {
    requireLogin,
    requireAdmin,
    requiredNotSent
} = require("./utils");

// get all products

productsRouter.get("/", async (req, res, next) => {
    try {
        res.send(await getAllProducts());
    } catch (error) {
        next(error);
    }
})

// get products by catagory *** TBD IF THIS IS CORRECT
productsRouter.get("/:productCatagory", async (req, res, next) => {
    try {
        const { catagory } = req.params;
        const products = await getProductByCatagoty({catagory});
        if(!products) {
            next({
                name: "ProductsNotFound",
                message: `No Product found for catagoty ${catagory}`
              })
        }
        res.send(products)
    } catch (error) {
        next(error);
    }
})
// create product (ADMIN)
productsRouter.post("/", requireLogin, requireAdmin, async (req, res, next) => {
    try {
        const { name, description, price, quantity, categoty, photo } = req.body;
        const product = await createProduct({name, description, price, quantity, categoty, photo});
        if (product) {
            res.send(product);
        }
    } catch (error) {
        next(error);
    }
} )

// edit product (ADMIN) TO DO:: CREATE A REQUIREDNOTSET in utils
productsRouter.patch("/:productId", 
requireLogin, requireAdmin, requiredNotSent({requiredParams: ["name", "description", "price", "quantity", "categoty", "photo"], atLeastOne: true}), 
async (req, res, next) => {
  const { productId } = req.params;
  const {name, description, price, quantity, categoty, photo} = req.body; 

  try {
      const originalProduct = await getProductById(productId);

      if(!originalProduct) {
          next({
            name: "ProductNotFound",
            message: `No Product found by Id ${productId}`
          })
      } else {
          const updatedProduct = await updateProduct({id: productId, name, description, price, quantity, categoty, photo});
          res.send(updateProduct)
      }
  } catch (error) {
      next(error);
  }
})
// delete product (ADMIN)

productsRouter.delete("/:productId", requireLogin, requireAdmin, async (req, res, next) => {
    const { productId } = req.params;
    
    try {
        const productToDelete = await getProductById(productId);

        if(!productToDelete) {
            next({
                name: "ProductNotFound",
                message: `No Product found by Id ${productId}`
              })
        } else {
            const deletedProduct = await deleteProduct(productId);
            res.send(deletedProduct)
        }
    } catch (error) {
        next(error);
    }
}) 

// add product to cart (TBC if this is something that should be in the cart file)