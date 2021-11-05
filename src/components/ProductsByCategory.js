
import React, { useState, useEffect} from "react";

import { default as ProductCard } from "./ProductCards";
import { default as CategoryBanner } from "./CategoryBanner";

import { getProductsByCategory } from '../api';

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

export default function ProductsByCategory({category, setCategory, setCart}) {

    const [productsCategory, setProductsCategory ] = useState([]);

    useEffect(() => {
        const getProductbyCategoryResults = async () => {
            const results = await getProductsByCategory(category);
            if(results.products) {
                setProductsCategory(results.products);
            }
        }
        getProductbyCategoryResults();
    }, [category]);

    if(productsCategory.length > 0) {
        return (
            <Container>
                <h2>Products By Category Page in the works </h2> 
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
                    {`Shop by ${category}`}
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
                        {productsCategory.map((product) => (
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
                                    setCart={setCart}
                                />
                            </Grid>
                        ))}
                </Grid>        
                </div>
            </Container>
        )
    } else {
        return (
            <div>
                <CategoryBanner 
                    category={category}
                    setCategory={setCategory}
                /> 
                <h2>There are no products for this category yet. Please check again soon. </h2> 
            </div>
        )
    }
}