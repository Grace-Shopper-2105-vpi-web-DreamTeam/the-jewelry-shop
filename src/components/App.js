import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {
  getSomething
} from '../api';

import { 
  NotFound,
  Products
 } from "."

export default function App() {
  // const [message, setMessage] = useState('');

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
      <Products />
      {/* <h1>Hello, World!</h1> */}
      {/* //</div>h2>{ message }</h2> */}
    
    <Router>
        {/* <Navbar> </Navbar> */}
        <Switch>
          <Route>
            {/*<Register />*/}
          </Route>
          <Route>
            {/*<Login />*/}
          </Route>
          <Route>
           {/* <UserProfile />*/}
          </Route>
          <Route>
            {/*<AdminProfile />*/}
          </Route>
          <Route path="/products">
            <Products />
          </Route>
          <Route>
            {/*<ProductsByCategory />*/}
          </Route>
          <Route>
            {/*<Orders />*/}
          </Route>
          <Route>
            {/*<Cart />*/}
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
    </Router>
    </div>
  );
}

