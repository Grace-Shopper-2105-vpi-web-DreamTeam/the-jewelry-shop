import React, { useEffect, useState, useRef } from 'react';

import { Link } from "react-router-dom"

import { default as ProductCard } from "./ProductCards";
import { default as CategoryBanner } from "./CategoryBanner"

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { getAllProducts } from '../api';
import featured from "../imgs/featured.png";

export default function HomePage({allProducts, setCart}) {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    const inputRef = useRef();

    useEffect(() => {

        function getSixRandomProducts() {
            let randomProductsArray = allProducts.sort(() => .5 - Math.random()).slice(0, 6)
            setFeaturedProducts(randomProductsArray);
        }
        getSixRandomProducts();

    }, [allProducts]);

    return (
        <div >
            <div>
            <Link to="/jewelry"><img className="banner" src={featured} alt="site banner"></img></Link>
            </div>
            <Container>
                <h1
                    style={{
                        marginTop: "10px",
                        marginBottom: "10px",
                        fontFamily: "sans-serif",
                        textAlign: "center"
                    }}
                >
                    Top Sellers!
                    <br />
                </h1>
                {/* <h2
                    style={{
                        marginTop: "10px",
                        marginBottom: "10px",
                        fontFamily: "sans-serif",
                        textAlign: "center"
                    }}
                >
                   View a selection of our Top Sellers Below
                   < br />
                   <Link style={{textDecoration: "none"}} to="/jewelry"> Click Here to Shop All our Jewelry</Link>
                </h2>
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
                    {featuredProducts.map((product) => (
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
                    View a selection of our Top Sellers Below
                    < br />
                    <Link style={{ textDecoration: "none" }} to="/jewelry"> Click Here to Shop All our Jewelry</Link>
                </h2> */}
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
                        {featuredProducts.map((product) => (
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
        </div>
    )
}