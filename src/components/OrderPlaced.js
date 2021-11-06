import React from "react";
import { Link } from "react-router-dom";

export default function OrderPlace() {
    
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "25px",
        }}
      >
        Your order has been placed successfully. 
        <Link style={{textDecoration: "none"}} to="/account"> <p style={{color: "navy"}}> Click here to view order details. </p> </Link>
      </div>
    );
  };