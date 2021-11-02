import React from 'react';
import {
  useHistory
} from "react-router-dom"

const Logout = ({ setAuthenticated, setToken }) => {
  let history = useHistory();

  const handleClick = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setAuthenticated(false);
    setToken("")
    history.push("/Login");
  }

  return <a onClick={handleClick}>Logout</a>
   


}

export default Logout;