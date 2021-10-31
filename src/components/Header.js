import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import ButtonAppBarCollapse from "./ButtonAppBarCollapse";

import Link from '@mui/material/Link';

import {
    Redirect,
    useHistory
} from "react-router-dom"

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function PrimarySearchAppBar({ handleLogout, authenticated }) {
    let history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [redirect, setRedirect] = React.useState(false);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const headerLogout = () => {
        handleLogout();
        setRedirect(true);
    }

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <ButtonAppBarCollapse>
            <MenuItem
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'block', sm: 'block' } }}
            >
                <Link style={{ textDecoration: "none", color: 'black' }} href="/login"> Login/Register</Link>
            </MenuItem>
            <MenuItem
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'block', sm: 'block' } }}
            >
                <Link style={{ textDecoration: "none", color: 'black' }} href="#"> My Account</Link>
            </MenuItem>
            <MenuItem
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'block', sm: 'block' } }}
            >
                <Link style={{ textDecoration: "none", color: 'black' }} href="#"> Admin</Link>
            </MenuItem>
            <MenuItem
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'block', sm: 'block' } }}
            >
                <p onClick={headerLogout} style={{ textDecoration: "none", color: 'black' }} > Logout</p>
            </MenuItem>
            <IconButton
                size="large"
                aria-label=""
                color="inherit"
            >
                <Badge >
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
            </ButtonAppBarCollapse>

        </Menu>
    );


    if (redirect) {
        history.push("/login")
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static"
                style={{ backgroundColor: "#f4eCe8", color: "black" }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <img src="https://thejewelryshop.s3.us-east-2.amazonaws.com/Logo/Loops%26Strings+No+background+(100+x+50+px).png" />
                    </IconButton>

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: { md: 'center' } }}>
                        {!authenticated ? (
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ display: { xs: 'none', sm: 'block' } }}
                            >
                                <Link style={{ textDecoration: "none", color: 'black', marginRight: '15px' }} href="/login"> Login/Register</Link>
                            </Typography>

                        ) : (
                            <>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    sx={{ display: { xs: 'none', sm: 'block' } }}
                                >
                                    <Link style={{ textDecoration: "none", color: 'black', marginRight: '15px' }} href="#"> My Account</Link>
                                </Typography>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    sx={{ display: { xs: 'none', sm: 'block' } }}
                                >
                                    <Link style={{ textDecoration: "none", color: 'black', marginRight: '15px' }} href="#"> Admin</Link>
                                </Typography>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    sx={{ display: { xs: 'none', sm: 'block' } }}
                                >
                                    <p onClick={headerLogout} style={{ textDecoration: "none", color: 'black', marginRight: '15px', cursor: "pointer" }} > Logout</p>
                                </Typography>
                            </>
                        )}


                        <IconButton
                            size="large"
                            aria-label=""
                            color="inherit"
                        >
                            <Badge >
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}