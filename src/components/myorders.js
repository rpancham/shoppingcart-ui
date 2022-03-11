import React, { useState, useEffect } from "react";
import "../styles/cart.css";
import Button from '@mui/material/Button';
import axios from 'axios';
const MyOrder = ({ orderList, handleVieworder }) => {
  
  const style1={    width: "max-content",
    float: "right",};
    const style2={    padding: 10,
    float: "right",
  backgroundColor:"blue",
  color:"white",
};



  return (
    <article>
      <div className="cart_box" key="ctitle">
      <div className="cart_img">Order Date</div>
      <div>Order Amount</div>
      <div>Discount</div>
      <div>Payable Amount</div>
      <div>Action</div>
      </div>
      {orderList.map((item) => (
        
        <div className="cart_box" key={item.id}>
          {console.log(item)}
          <div className="cart_img">
            
            <p>{item.orderDate}</p>
          </div>
          <div>{item.orderAmount}</div>
          <div>{item.discount}</div>
          <div>{item.orderAmount - item.discount}</div>
          <div><button onClick={handleVieworder(item.id)}>View Order</button></div>
          
          
        </div>
      ))}
      
    </article>
  );
};

export default MyOrder;
