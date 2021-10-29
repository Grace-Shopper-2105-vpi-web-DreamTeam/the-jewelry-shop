import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {
  getSomething
} from '../api';

import { 
  NotFound,
  Products,
  ProductByCategory,
  Testing
 } from "."

export default function App() {
  const [category, setCategory] = useState('');

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
          {/* <Route> */}
            {/*<Register />*/}
          {/* </Route>
          <Route> */}
            {/*<Login />*/}
          {/* </Route>
          <Route> */}
           {/* <UserProfile />*/}
          {/* </Route>
          <Route> */}
            {/*<AdminProfile />*/}
          {/* </Route> */}
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

