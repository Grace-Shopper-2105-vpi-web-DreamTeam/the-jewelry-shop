import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "25px",
      }}
    >
      Page not found... sad face.
      <Link style={{textDecoration: "none"}} to="/"> <p style={{color: "navy"}}> Click here to go back to our home page. </p> </Link>
    </div>
  );
};

