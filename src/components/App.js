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
  AdminEditProduct
} from "."

import {
  getUserOrders,
  getAllProducts
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
  }, [token])


  // useEffect(() => {
  //   getSomething()
  //     .then(response => {
  //       setMessage(response.message);
  //     })
  //     .catch(error => {
  //       setMessage(error.message);
  //     });
  // });

  return (
    <div className="App">
      <Router>
        <Navbar
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
          setToken={setToken}
          userInfo={userInfo}
        />
    {/* <Testing
      category={category}
    /> */}

        <Switch>
          <Route exact path="/register" component={Register}>
            <Register
              setAuthenticated={setAuthenticated}
              setToken={setToken} />
          </Route>
          <Route exact path="/login" component={Login}>
            <Login
              setAuthenticated={setAuthenticated}
              setToken={setToken}
              setUserInfo={setUserInfo}
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
          {/* </Route>
          <Route> */}
          {/*<Cart />*/}
          {/* </Route> */}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

