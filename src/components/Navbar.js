import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from '@mui/material/Link';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { withRouter, useHistory } from 'react-router-dom';
import {
    Logout
} from "."

const useStyles = makeStyles(theme => ({
    
    menuButton: {
        marginRight: theme.spacing(2)
    },
    
  
    
}));

const Navbar = ({ authenticated, setAuthenticated, setToken, admin }) => {
    let history = useHistory();
    // const {history} = props;
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));



    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClick = (pageURL) => {
        history.push(pageURL)
        setAnchorEl(null);
    };
    const handleAccountClick = () => {
        history.push("/account")
    };
    const handleCartClick = () => {
        history.push("/cart")
    };
    const handleLogoClick = () => {
        history.push("/")
    };



    // const handleLogout = () => {
    // <Logout
    // setAuthenticated={setAuthenticated}
    // setToken ={setToken}/>
    // }




    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static"
                style={{ backgroundColor: "#545454", color: "#f4eCe8" }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleMenu}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >
                        <MenuItem onClick={() => handleMenuClick('/')}>Home</MenuItem>
                        {!authenticated?(
                        <MenuItem onClick={() => handleMenuClick('/login')}>Login/Register</MenuItem>): null}
                        {admin ? (
                        <MenuItem onClick={() => handleMenuClick('/admin')}>Admin</MenuItem>): null}
                        {authenticated ? (
                        <MenuItem >
                            <Logout
                                setAuthenticated={setAuthenticated}
                                setToken={setToken} />
                        </MenuItem>) : null
                    }
                        
                    </Menu>
                  {isMobile ? (    <Typography  variant="h6" component="div" sx={{ flexGrow: 1}} >
                        <img src="https://thejewelryshop.s3.us-east-2.amazonaws.com/Logo/Loops%26Strings+No+background+Pink+(100+x+50+px)+(1).png" onClick={handleLogoClick} />
                    </Typography>
                    ):(
                    <Typography  variant="h6" component="div" sx={{ flexGrow: 1}} >
                        <img src="https://thejewelryshop.s3.us-east-2.amazonaws.com/Logo/Loops%26Strings+No+background+Pink+(200+x+100+px)+.png" onClick={handleLogoClick} />
                    </Typography>)}
                

                    {authenticated ? (
                        <div className={classes.menuButton}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <AccountCircle onClick={handleAccountClick} />
                            </IconButton>
                        </div>) : null}
                    <div className={classes.menuButton}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <ShoppingCartIcon onClick={handleCartClick} />
                        </IconButton>
                    </div>
                    {/* {authenticated ? (
                        <Typography >
                            <Logout
                                setAuthenticated={setAuthenticated}
                                setToken={setToken} />
                        </Typography>) : null
                    } */}

                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default withRouter(Navbar);