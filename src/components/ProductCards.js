import React, { useState } from "react";

import { createCart, getCart, createCartItems } from '../api';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { IconButton } from "@mui/material";


export default function ProductCard({product, setUserCart}) {
    const [counter, setCoutner] = useState(0);
    const [quantity, setQuantity] = useState(0);
  
    const cartId = localStorage.getItem('cartId');
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const token = localStorage.getItem('token');

    

    const { image, title, description, price, inventory, id} = product;

    const money = price * 1;

    const reset = () => {
      setCoutner(0);
      setQuantity(0); 
    }

    const setCart = async (userId, token) => {
      try {
          const getExistingCart = await getCart(userId, token);

          const createUserCart = await createCart(userId, token);

          if(getExistingCart && !createUserCart.id) {
              const cartId = getExistingCart.cart.id;
              console.log(cartId)
              localStorage.setItem("cartId", cartId);
              console.log("cart exists", getExistingCart)
          } else {
              const cartId = createUserCart.cart.id;
              console.log(cardId)
              localStorage.setItem("cartId", cartId);
              console.log("cart created", createUserCart)
          }
      } catch (error) {
          console.error(error)
      }
  }

    const addToCart = async (e, productId, title, price, image, inventory, quantity) => {
      e.preventDefault();
      
      if (token && !cartId || cartId === undefined) {
          const myUserId = userDetails.user.id;
          setCart(myUserId, token);
          const cart_id = Number(cartId);
          await createCartItems({productId, quantity, cart_id});
          reset();
      }
      if (token && cartId) {
        const cart_id = Number(cartId);
        await createCartItems({productId, quantity, cart_id});
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
            {`$${money.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`}
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
          <Button 
            disabled={counter <= 0}
            size="small"
            onClick={(e) => addToCart(e, id, title, price, image, inventory, quantity)}
          >
            Add to Cart
          </Button>}
        </CardActions>
      </Card>
    );
}