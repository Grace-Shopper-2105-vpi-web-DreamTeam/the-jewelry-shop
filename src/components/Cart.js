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

    console.log("the cart", cart)

    //functions to create and modify cart if logged in user has cart items saved to database
    
    useEffect(() => {
        const getResult = async () => {
            if (userDetails) {
                const userId = userDetails.user.id
                const results = await getCart(userId, myToken)
                if (results) {
                const items = results.cart.cartItems
                setCartItems(items)
                }
            }
             
        }
        getResult();
    }, [itemDeleted]);

    async function deleteItem(id) {
        const result = await deleteCartItem(id);
        if(result) {
            console.log(result)
            setItemDeleted(itemDeleted +1);
        }
    }

       console.log("cartItems", cartItems)

    function getUserTotal () {
        const total = cartItems.reduce(function(sum, num) {
            return sum + Number(num.total);
            }, 0)
            console.log(total)
        return total.toFixed(2)
    }

    const grandTotalWithUser = getUserTotal();


    //functions to create and modify cart if users is a guest or the logged in user has items saved locally. 
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

    console.log("before prep", LocalStorageToDisplay)

    const prepCheckout = async (e) => {
        e.preventDefault();
        if (items) {

        }
        const cartId = JSON.parse(localStorage.getItem('cartId'));
        LocalStorageToDisplay.map((cartItem) => {
            cartItem.cart_id = cartId,
            delete cartItem.image;
            delete cartItem.inventory;
            delete cartItem.price;
            delete cartItem.title;
        });
        console.log("cart items to create", LocalStorageToDisplay)
        const cartItemsCreated = await Promise.all(LocalStorageToDisplay.map(createCartItems))
        console.log("cart Items are", cartItemsCreated)
        setCartItems(cartItemsCreated)
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
                            <div style={{display: "flex", justifyContent:"flex-end", paddingRight: "50px", paddingTop: "10px"}}> 
                                Grand Total: {`$${grandTotalWithUser.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`} 
                            </div>
                            <br />
                            <div style={{display: "flex", justifyContent:"flex-end", paddingRight: "50px"}}>
                               <Link to="/checkout"> <Button disabled={cartItems.length <=0 } > Continue to Checkout </Button> </Link>
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
                            <div style={{display: "flex", justifyContent:"flex-end", paddingRight: "50px", paddingTop: "10px"}}> 
                                Grand Total: {`$${grandTotal.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`} 
                            </div>
                            <br />
                            <div style={{display: "flex", justifyContent:"flex-end", paddingRight: "50px"}}>

                                {myToken ? 
                                    <Button disabled={LocalStorageToDisplay.length <=0 } onClick={(e) => {prepCheckout(e)}} > Continue to Checkout </Button>
                                    :
                                    <Link to="/login"> Please Login or Register to Checkout </Link>
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
    
}
