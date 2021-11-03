import React, { useEffect, useState} from "react";
import { Link, Redirect } from "react-router-dom";

import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';

import { getCart, cartToCheckout } from '../api';
import CheckoutItemCard from "./CheckoutItemCard";

export default function Checkout({cartItems, setCartItems}) {
    console.log("the cart itmes in checkout", cartItems)
    const [checkoutCart, setCheckoutCart] = useState([]);

    const cartId = JSON.parse(localStorage.getItem('cartId'));
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

    const myToken = userDetails.token;
    const userId = userDetails.user.id

    
    useEffect(() => {
        const getResult = async () => {
             const results = await getCart(cartId)
             setCheckoutCart(results)
             const itemsTocheckout = results.cart.cartItems
             setCartItems(itemsTocheckout)
        }
        getResult();
    }, []);

    console.log("the cart is", checkoutCart);

    function getTotal () {
        const total = cartItems.reduce(function(sum, num) {
            return sum + Number(num.total);
            }, 0)
    
        return total.toFixed(2);
    }

    const grandTotal = getTotal();

    async function checkout(e) {
        e.preventDefault();
        console.log("checkout")
        const order = await cartToCheckout(userId, myToken)
        console.log(order)
        if(order) {
            localStorage.removeItem('cartId')
            localStorage.removeItem('cart')
            console.log("success")
            window.location.href ="/ordersuccess" 
        } else {
            alert("Error Placing order. Please try again")
            window.location.href = "/jewelry";
        }

    }

    // const prepCheckout = async () => {
    //     const cartId = JSON.parse(localStorage.getItem('cartId'));
    //     cartToDisplay.map((cartItem) => {
    //         cartItem.cart_id = cartId,
    //         delete cartItem.image;
    //         delete cartItem.inventory;
    //         delete cartItem.price;
    //         delete cartItem.title;
    //     });
    //     console.log("cart items to create", cartToDisplay)
    //     const cartItemsCreated = await Promise.all(cartToDisplay.map(createCartItems))
    //     console.log("cart Items are", cartItemsCreated)
    //     setCartItems(cartItemsCreated)
    //     //go to checkout page 
    //     //turn cart into order 
    // }



  return (
    <>
    <Box sx={{ p: 2, border: '1px dashed grey', textAlign: "center" }}>
        <Typography variant="h2"> 
            Checkout
        </Typography>
    </Box>
    < >
        {checkoutCart ? 
            < >
                <Grid container spacing={1}>
                    {cartItems.map((item) => (
                        <CheckoutItemCard key={item.productId} item={item}/>
                    ))}
                </Grid>
                <div style={{display: "flex", justifyContent:"flex-end", paddingRight: "50px", paddingTop: "10px"}}> 
                    Grand Total: {`$${grandTotal.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`} 
                </div>
                <br />
                <div style={{display: "flex", justifyContent:"flex-end", paddingRight: "50px"}}>

                    {myToken ? 
                        <Button onClick={(e) => {checkout(e)}} > Place Order </Button>
                        :
                        <Link to="./login"> Please Login or Register to Checkout </Link>
                    }
                </div>
            </ >
        :
        <p> No Cart Items Yet. Please make a selection to checkout </p>
        }
    </>
</>
  )
};