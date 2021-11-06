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
  AdminProfile,
  NewProduct,
  AdminEditProduct,
  Cart, 
  Checkout, 
  OrderPlaced, 
  HomePage
} from "."

import {
  getUserOrders,
  getAllProducts,
  getCart, 
  createCart 
} from "../api"

export default function App() {
  const [category, setCategory] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [admin, setAdmin] = useState(false)
  const [userInfo, setUserInfo] = useState({});//userInfo.user.id
  const [userOrders, setUserOrders] = useState([]);
  const [productEdit, setProductEdit] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState([])
  const cart = JSON.parse(localStorage.getItem('cart'));

  useEffect(() => {
    const getResult = async () => {
         const results = await getAllProducts()
         setAllProducts(results)
    }
    getResult();
}, []);

  useEffect(() => {
    const localStorageToken = localStorage.getItem('token')
    if (localStorageToken) {
      setToken(localStorageToken)
      setAuthenticated(true)
      setUserInfo(JSON.parse(localStorage.getItem('userDetails')))
      console.log("UserInfo!!!!!!!!!",userInfo)
//       setAdmin(userInfo.user.isAdmin)
// console.log("ISADMIN",admin)

      const fetchUserInfo = async () => {
        const response = await getUserOrders(JSON.parse(localStorage.getItem('userDetails')))
        if (response) {
          console.log("UserOrders", response)
          setUserOrders(response)
        }
      }
      fetchUserInfo();
    } 
  }, [token]);

  const setCart = async (userId, token) => {
    try {
        const getExistingCart = await getCart(userId, token);

        if(!getExistingCart.message) {
            const cartId = getExistingCart.cart.id;
            localStorage.setItem("cartId", cartId);
        } else { 
            const createUserCart = await createCart(userId, token);
            const cartId = createUserCart.cart.id;
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
          userInfo={userInfo} 
          setCart={setCart}
        />
    {/* <Testing
      category={category}
    /> */}
        <Switch>
          <Route exact path="/register" component={Register}>
            <Register
              setAuthenticated={setAuthenticated}
              setToken={setToken}
              cart={cart}
              />
          </Route>
          <Route exact path="/login" component={Login}>
            <Login
              setAuthenticated={setAuthenticated}
              setToken={setToken}
              setUserInfo={setUserInfo}
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
          <Route exact path = "/admin">
            <AdminProfile 
            userInfo={userInfo}
            />
          </Route>
          <Route exact path="/newproduct">
            <NewProduct
             setAllProducts={setAllProducts}
              />
            </Route>
            <Route exact path="/editproduct/:id">
            <AdminEditProduct
             setAllProducts={setAllProducts}
             allProducts={allProducts}
              />
            </Route>
          <Route exact path="/jewelry" component={Products}>
            <Products
              category={category}
              setCategory={setCategory}
              setCart={setCart}
            />
          </Route>
          <Route path="/jewelry/:category" component={ProductByCategory}>
            <ProductByCategory
              category={category}
              setCategory={setCategory}
              setCart={setCart}
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
          <Route exact path="/">
            <HomePage 
              allProducts={allProducts}  
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

