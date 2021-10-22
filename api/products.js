const express = require("express");

const productsRouter = express.Router();

const {
    createProduct,
    getAllProducts,
    getAllActiveProducts,
    getProductById,
    getProductByCategory,
    updateProduct,
    deleteProduct,
    deactivateProduct
} = require("../db/products");

const {
    requireLogin,
    requireAdmin,
    requiredNotSent
} = require("./utils");

// get all products -- ASK IF WE WANT IT TO SHOW products or not {}

// productsRouter.get("/", async (req, res, next) => {
//     try {    
//         const products = await getAllProducts();
//         res.send({products});
//     } catch (error) {
//         next(error);
//     }
// })

productsRouter.get("/", async (req, res, next) => {
    try {
        res.send(await getAllProducts());
    } catch (error) {
        next(error);
    }
})

productsRouter.get("/:productId", async (req, res, next) => {
    try {
        const { productId } = req.params;
        const product = await getProductById(productId);

        if(!product) {
            next({
                name: "ProductNotFound",
                message: `No product found with Id ${productId}`
              })
        }

        res.send({product})
    } catch ({name, message}) {
        next({name, message})
    }
})

// get products by category 
productsRouter.get("/category/:category", async (req, res, next) => {
    try {
        const { category } = req.params;
        const products = await getProductByCategory(category);

        if(!products || products.length < 1) {
            next({
                name: "ProductsNotFound",
                message: `No active products found for catagoty ${category}`
              })
        }
        res.send({products});

    } catch (error) {
        next(error);
    }
})

// create product (ADMIN) 
productsRouter.post("/", requireAdmin, async (req, res, next) => {
    try {
        const { title, description, category, price, inventory, isActive } = req.body;
        const product = await createProduct({title, description, category, price, inventory, isActive});
        if (product) {
            res.send({product});
        } else {
            next({
                name: "MissingProductInformationError",
                message: "Please supply required content to create product"
            })
        }
    } catch ({name, message}) {
        next({name, message});
    }
} )

// edit product (ADMIN)
productsRouter.patch("/:productId", requireAdmin, requiredNotSent({requiredParams: ["title", "description", "category", "price", "inventory", "isActive"], atLeastOne: true}), 
async (req, res, next) => {
  const { productId } = req.params;
  const {title, description, category, price, inventory, isActive} = req.body; 
  const updateFields = {}

  console.log("isactive", isActive)

  if (title) {
      updateFields.title = title;
  }

  if (description) {
    updateFields.description = description;
  }
  
  if (category) {
        updateFields.category = category;
  }
  
  if (price) {
        updateFields.price = price;
  }
  
  if (inventory) {
        updateFields.inventory = inventory;
  }
  
  if (isActive || isActive === false) {
        updateFields.isActive = isActive;
  }

  try {
      const originalProduct = await getProductById(productId);

      if(!originalProduct) {
          next({
            name: "ProductNotFound",
            message: `No Product found by Id ${productId}`
          })
      } else {
          const updatedProduct = await updateProduct(productId, updateFields);
          res.send(updatedProduct)
      }
  } catch (error) {
      next(error);
  }
})

// delete product (ADMIN)

productsRouter.delete("/:productId", requireAdmin, async (req, res, next) => {
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

productsRouter.delete("/deactivate/:productId", requireAdmin, async (req, res, next) => {
    const { productId } = req.params;
    
    try {
        const productToDelete = await getProductById(productId);

        if(!productToDelete) {
            next({
                name: "ProductNotFound",
                message: `No Product found by Id ${productId}`
              })
        } else {
            const deletedProduct = await deactivateProduct(productId);
            res.send(deletedProduct)
        }
    } catch (error) {
        next(error);
    }
}) 


// add product to cart (TBC if this is something that should be in the cart file)

module.exports = productsRouter;