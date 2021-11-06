import React, { useEffect, useState } from 'react';

import { default as AdminProductCard } from "./AdminProductCard";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Stack from '@mui/material/Stack';

import {
    useHistory,
} from "react-router-dom"

const AdminProducts = ({ allProducts, setAllProducts, setProductEdit }) => {
let history = useHistory();
    return (
        <Container>

            <h1
                style={{
                    marginBottom: "10px",
                    fontFamily: "sans-serif"
                }}
            >
                Loops & Strings Current Inventory
            </h1>
            <Stack direction="row" spacing={2}>
                  
                    <Button onClick={() => history.push('/newproduct')} variant="contained" startIcon={<AddBoxIcon />}>
                        Add A New Product
                    </Button>
                </Stack>

            {/* <button className="btn-add-routine" onClick={() => history.push('/newproduct')}>+ Add A New Product</button> */}


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
                                setAllProducts={setAllProducts}
                                setProductEdit={setProductEdit}
                            />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Container>
    )
}
export default AdminProducts