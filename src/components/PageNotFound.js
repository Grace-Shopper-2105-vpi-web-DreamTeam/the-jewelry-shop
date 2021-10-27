import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      Page not found... sad face.
      <Link to="/"> Click here to go back to our home page.</Link>
    </div>
  );
};

export default NotFound;