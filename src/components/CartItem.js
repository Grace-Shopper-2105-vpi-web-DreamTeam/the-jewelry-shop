import React, { useState} from "react";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Grid } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { IconButton } from "@mui/material";



export default function CartItem({item}) {

    const { productId, quantity, title, image, price, inventory } = item;

    const [cartQuantity, setCartQuantity] = useState(quantity);
    const [cartCounter, setCartCounter] = useState(quantity);

    const updateCartItem = (productId, title, price, image, inventory, quantity) => {
        console.log(quantity)
        let cartObj = JSON.parse(localStorage.getItem('cart'))
          let updateItem = {
            productId: productId,
            title: title,
            price: price,
            image: image,
            inventory: inventory,
            quantity: quantity
          };
          cartObj[productId] = updateItem;
          localStorage.setItem("cart", JSON.stringify(cartObj));
    };

    return (
        <Box style={{marginLeft: "50px", marginTop: "25px", textAlign: 'center'}}>
            <Divider />     
                <Grid container spacing={2} style={{ paddingTop: "10px"}} >
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
                                <br />
                                <p>${(price * 1)}</p>
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
                                                updateCartItem(productId, title, price, image, inventory, (cartQuantity+1));
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
                                        disabled={cartCounter <= 0} 
                                        onClick={
                                            () => {
                                                setCartCounter(cartCounter-1);
                                                setCartQuantity(cartCounter-1);
                                                updateCartItem(productId, title, price, image, inventory, (cartQuantity-1));
                                            }}
                                    >
                                        <ArrowDropDownIcon />
                                    </IconButton> 
                                </Grid> 
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
                                <br />
                            <p>${(cartQuantity * price).toFixed(2)}</p>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
        </Box>
    );
}



{/* <>
        <Box style={{margin: "50px"}}>
            <Divider />     
                <div style={{ paddingTop: "10px", display: "inline-flex", flexDirection: "row"}}>
                    <div >
                        <img style={{height: "200px"}} src={item.image} alt={item.title} />
                    </div> 
                    <h3>{item.title}</h3>   
                    <div >
                        <p>Price: ${(item.price * 1)}</p>
                    </div>
                    <div >
                        <p>Total: ${(item.quantity * item.price).toFixed(2)}</p>
                    </div>
                    <div >
                        <p>Quantity: </p>
                        <Button
                            size="small"
                            disableElevation
                            variant="contained"
                            style={{alignContent: "column"}}
                            //onClick={() => removeFromCart(item.id)}
                        >
                            -
                        </Button>
                        <p>{item.quantity}</p>
                        <Button
                            size="small"
                            disableElevation
                            variant="contained"
                            //onClick={() => addToCart(item)}
                        >
                            +
                        </Button>                       
                    </div>    
                </div>
        </Box>
        <br />
        </>
    );
} */}