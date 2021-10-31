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

  return <button className="btn-primary" onClick={handleClick}>Logout</button>
   


}

export default Logout;