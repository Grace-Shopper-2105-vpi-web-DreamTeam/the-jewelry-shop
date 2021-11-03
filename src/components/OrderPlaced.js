import React from "react";
import { Link } from "react-router-dom";

export default function OrderPlace() {
    
    return (
      <div>
        Your order has been placed successfully. 
        <Link to="/account"> Click here to view order details.</Link>
      </div>
    );
  };