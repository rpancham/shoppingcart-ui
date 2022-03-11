import React from "react";
import "../styles/cart.css";
import Button from '@mui/material/Button';
const Fav = ({handleClick,favlist,handleRemove}) => {

  return (
    <article>
      {favlist.map((item) => (
        <div className="cart_box" key={item.id}>
          <div className="cart_img">
            <img src={item.product.img} alt="" />
            <p>{item.product.title}</p>
            <span>Price: {item.product.price}</span>
          </div>
          <Button onClick={() => handleClick(item)}>Add to Cart</Button>
          <Button onClick={() => handleRemove(item.id)}>Remove from Favourite</Button>
        </div>
      ))}
    </article>
  );
};

export default Fav;
