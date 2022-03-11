import React from "react";
import "../styles/navbar.css";

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button } from "@mui/material";
import Link from '@material-ui/core/Link';
import { createBrowserHistory } from 'history';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ListIcon from '@mui/icons-material/List';

const history = createBrowserHistory();
const btnstyle = { padding: 10, marginLeft: 30, backgroundColor: "blue", color:"white" }
const Navbar = ({ setShow, setOrderShow, size,fcount,ocount, setFavShow,setOrderedProductsShow, luser, logoutHandler }) => {
  
  return (
    <nav>
      <div className="nav_box">
        <span className="my_shop" onClick={() => {setShow(true); setFavShow(false);setOrderShow(false);setOrderedProductsShow(false);}}>
         Shopping App
        </span>
        <div className="cart" onClick={() => {setShow(false); setFavShow(false);setOrderShow(false);setOrderedProductsShow(false);}}>
          <span>
            <AddShoppingCartIcon/>
          </span>
          <span>{size}</span>
          <span>
         
          </span>
           </div>
           
           <div className="fav" onClick={()=> {setFavShow(true); setOrderShow(false);setOrderedProductsShow(false);}}>
             <span>
             <FavoriteBorderIcon/>
             </span>
             <span>{fcount}</span>
           </div>
           <div className="order" onClick={()=> {setFavShow(false); setOrderShow(true);}}>
             <span>
             <ListIcon/>
             </span>
             <span>{ocount}</span>
           </div>
           { luser?
          <Button onClick={logoutHandler} style={btnstyle}>
									{"Logout"}
								</Button>:<Link href="login" variant="body2">
									{"Login"}
								</Link>  }
      </div>
    </nav>
  );
};

export default Navbar;
