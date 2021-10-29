import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {
  getSomething
} from '../api';

import {
  NotFound,
  Products,
  ProductByCategory,
  Testing,
  Login,
  Register
} from "."

export default function App() {
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

  return (
    <div className="App">
      <Router>
        <Testing
          category={category}
        />
        {/* <Navbar> </Navbar> */}
        <Switch>
          <Route exact path='/register'>
            <Register 
            setAuthenticated={setAuthenticated}
            setToken={setToken}/>
          </Route>
          <Route exact path="/login">
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

