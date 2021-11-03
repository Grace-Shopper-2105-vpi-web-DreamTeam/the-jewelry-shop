import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

import CartItem from "./CartItems";
import Checkout from "."

import { createCart, createCartItems } from '../api';

import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';

export default function Cart({setCartItems}) {
    
    const userId = JSON.parse(localStorage.getItem('userId'));
    let cart = JSON.parse(localStorage.getItem('cart'));
    const myToken = localStorage.getItem('token');

    function getCart() {
        let temp = [];
        for (let i of cart ) {
            i && temp.push(i);
        }
        cart = temp;
        return cart;
    }
        
    const cartToDisplay = getCart();

    function getTotal () {
        const total = cart.map(function(num) {
            return num.quantity * num.price;
            })
        const totalTotal = total.reduce(function(sum, num){
            return sum + num;
        }, 0)
        return totalTotal;
    }

    const grandTotal = getTotal();

    console.log("before prep", cartToDisplay)

    const prepCheckout = async () => {
        const cartId = JSON.parse(localStorage.getItem('cartId'));
        cartToDisplay.map((cartItem) => {
            cartItem.cart_id = cartId,
            delete cartItem.image;
            delete cartItem.inventory;
            delete cartItem.price;
            delete cartItem.title;
        });
        console.log("cart items to create", cartToDisplay)
        const cartItemsCreated = await Promise.all(cartToDisplay.map(createCartItems))
        console.log("cart Items are", cartItemsCreated)
        setCartItems(cartItemsCreated)
        //go to checkout page 
        //turn cart into order 
        
    }


    return (
        <>
            <Box sx={{ p: 2, border: '1px dashed grey', textAlign: "center" }}>
                <Typography variant="h2"> 
                    Shopping Cart
                </Typography>
            </Box>
            < >
                {cart ? 
                    < >
                        <Grid container spacing={1}>
                            {cartToDisplay.map((item) => (
                                <CartItem key={item.productId} item={item}/>
                            ))}
                        </Grid>
                        <div style={{display: "flex", justifyContent:"flex-end", paddingRight: "50px", paddingTop: "10px"}}> 
                            Grand Total: ${grandTotal} 
                        </div>
                        <br />
                        <div style={{display: "flex", justifyContent:"flex-end", paddingRight: "50px"}}>

                            {myToken ? 
                                <Link to="./checkout" > <Button onClick={() => {prepCheckout()}} > Continue to Checkout </Button> </Link>
                                :
                                <Link to="./login"> Please Login or Register to Checkout </Link>
                            }
                        </div>
                    </ >
                :
                <p> No Cart Items Yet, checkout our jewelry selection and add to cart. </p>
                }
            </>
        </>
    )
}
