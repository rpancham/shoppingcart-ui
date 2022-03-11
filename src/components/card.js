import React from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import FavoriteIcon from '@material-ui/icons/Favorite';
import Favorite from "@material-ui/icons/Favorite";
import IconButton from '@material-ui/core/IconButton';
import Cart from "./cart";
import axios from 'axios';


const Cards = ({ item,handleAddtoFav, handleAddtoCart, handleRemoveFromFav }) => {
  const { title, author, price, img, currentStock } = item;
  const [fav, setFav] = useState(false);



  return (
    <div className="cards">
      <div className="image_box">
        <img src={img} alt="" />
      </div>
      <div className="details">
        <p>{title}</p>
        <p><b>In Stock:</b>{currentStock}</p>
        <p>{author}</p>
        <p>Price - {price}Rs</p>
        <Button onClick={() => handleAddtoCart(item)} disabled={currentStock<=0}>Add to Cart</Button>
        {/* <Button size='small'><FavoriteBorderIcon /></Button> */}
        {fav &&
          <IconButton onClick={() => { setFav(!fav); handleAddtoFav(item); }} aria-label="delete" color="primary">
            <FavoriteBorderIcon></FavoriteBorderIcon>
          </IconButton>
        }
        {!fav &&
          <IconButton onClick={() => { setFav(!fav); handleRemoveFromFav(item.id); }} aria-label="delete" color="primary">
            <Favorite></Favorite>
          </IconButton>
        }
      </div>
    </div>
  );
};

export default Cards;

