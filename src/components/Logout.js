import React from 'react';
import {
  useHistory
} from "react-router-dom"

const Logout = ({ setAuthenticated, setToken, setUserInfo }) => {
  let history = useHistory();

  const handleClick = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('userDetails');
    localStorage.removeItem('cartId');
    localStorage.removeItem('cart');
    setAuthenticated(false);
    setToken("");
    // setUserInfo({});
    history.push("/Login");
  }

  return <a onClick={handleClick}>Logout</a>
   


}

export default Logout;