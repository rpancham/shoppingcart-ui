import React, { useState, useEffect } from "react";
import "../styles/cart.css";
import Button from '@mui/material/Button';
import axios from 'axios';
const Cart = ({ cart,setFavShow, setShow, setCart, handleChange,handlePlaceOrder }) => {
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shippingAddress, setShippingAddress] = useState('');
  const style1={    width: "max-content",
    float: "right",};
    const style2={    padding: 10,
    float: "right",
  backgroundColor:"blue",
  color:"white",
};


const handlechange =(event) =>{
  this.setState({
    [shippingAddress]: event.target.value
  });
}
  const handleRemove = (id) => {
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    let url = `/Cart/cart/${id}`;
    let data =[];
  axios
    .delete(url)
    .then((response) => {
      console.log(response);
      if(response.data != ''){
        window.location.reload();
      }
      else{
      }
    })
    .catch((error) => {
    
      console.log(error);
      
    });
   
  };

  const handlePrice = () => {
    let ans = 0;
    cart.map((item) => (ans += item.quantity * item.product.price));
    console.log("Total: "+ans);
    setPrice(ans);
    let dans=0;
    if(ans>=500 && ans <1000){
       dans=(5*ans)/100;
    }
    else if(ans >=1000){
      dans=(5*ans)/100;
    }
    setDiscount(dans);
  };

  useEffect(() => {
    handlePrice();
  });

  return (
    <article>
      {cart.map((item) => (
        <div className="cart_box" key={item.id}>
          <div className="cart_img">
            <img src={item.product.img} alt="" />
            <p>{item.product.title}</p>
          </div>
          <div>
            <Button onClick={() => handleChange(item, 1)}>+</Button>
            <Button>{item.quantity}</Button>
            <Button onClick={() => handleChange(item, -1)}>-</Button>
          </div>
          <div>
            <span>{item.product.price}</span>
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="total">
        <span>Total Price:</span>
        <span>Rs - {price}</span>
        
      </div>
      { price >=500 && price < 1000?
      <div className="total">

        <span>Discount:</span>
        <span>5%({discount})</span>
        
      </div>: price >= 1000? <div className="total">
        <span>Discount:</span>
        <span>10%({discount})</span>
        
      </div>:<div className="total">
        <span>Discount:</span>
        <span>({discount})</span>
        
      </div>
      }
      <div className="total">
        <span>Grand Total:</span>
        <span>Rs - {price-discount}</span>
        
      </div>
      <div style={style1}>
        <div>
      <span>Shipping Address:</span>
      </div>
      <div>
        <textarea></textarea>
        </div>
        <Button style={style2} onClick={() => handlePlaceOrder()} onChange={handlechange}>Place Order</Button>
      </div>

    </article>
  );
};

export default Cart;
