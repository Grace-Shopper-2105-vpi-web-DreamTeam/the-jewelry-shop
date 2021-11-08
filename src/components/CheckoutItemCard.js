import React from "react";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Grid } from "@mui/material";

export default function CheckoutItemCard({item}) {

    const { title, price, total } = item;

    function getQuantity() {
        const rawNum = total / price;
        return Math.floor(rawNum);
    }

    const quantity = getQuantity()

    let money = price * 1

    let totalPrice = total * 1

    return (
        <Box style={{marginLeft: "50px", marginTop: "25px", textAlign: 'center'}}>
            <Divider style={{width: "90vw"}}/>     
                <Grid container spacing={2} style={{ paddingTop: "10px", paddingBottom: "10px", fontFamily: "sans-serif"}} >
                    <Grid item>
                        <h3>{title}</h3> 
                    </Grid> 
                    <Grid item xs={12} sm container justify="center" alignItems="space-between">
                        <Grid item sx container direction="column" spacing={2} >
                            <Grid item > 
                                <p>Price: </p> 
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
                            <br />
                            <p>{quantity}</p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm container >
                        <Grid item sx container direction="column" spacing={2} >
                            <Grid item xs> 
                            <p>Total: </p> 
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