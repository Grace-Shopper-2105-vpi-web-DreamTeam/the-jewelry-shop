import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {
  NotFound,
  Products,
  ProductByCategory,
  Testing,
  Login,
  Register,
  Navbar,
  Logout,
  UserProfile,
  Cart, 
  Checkout, 
  OrderPlaced
} from "."

import { getCart, createCart } from "../api"

// import {
//   getUserOrders
// } from "../api"

export default function App() {
  const [category, setCategory] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [admin, setAdmin] = useState(false)
  const [userInfo, setUserInfo] = useState({});//userInfo.user.id
  const [userOrders, setUserOrders] = useState([]);
  const [userCart, setUserCart] = useState([]);
  const [cartItems, setCartItems] = useState([])
  const cart = JSON.parse(localStorage.getItem('cart'));

  console.log("userCart", userCart)
  useEffect(() => {
    const localStorageToken = localStorage.getItem('token')
    if (localStorageToken) {
      setToken(localStorageToken)
      setAuthenticated(true)
      setUserInfo(JSON.parse(localStorage.getItem('userDetails')))
      //setAdmin(userInfo.user.isAdmin)

      // const fetchUserInfo = async () => {
      //   const response = await getUserOrders(JSON.parse(localStorage.getItem('userDetails')))
      //   if (response) {
      //     console.log("UserOrders", response)
      //     setUserOrders(response)
      //   }
      // }
      // fetchUserInfo();
    } else {
      setUserOrders([])
    }
  }, [token]);

  const setCart = async (userId, token) => {
    try {
        const getExistingCart = await getCart(userId, token);

        if(getExistingCart) {
            const cartId = getExistingCart.cart.id;
            console.log("existing cart", cartId)
            localStorage.setItem("cartId", cartId);
        } else { 
            const createUserCart = await createCart(userId, token);
            const cartId = createUserCart.cart.id;
            console.log("new cart", cartId)
            localStorage.setItem("cartId", cartId);
        }
    } catch (error) {
        console.error(error)
    }
}  

  return (
    <div className="App">
      <Router>
        <Navbar
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
          setToken={setToken}
          admin={admin}
          setCart={setCart}
        />
        <Testing
          category={category}
        />

        <Switch>
          <Route exact path="/register" component={Register}>
            <Register
              setAuthenticated={setAuthenticated}
              setToken={setToken}
              setUserCart={setUserCart} 
              cart={cart}
              />
          </Route>
          <Route exact path="/login" component={Login}>
            <Login
              setAuthenticated={setAuthenticated}
              setToken={setToken}
              setUserInfo={setUserInfo}
              setUserCart={setUserCart}
              setCart={setCart}
              cart={cart}
            />
          </Route>
          <Route exact path="/account" component={UserProfile}>
            <UserProfile
              userOrders={userOrders}
              userInfo={userInfo}
            />
          </Route>
          {/* <Route>
            <AdminProfile />
          </Route> */}
          <Route exact path="/jewelry" component={Products}>
            <Products
              category={category}
              setCategory={setCategory}
              setUserCart={setUserCart}
            />
          </Route>
          <Route path="/jewelry/:category" component={ProductByCategory}>
            <ProductByCategory
              category={category}
              setCategory={setCategory}
            />
          </Route>
          {/* <Route> */}
          {/*<Orders />*/}
          {/* </Route> */}
           <Route exact path="/cart">
            <Cart 
              setCartItems={setCartItems}
              cartItems={cartItems}
            />
          </Route>
          <Route exact path="/checkout">
            <Checkout
              setCartItems={setCartItems}
              cartItems={cartItems}
            />
          </Route>
          <Route exact path="/ordersuccess">
            <OrderPlaced />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

