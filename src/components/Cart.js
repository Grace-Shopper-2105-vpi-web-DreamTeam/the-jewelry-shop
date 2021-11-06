import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

import CartItem from "./CartItems";
import UserCartItem from "./UserCartItems";

import { createCartItems, getCart, deleteCartItem } from '../api';

import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';

export default function Cart({setCartItems, cartItems}) {

    const [itemDeleted, setItemDeleted] = useState(0);
    
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    let cart = JSON.parse(localStorage.getItem('cart'));
    const myToken = localStorage.getItem('token');

    let LocalStorageToDisplay = [];

    //functions to create and modify cart if logged in user has cart items saved to database
    
    useEffect(() => {
        const getResult = async () => {
            try {
                if (userDetails && !cart) {
                const userId = userDetails.user.id
                const results = await getCart(userId, myToken)
                    if (results) {
                    const items = results.cart.cartItems
                    setCartItems(items)
                    }
                }
                if (userDetails && cart) {
                    const userId = userDetails.user.id
                    const results = await getCart(userId, myToken)
                    if (results) {
                        LocalStorageToDisplay  = getCurrentCartFromLocalStorage();
                        const LocalStorageItems = await createNewCartItems();
                        const items = results.cart.cartItems
                        setCartItems(items, LocalStorageItems)
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
        getResult();
    }, [itemDeleted]);

    function getCurrentCartFromLocalStorage() {
            if(cart && cart.length > 0 ) {
                let temp = [];
                for (let i of cart ) {
                    i && temp.push(i);
                }
                cart = temp;
            } 
            return cart;
        }
    async function deleteItem(id) {
        const result = await deleteCartItem(id);
        if(result) {
            setItemDeleted(itemDeleted +1);
        }
    }

    function getUserTotal () {
        const total = cartItems.reduce(function(sum, num) {
            return sum + Number(num.total);
            }, 0)
        return total.toFixed(2)
    }

    const grandTotalWithUser = getUserTotal();

    //functions to create and modify cart if users is a guest or the logged in user has items saved locally. 
    

    function getTotal () {
        LocalStorageToDisplay  = getCurrentCartFromLocalStorage();
        if(LocalStorageToDisplay && LocalStorageToDisplay.length > 0 ) {

            const total = LocalStorageToDisplay.map(function(num) {
                return num.quantity * num.price;
                })
            const totalTotal = total.reduce(function(sum, num){
                return sum + num;
            }, 0)
            return totalTotal.toFixed(2);
        } else {
            return 0
        }
    }

    const grandTotal = getTotal();

    async function createNewCartItems() {
        const cartId = JSON.parse(localStorage.getItem('cartId'));
        LocalStorageToDisplay.map((cartItem) => {
            cartItem.cart_id = cartId,
            delete cartItem.image;
            delete cartItem.inventory;
            delete cartItem.price;
            delete cartItem.title;
        });
        const cartItemsCreated = await Promise.all(LocalStorageToDisplay.map(createCartItems))
        return cartItemsCreated;
    }

    const prepCheckout = async (e) => {
        e.preventDefault();
        const createdItems = await createNewCartItems();
        setCartItems(createdItems)
        window.location.href = "/checkout";
    }

     if (myToken && cartItems.length > 0) {
        return (
            <> 
                <Box sx={{ p: 2, border: '1px dashed grey', textAlign: "center" }}>
                    <Typography variant="h2"> 
                        Shopping Cart
                    </Typography>
                </Box>
                < >
                    {cartItems && cartItems.length > 0 ? 
                        < >
                            <Grid container spacing={1}>
                                {cartItems.map((item) => (
                                    <UserCartItem key={item.productId} item={item} deleteItem={deleteItem} itemDeleted={itemDeleted} setItemDeleted={setItemDeleted}/>
                                ))}
                            </Grid>
                            <div style={{display: "flex", justifyContent:"flex-end", paddingRight: "50px", paddingTop: "10px", fontFamily: "sans-serif"}}> 
                                Grand Total: {`$${grandTotalWithUser.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`} 
                            </div>
                            <br />
                            <div style={{display: "flex", justifyContent:"flex-end", paddingRight: "50px"}}>
                               <Link style={{textDecoration: "none"}} to="/checkout"> <Button style={{color: "Navy"}} disabled={cartItems.length <=0 } > Continue to Checkout </Button> </Link>
                            </div>
                        </ >
                    :
                    <p> No Cart Items Yet, checkout our jewelry selection and add to cart. </p>
                    }
                </>
            </>
        )

    } else {
        return (
            <>
                <Box sx={{ p: 2, border: '1px dashed grey', textAlign: "center" }}>
                    <Typography variant="h2"> 
                        Shopping Cart
                    </Typography>
                </Box>
                < >
                    {LocalStorageToDisplay && LocalStorageToDisplay.length > 0 ? 
                        < >
                            <Grid container spacing={1}>
                                {LocalStorageToDisplay.map((item) => (
                                    <CartItem key={item.productId} item={item}/>
                                ))}
                            </Grid>
                            <div style={{display: "flex", justifyContent:"flex-end", paddingRight: "50px", paddingTop: "10px", fontFamily: "sans-serif"}}> 
                                Grand Total: {`$${grandTotal.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`} 
                            </div>
                            <br />
                            <div style={{display: "flex", justifyContent:"flex-end", paddingRight: "50px"}}>

                                {myToken ? 
                                    <Button style={{color: "Navy"}} disabled={LocalStorageToDisplay.length <=0 } onClick={(e) => {prepCheckout(e)}} > Continue to Checkout </Button>
                                    :
                                    <Link style={{textDecoration: "none", color: "Navy"}} to="/login"> Please Login or Register to Checkout </Link>
                                }
                            </div>
                        </ >
                    :
                    <div
                        style={{
                            textAlign: "center",
                            marginTop: "25px",
                        }}
                    >
                        <h3> There are no items in your cart yet. </h3> 
                        <h3> Please checkout our <a style={{textDecoration: "none", color: "gray"}} href="/jewelry"> jewelry selection </a> to start shopping. </h3>
                    </div>
                    }
                </>
            </>
        )
    }
    
}
