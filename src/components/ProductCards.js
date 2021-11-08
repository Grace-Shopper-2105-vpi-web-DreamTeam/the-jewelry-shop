import React, { useState } from "react";

import { createCartItems } from '../api';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { IconButton } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ProductCard({product, setCart}) {
    const [counter, setCoutner] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [open, setOpen] = useState(false);
  
    const cartId = localStorage.getItem('cartId');
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const token = localStorage.getItem('token');

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    const { image, title, description, price, inventory, id} = product;

    const money = price * 1;

    const reset = () => {
      setCoutner(0);
      setQuantity(0); 
    }

    const addToCart = async (e, productId, title, price, image, inventory, quantity) => {
      e.preventDefault();
      
      if (token && !cartId || cartId === undefined) {
          const myUserId = userDetails.user.id;
          setCart(myUserId, token);
          const cart_id = Number(cartId);
          const newItem = await createCartItems({productId, quantity, cart_id});
          if (newItem.id) {
            handleClick();
          }
          
          reset();
      }
      if (token && cartId) {
        const cart_id = Number(cartId);
        const newItem = await createCartItems({productId, quantity, cart_id});
          if (newItem.id) {
            handleClick();
          }
        reset();
      } else {
        let cartObj = JSON.parse(localStorage.getItem('cart')) || []
          if(!cartObj) {
            cartObj[productId] = {
                productId: productId,
                title: title,
                price: price,
                image: image,
                inventory: inventory,
                quantity: quantity
            };
            localStorage.setItem("cart", JSON.stringify(cart));
            handleClick();
            reset();
          } else {
            let newItems = {
              productId: productId,
              title: title,
              price: price,
              image: image,
              inventory: inventory,
              quantity: quantity
            };
            cartObj[productId] = newItems;
            localStorage.setItem("cart", JSON.stringify(cartObj));
            handleClick();
            reset();
          } 
      }  
    };
    
    return (
        <Card varient="outlined" sx={{minHeight: 360}} >
        <CardMedia
          component="img"
          height="300"
          image={image}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`$${money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
            {<Button disabled >{counter}</Button>}
                <div 
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column"
                    }}
                >   
                    {<IconButton 
                      size="small" 
                      disabled={counter >= inventory || counter >= 10} 
                      onClick={
                        ()=> {
                          setCoutner(counter+1)
                          setQuantity(counter+1)
                        }
                      } >
                        <ArrowDropUpIcon />
                    </IconButton>}
                    {<IconButton 
                      size="small" 
                      disabled={counter <= 0} 
                      onClick={
                        () => {
                          setCoutner(counter - 1)
                          setQuantity(counter-1)
                        }
                      }>
                        <ArrowDropDownIcon />
                    </IconButton>}
                    
                </div>
          {inventory === 0 ?
          <Button disabled >Sold Out</Button>
          :
          <>
          <Button 
            disabled={counter <= 0}
            size="small"
            onClick={(e) => addToCart(e, id, title, price, image, inventory, quantity)}
          >
            
            Add to Cart
          </Button>
          
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Item added to cart
              </Alert>
          </Snackbar>
          </>}
        </CardActions>
      </Card>
    );
}