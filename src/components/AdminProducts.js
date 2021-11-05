import React, { useEffect, useState } from 'react';

import { default as AdminProductCard } from "./AdminProductCard";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const AdminProducts = ({allProducts}) => {

    return (
        <Container>
            
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
                    {allProducts.map((product) => (
                        <Grid
                            item
                            xs={12}
                            md={6}
                            lg={4}
                            key={product.id}
                            style={{ height: "100%" }}
                        >
                            <AdminProductCard
                                product={product}
                            />
                        </Grid>
                    ))}
            </Grid>        
            </div>
        </Container>
    )
}
export default AdminProducts