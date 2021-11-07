import React, { useState } from "react";
import {
    useHistory
} from "react-router-dom"
import {
    getAllProducts,
    createNewProduct
} from "../api"

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const theme = createTheme();

const NewProduct = ({ setAllProducts }) => {
    const [title, setTitle] = useState("");
    const [description, setDescripton] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [inventory, setInventory] = useState("");
    const [image, setImage] = useState("");
    const [isActive, setIsActive] = useState(true)
    let history = useHistory();
    const [formSubmittedSuccessfully, setFormSubmittedSuccessfully] = useState(false);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await createNewProduct(title, description, category, price, inventory, image, isActive, JSON.parse(localStorage.getItem('userDetails')))
        if (response) {
            const products = await getAllProducts(JSON.parse(localStorage.getItem('userDetails')))
            setAllProducts(products)
            setTitle("");
            setDescripton("");
            setCategory("");
            setPrice("");
            setInventory("");
            setImage("");
            setIsActive(true);
            setFormSubmittedSuccessfully(true);
        }
    }
    if (formSubmittedSuccessfully) {
        history.push("/admin")
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://thejewelryshop.s3.us-east-2.amazonaws.com/Logo/Loops%26StringsLogo3.png)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'grey' }}>
                            <AddCircleIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Add New Loops & Strings Product
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="title"
                                label="Enter the Jewelry's Title"
                                name="title"
                                autoComplete="title"
                                autoFocus
                                onChange={(event) => {
                                    setTitle(event.target.value)
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="description"
                                label="Enter the Jewelry's Description"
                                type="description"
                                id="description"
                                autoComplete="description"
                                onChange={(event) => {
                                    setDescripton(event.target.value)
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="category"
                                label="Enter the Jewelry's Category"
                                type="category"
                                id="category"
                                autoComplete="category"
                                onChange={(event) => {
                                    setCategory(event.target.value)
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="price"
                                label="Enter the Jewelry's Price"
                                type="price"
                                id="price"
                                autoComplete="price"
                                onChange={(event) => {
                                    setPrice(event.target.value)
                                }}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="inventory"
                                label="Enter the Jewelry's Inventory"
                                type="inventory"
                                id="inventory"
                                autoComplete="inventory"
                                onChange={(event) => {
                                    setInventory(event.target.value)
                                }}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="image"
                                label="Enter the Jewelry's Image"
                                type="anything"
                                id="image"
                                autoComplete="image"
                                onChange={(event) => {
                                    setImage(event.target.value)
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );

}

export default NewProduct;

 // <div className="card">
        //     <form onSubmit={handleSubmit}>
        //         <h1 className="form-title">Add A New Product</h1>
        //         <div className="form-fields">
        //             <label for="title"><b>Title</b></label>
        //             <input
        //                 type="text" required
        //                 name="title"
        //                 placeholder="Enter Your Title"
        //                 value={title}
        //                 onChange=
        //                 {(event) => setTitle(event.target.value)}></input>
        //             <label for="description"><b>Description</b></label>
        //             <input
        //                 type="text" required
        //                 name="description"
        //                 placeholder="Enter Your Description"
        //                 value={description}
        //                 onChange=
        //                 {(event) => setDescripton(event.target.value)}></input>
        //                 <label for="category"><b>Category</b></label>
        //             <input
        //                 type="text" required
        //                 name="category"
        //                 placeholder="Enter Your Category"
        //                 value={category}
        //                 onChange=
        //                 {(event) => setCategory(event.target.value)}></input>
        //             <label for="price"><b>Price (Do not include dollar sign)</b></label>
        //             <input
        //                 type="text" required
        //                 name="price"
        //                 placeholder="Enter Your Price"
        //                 value={price}
        //                 onChange=
        //                 {(event) => setPrice(event.target.value)}></input>
        //             <label for="inventory"><b>Inventory</b></label>
        //             <input
        //                 type="text" required
        //                 name="inventory"
        //                 placeholder="Enter the Inventory"
        //                 value={inventory}
        //                 onChange=
        //                 {(event) => setInventory(event.target.value)}></input>
        //             <label for="image"><b>Image Link</b></label>
        //             <input
        //                 type="text" required
        //                 name="image"
        //                 placeholder="Enter An Image Link"
        //                 value={image}
        //                 onChange=
        //                 {(event) => setImage(event.target.value)}></input>
        //         </div>
        //         <label>Would You Like This Product To Be Active?</label>
        //         <input
        //             type="checkbox"
        //             value={isActive} onChange={(event) => setIsActive(event.target.checked)}></input>

        //         <button className="btn-form" type="submit" >Submit</button>
        //     </form>
        // </div>