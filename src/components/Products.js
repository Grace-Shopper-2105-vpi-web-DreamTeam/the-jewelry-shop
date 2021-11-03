import React, { useEffect, useState } from 'react';

import { default as ProductCard } from "./ProductCards";
import { default as CategoryBanner } from "./CategoryBanner"

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { getAllProducts, createCart, getCart } from '../api';

export default function Products({category, setCategory, setUserCart}) {
    const [products, setProducts] = useState([]);

    console.log("the products are", products)

    useEffect(() => {
        const getResult = async () => {
             const results = await getAllProducts()
             setProducts(results)
        }
        getResult();

    }, []);

    return (
        <Container>
            <CategoryBanner 
                category={category}
                setCategory={setCategory}
            /> 
            <h1
                style={{
                    marginBottom: "10px",
                    fontFamily: "sans-serif"
                }}
                >
                    Shop All Jewelry
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
                    {products.map((product) => (
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
                                setUserCart={setUserCart}
                            />
                        </Grid>
                    ))}
            </Grid>        
            </div>
        </Container>
    )
}



