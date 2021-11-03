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
  Checkout
} from "."


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
  }, [token])

  return (
    <div className="App">
      <Router>
        <Navbar
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
          setToken={setToken}
          admin={admin}
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
            />
          </Route>
          <Route exact path="/checkout">
            <Checkout
              cartItems={cartItems}
            />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

