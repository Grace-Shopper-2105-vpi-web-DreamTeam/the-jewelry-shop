import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../style.css"

import {
  useHistory
} from "react-router-dom"

import { 
  NotFound,
  Products,
  ProductByCategory,
  Testing,
  Login,
  Register,
  Header
} from "."

export default function App(props) {
  let history = useHistory();
  const [category, setCategory] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState('');

  // useEffect(() => {
  //   getSomething()
  //     .then(response => {
  //       setMessage(response.message);
  //     })
  //     .catch(error => {
  //       setMessage(error.message);
  //     });
  // });
  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setAuthenticated(false);
    setToken("")
  }

  return (
    <div className="App">
      
      <Router>
      <Header
      handleLogout = {handleLogout}
      authenticated = {authenticated}/>
        {/* <Testing
          category={category}
        /> */}
        <Switch>
          <Route exact path="/register" component={Register}>
            <Register 
            setAuthenticated={setAuthenticated}
            setToken={setToken}/>
          </Route>
          <Route exact path="/login" component={Login}>
            <Login
              setAuthenticated={setAuthenticated}
              setToken={setToken}
            />
          </Route>
          {/* <Route>
           <UserProfile />
          </Route> */}
          {/* <Route>
            <AdminProfile />
          </Route> */}
           <Route exact path="/" component={Products}>
            <Products
              category={category}
              setCategory={setCategory}
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

