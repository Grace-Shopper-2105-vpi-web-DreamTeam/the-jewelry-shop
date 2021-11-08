import React, { useState} from "react";

import { updateCartItems } from "../api";

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Grid } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export default function UserCartItem({item, deleteItem}) {
    const { cart_item_id, title, image, price, inventory, total } = item;

    function getQuantity() {
        const rawNum = total / price;
        return Math.floor(rawNum);
    }

    const quantity = getQuantity();

    const [cartQuantity, setCartQuantity] = useState(quantity);
    const [cartCounter, setCartCounter] = useState(quantity);

    let money = price * 1

    let totalPrice = total * 1

    const updateCartItem = async (quantity, cartItemId) => {
        await updateCartItems(quantity, cartItemId);
        window.location.href = "/cart";
    };

    return (
        <Box style={{marginLeft: "50px", marginTop: "25px", textAlign: 'center', fontFamily: "sans-serif"}}>
            <Divider style={{width: "90vw"}}/>     
                <Grid container spacing={2} style={{ paddingTop: "10px", paddingBottom: "10px"}} >
                    <Grid item>
                        <img style={{height: "200px"}} src={image} alt={title} />
                    </Grid> 
                    <Grid item>
                        <h3>{title}</h3> 
                    </Grid> 
                    <Grid item xs={12} sm container justify="center" alignItems="space-between">
                        <Grid item sx container direction="column" spacing={2} >
                            <Grid item > 
                                <p>Price: </p> 
                                <br />
                                <br />
                                <br />
                                <br />
                                <p>{`$${money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm container >
                        <Grid item sx container  >
                            <Grid item xs> 
                            <p>Quantity: </p>
                            <br />
                            </Grid>
                            <Grid item sx={12} container >
                                <Grid item xs>
                                    <IconButton
                                        size="small"
                                        disabled={cartCounter >= inventory || cartCounter >= 10} 
                                        onClick={
                                            () => {
                                                setCartCounter(cartCounter+1);
                                                setCartQuantity(cartCounter+1);
                                                updateCartItem((cartQuantity+1), cart_item_id);
                                            }}
                                    >
                                        <ArrowDropUpIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Grid item sx={12} container direction="row" >
                                <Grid item xs>
                                    <p>{cartQuantity}</p>
                                </Grid>
                            </Grid>
                            <Grid item sx={12} container direction="row" >
                                <Grid item xs>
                                    <IconButton
                                        size="xs"
                                        disabled={cartCounter <= 1} 
                                        onClick={
                                            () => {
                                                setCartCounter(cartCounter-1);
                                                setCartQuantity(cartCounter-1);
                                                updateCartItem((cartQuantity-1), cart_item_id);
                                            }}
                                    >
                                        <ArrowDropDownIcon />
                                    </IconButton> 
                                </Grid> 
                            </Grid>
                            <Grid item xs> 
                                <IconButton onClick={() => {deleteItem(cart_item_id)}} >
                                    <DeleteIcon fontSize="small"/>
                                </ IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm container >
                        <Grid item sx container direction="column" spacing={2} >
                            <Grid item xs> 
                            <p>Total: </p> 
                                <br />
                                <br />
                                <br />
                                <br />
                            <p>{`$${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</p>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            <Divider style={{width: "90vw"}}/> 
        </Box>
    );
}