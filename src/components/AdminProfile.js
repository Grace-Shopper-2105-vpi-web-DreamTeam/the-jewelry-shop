import React, { useState, useEffect } from 'react'
import {
    useHistory
} from "react-router-dom"
import {
    getAllUsers,
    getAllOrders,
    getAllProducts,
    updateUserAdmin
} from "../api"
import {
    AdminUsers,
    AdminOrders,
    AdminProducts
} from "."

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

const images = [
    {
        url: 'https://thejewelryshop.s3.us-east-2.amazonaws.com/Icons/shoppers2.png',
        title: 'USERS',
        id: 'users',
        width: '30%',
    },
    {
        url: '',
        title: 'PRODUCTS',
        id: 'products',
        width: '40%',
    },
    {
        url: 'https://thejewelryshop.s3.us-east-2.amazonaws.com/Icons/cartIcon.png',
        title: 'ORDERS',
        id: 'orders',
        width: '30%',
    },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            border: '4px solid currentColor',
        },
    },
}));

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));

const AdminProfile = ({ userInfo }) => {
    let history = useHistory();
    const [allUsers, setAllUsers] = useState([])
    const [allOrders, setAllOrders] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [showSection, setShowSection] = useState({ users: false, orders: false, products: false })

    useEffect(() => {
        const getAllData = async () => {
            try {
                const users = await getAllUsers(JSON.parse(localStorage.getItem('userDetails')))
                console.log("AllUsers", users)
                setAllUsers(users)
                const orders = await getAllOrders(JSON.parse(localStorage.getItem('userDetails')))
                console.log("AllOrders", orders)
                setAllOrders(orders)
                const products = await getAllProducts()
                setAllProducts(products)
            } catch (error) {
                console.log(error)
            }
        }
        getAllData();
    }, [])

    const toggleAdminStatus = async (userId) => {
        const response = await updateUserAdmin(userId, JSON.parse(localStorage.getItem('userDetails')))
        if (response) {
            const users = await getAllUsers(JSON.parse(localStorage.getItem('userDetails')))
            console.log("AllUsers", users)
            setAllUsers(users)
        }
    }

    return (
        <div>
            <Box sx={{ p: 2, border: '1px white', textAlign: "center" }}>
                <Typography variant="h4">
                    Welcome to the Admin DashBoard
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
                {images.map((image) => (
                    <ImageButton
                        focusRipple
                        key={image.title}
                        onClick={(e) => {
                            const type = image.id
                            console.log("type", type)
                            if (type === 'orders') {
                                setShowSection({ ...showSection, orders: true, users: false, products: false })
                            } else if (type === 'users') {
                                setShowSection({ ...showSection, orders: false, users: true, products: false })
                            } else {
                                setShowSection({ ...showSection, orders: false, users: false, products: true })
                            }
                        }
                        }
                        style={{
                            width: image.width,
                        }}
                    >
                        <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                        <ImageBackdrop className="MuiImageBackdrop-root" />
                        <Image>
                            <Typography
                                component="span"
                                variant="subtitle1"
                                color="inherit"
                                sx={{
                                    position: 'relative',
                                    p: 4,
                                    pt: 2,
                                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                }}
                            >
                                {image.title}
                                <ImageMarked className="MuiImageMarked-root" />
                            </Typography>
                        </Image>
                    </ImageButton>
                ))}
            </Box>
            {showSection.users && <AdminUsers
                allUsers={allUsers}
                toggleAdminStatus={toggleAdminStatus} />}
            {showSection.orders && <AdminOrders
                allOrders={allOrders}
            />}
            {showSection.products && <AdminProducts
                 allProducts={allProducts}
                 setAllProducts={setAllProducts}
            />}

        </div>

    )
}

export default AdminProfile;