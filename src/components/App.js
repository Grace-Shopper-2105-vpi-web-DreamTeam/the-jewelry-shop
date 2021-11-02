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
  Logout
} from "."

export default function App() {
  const [category, setCategory] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [admin, setAdmin]=useState(false)

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
        setAuthenticated= {setAuthenticated}
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

