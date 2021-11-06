import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";

import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';

import { getCart, cartToCheckout } from '../api';
import CheckoutItemCard from "./CheckoutItemCard";

export default function Checkout({cartItems, setCartItems}) {
    const [checkoutCart, setCheckoutCart] = useState([]);
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

    const myToken = userDetails.token;
    const userId = userDetails.user.id

    
    useEffect(() => {
        const getResult = async () => {
             const results = await getCart(userId, myToken)
             setCheckoutCart(results)
             const itemsTocheckout = results.cart.cartItems
             setCartItems(itemsTocheckout)
        }
        getResult();
    }, []);

    function getTotal () {
        const total = cartItems.reduce(function(sum, num) {
            return sum + Number(num.total);
            }, 0)
    
        return total.toFixed(2);
    }

    const grandTotal = getTotal();

    async function checkout(e) {
        e.preventDefault();
        const order = await cartToCheckout(userId, myToken)
        if(order) {
            localStorage.removeItem('cartId')
            localStorage.removeItem('cart')
            window.location.href ="/ordersuccess" 
        } else {
            alert("Error Placing order. Please try again")
            window.location.href = "/jewelry";
        }
    }

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
                        <>
                            <Button onClick={(e) => {checkout(e)}} > Place Order </Button>
                            <Link to="/cart"> <Button > Go Back </Button></Link>
                        </>
                        :
                        <Link to="/login"> Please Login or Register to Checkout </Link>
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