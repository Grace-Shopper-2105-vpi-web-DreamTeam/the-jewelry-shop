import React from 'react';

import { default as AdminProductCard } from "./AdminProductCard";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button'
import AddBoxIcon from '@mui/icons-material/AddBox';
import Paper from '@mui/material/Paper';
import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';

import {
    useHistory,
} from "react-router-dom"

const AdminProducts = ({ allProducts, setAllProducts, setProductEdit }) => {
    let history = useHistory();
    return (
        <Container>
            <Box sx={{ p: 2, border: '1px white', textAlign: "center" }}>
                <Paper
                    sx={{
                        position: 'relative',
                        backgroundColor: '#dccdc6',
                        color: 'black',
                        mb: 4,

                    }}
                >
                    <Typography variant="h4">
                        <br></br>
                        Loops & Strings Current Inventory
                        <br></br>
                        <br></br>
                    </Typography>
                    <br></br>
                </Paper>
            </Box>
            <Box sx={{ p: 2, border: '1px white', textAlign: "center" }}>
                <Button style={{ alignItems: 'center' }} onClick={() => history.push('/newproduct')} variant="contained" startIcon={<AddBoxIcon />}>
                    Add A New Product
                </Button>
                <br></br>
                <br></br>
            </Box>
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