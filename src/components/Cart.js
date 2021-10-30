import React from "react";
import { Link } from "react-router-dom";

import CartItem from "./CartItem";

import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';

export default function Cart({token}) {

    const cart = JSON.parse(localStorage.getItem('cart'));

    if (cart) {
        cart.shift();
    }
    
    console.log("the cart is", cart)

    return (
        <div>
            <Box sx={{ p: 2, border: '1px dashed grey', textAlign: "center" }}>
                <Typography variant="h2"> 
                    Shopping Cart
                </Typography>
            </Box>
            <div >
                {cart ? 
                <>
                <Grid container spacing={1}>
                    {cart.map((item) => (
                        <CartItem key={item.productId} item={item}/>
                    ))}
                </Grid>
                <div style={{display: "flex", justifyContent:"flex-end", paddingRight: "10px"}}>
                    {token ? 
                        <Button > Checkout </Button>
                        :
                        <Link to="./login"> Please Login or Register to Checkout </Link>
                    }
                </div>
                </>
                :
                <p> No Cart Items Yet, checkout our jewelry selection and add to cart. </p>
                }
            </div>
        </div>
    )
}

