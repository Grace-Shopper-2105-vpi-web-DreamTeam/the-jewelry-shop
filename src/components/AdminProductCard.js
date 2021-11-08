import React, { useState } from "react";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';

import {
   deleteProduct,
   getAllProducts
} from "../api"

import {
    useHistory,
} from "react-router-dom"



export default function AdminProductCard({ product, setAllProducts, setProductEdit }) {
    const { image, title, description, price, inventory, id, category, isActive } = product;

    const money = price * 1;

    const history = useHistory();

    const adminDeleteProduct = async (productId) => {
        const response = await deleteProduct(productId, JSON.parse(localStorage.getItem('userDetails')))
        if (response) {
            const products = await getAllProducts(JSON.parse(localStorage.getItem('userDetails')))
            setAllProducts(products)
        }
    }
    return (
        <Card varient="outlined" sx={{ minHeight: 360 }} >
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
                    Product Id: {id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Price: {`$${money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Description: {description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Inventory: {inventory}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Category: {category}
                </Typography>
                { !product.isActive ? <Typography variant="body2" color="text.secondary">
                   <b style={{color:'red'}}> Product is InActive. Please Edit to Make Active.</b>
                </Typography> : null}
            </CardContent>
            <CardActions>
                <Stack direction="row" spacing={2}>
                    <Button onClick={() => history.push(`/editproduct/${product.id}`)}variant="contained" startIcon={<EditIcon />}>
                        Edit
                    </Button>
                    <Button onClick={() => {adminDeleteProduct(product.id)}} variant="contained" startIcon={<DeleteIcon />}>
                        Delete
                    </Button>
                </Stack>
            </CardActions>
        </Card>
    );
}