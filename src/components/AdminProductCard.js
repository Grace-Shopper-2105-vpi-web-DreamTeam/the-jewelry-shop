import React, { useState } from "react";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { IconButton } from "@mui/material";


export default function AdminProductCard({product}) {
    const [counter, setCoutner] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [productId, setProductId] = useState(0);

    const { image, title, description, price, inventory, id} = product;

    const money = price * 1;

    const addToCart = async  (e) => {
      e.preventDefault();
      let cart = {
        productId: prodcutId,
        quantity: quantity
      };
      localStorage.setItem("cart", JSON.stringify(cart))

       
    }

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
          Price: {`$${money.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           Description: {description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           Inventory: {inventory}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Product Id: {id}
          </Typography>
        </CardContent>
        {/* <CardActions>
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
                          console.log("the id is", id)
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
                          console.log("the id is", id)
                        }
                      }>
                        <ArrowDropDownIcon />
                    </IconButton>}
                    
                </div>
          <Button 
            size="small"
            onClick={(e) => console.log("the id is", id)}
          >
            Add to Cart
          </Button>
        </CardActions> */}
      </Card>
    );
}