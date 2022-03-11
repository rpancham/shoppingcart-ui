import React, { useState, useEffect } from "react";
import "../styles/cart.css";
import Button from '@mui/material/Button';
import axios from 'axios';
const OrderView = ({ orderProductList }) => {
  
  return (
    <article>
      {orderProductList.map((item) => (
        <div className="cart_box" key={item.id}>
          <div className="cart_img">
            <img src={item.product.img} alt="" />
            <p>{item.product.title}</p>
          </div>
          
          <div>
            <span>{item.price}</span>
            
          </div>
        </div>
      ))}
      
      
    </article>
  );
};

export default OrderView;
