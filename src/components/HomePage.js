import React, { useEffect, useState } from 'react';

import { default as ProductCard } from "./ProductCards";
import { default as CategoryBanner } from "./CategoryBanner"

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { getAllProducts } from '../api';
import { getProductById } from '../../db/products';

export default function Products({category, setCategory}) {
    const [products, setProducts] = useState([]);

    console.log("the products are", products)

    useEffect(() => {
        const getResult = async () => {
             const results = await getAllProducts()
             setProducts(results)
        }
        getResult();
    }, []);
  
function productRandomizor(min, max) {
    return Math.random() * (max- min) + min;
}

function getSixRandomProducts() {
    randomProductArray = []
    while(randomProductArray.length < 7) {
        productId = productRandomizor(1, 105);
        randomProduct = getProductById(productId)
        if(randomProduct.quantity != 0) {
        randomProductArray.push(randomProduct)
        }
    }

getSixRandomProducts();

}

    return (
        <Container>
            <h2>Home Page </h2> 
            <CategoryBanner 
                category={category}
                setCategory={setCategory}
            /> 
            {/* panel with clickable images of categories go here */}
            <h1
                style={{
                    marginBottom: "10px",
                    fontFamily: "sans-serif"
                }}
                >
                    Top Sellers
                </h1>
            <div
                style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginBottom: "50px",
                }}
            >
                <Grid container spacing={3} alignItems="stretch">
                    {randomProductArray.map((product) => (
                        <Grid
                            item
                            xs={12}
                            md={6}
                            lg={4}
                            key={product.id}
                            style={{ height: "100%" }}
                        >
                            <ProductCard
                                product={product}
                            />
                        </Grid>
                    ))}
            </Grid>        
            </div>
        </Container>
    )
}