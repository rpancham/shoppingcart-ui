import React, { useState, useEffect, Component } from "react";
import Book from "./book";
import Navbar from "./navbar";
import Cart from "./cart";
import Fav from "./fav";
import axios from 'axios';
import { createBrowserHistory } from 'history';
import MyOrder from "./myorders";
import OrderView from "./orderview";

const history = createBrowserHistory();

const Home = () => {
  const [show, setShow] = useState(true);
  const [fshow, setFavShow] = useState(false);
  const [oshow, setOrderShow] = useState(false);
  const [opshow, setOrderedProductsShow] = useState(false);
  const [cart, setCart] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [orderProductList, setOrderProductsList] = useState([]);
  const [favlist, setFavList] = useState([]);
  const [luser, setUser] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const handleClick = (item) => {
    if (cart.indexOf(item) !== -1) return;
    setCart([...cart, item]);
  };
  const handleFavClick = (item) => {
    if (favlist.indexOf(item) !== -1) return;
    setFavList([...favlist, item]);
  };

  const logoutHandler = (event) => {
    console.log("Logout");
    setShow(true);
		localStorage.removeItem('AuthToken');
		history.push('/login');
    window.location.reload();
	};

  const handleChange = (item, d) => {
    
    const cstock = item.product.currentStock;

    if(d == 1 && cstock<= (item.quantity))
    {
      alert(item.product.title+' out of stock');
      setFavShow(false);
      setShow(false);
      getCartList();
    }
    else{
      const authToken = localStorage.getItem('AuthToken');
    
      const headers = { Authorization: `${authToken}` };
      let url = `/Cart/cart/${item.id}/${d}`;
      let data =[];
    axios
      .put(url,data,{headers:headers})
      .then((response) => {
        console.log(response);
        if(response.data != ''){
         
        }
        else{
          
        }
        setFavShow(false);
        setShow(false);
        getCartList();
         
      })
      .catch((error) => {
      
        console.log(error);
       
        setFavShow(false);
        setShow(false);
        window.location.reload(); 
      });
    }
    
  };


  const handleRemove = (id) => {
    const authToken = localStorage.getItem('AuthToken');
    
    const headers = { Authorization: `${authToken}` };
    let url = `/Wishlist/Wishlist/${id}`;
    let data =[];
  axios
    .delete(url,{headers:headers})
    .then((response) => {
      console.log(response);
      if(response.data != ''){
        getWishList();
      }
      else{
        
      }
    })
    .catch((error) => {
    
      console.log(error);
     
    });
    
  };

const getCartList = () =>{
  const authToken = localStorage.getItem('AuthToken');
  console.log(authToken);
  const headers = { Authorization: `${authToken}` };
  axios
    .get('Cart/cart/items',{headers:headers})
    .then((response) => {
        if(response.data !== ''){
          setCart(response.data);
        }
        else{
          setCart([]);
        }
    })
    .catch((error) => {
      console.log(error);
      setCart([]);
    });

};

const handleVieworder = (id) =>{
  const authToken = localStorage.getItem('AuthToken');
  console.log("oid:"+id);
  const headers = { Authorization: `${authToken}` };
  const userData = {
    id:id
  };
  axios
    .get('OrderDetails/OrderDetails/products',{params:userData})
    .then((response) => {
      console.log("My order Products:" + response.data);
        if(response.data !== ''){
          setOrderProductsList(response.data);
          setFavShow(false); setShow(false); setOrderShow(false); setOrderedProductsShow(true);
        }
        else{
          setOrderProductsList([]);
        }
    })
    .catch((error) => {
      console.log(error);
      setOrderProductsList([]);
    });

};


const getMyOrdersList = () =>{
  const authToken = localStorage.getItem('AuthToken');
  console.log(authToken);
  const headers = { Authorization: `${authToken}` };
  axios
    .get('Orders/Order/items',{headers:headers})
    .then((response) => {
      console.log("My orders:" + response);
        if(response.data !== ''){
          setOrderList(response.data);
        }
        else{
          setOrderList([]);
        }
    })
    .catch((error) => {
      console.log(error);
      setOrderList([]);
    });

};

const getWishList = () =>{
  const authToken = localStorage.getItem('AuthToken');
  console.log(authToken);
  const headers = { Authorization: `${authToken}` };
  axios
    .get('Wishlist/Wishlist/items',{headers:headers})
    .then((response) => {
        if(response.data !== ''){
          setFavList(response.data);
        }
        else{
          setFavList([]);
        }
    })
    .catch((error) => {
      console.log(error);
      setFavList([]);
    });

};


const handleAddtoCart = (item) => {
 
   
   const authToken = localStorage.getItem('AuthToken');
   
   axios.defaults.headers.common = { Authorization: `${authToken}` };
   let url = `/Cart/cart/${item.id}`;
   let data =[];
 axios
   .post(url,data)
   .then((response) => {
     console.log(response);
     if(response.data != ''){
      
     }
     else{
       
     }
     window.location.reload(); 
   })
   .catch((error) => {
   
     console.log(error);
     
   });
   window.location.reload(); 
   console.log(data);
 };

 const handleAddtoFav = (item) => {
   const authToken = localStorage.getItem('AuthToken');
   
   axios.defaults.headers.common = { Authorization: `${authToken}` };
   let url = `/Wishlist/Wishlist/${item.id}`;
   let data =[];
 axios
   .post(url,data)
   .then((response) => {
     console.log(response);
     if(response.data != ''){
      getCartList();
     }
     else{
       
     }
     window.location.reload(); 
   })
   .catch((error) => {
  
     console.log(error);
     
   });
   
 };
 const handleRemoveFromFav = (id) => {
   const authToken = localStorage.getItem('AuthToken');
   
   const headers = { Authorization: `${authToken}` };
   let url = `/Wishlist/Wishlist/${id}`;
   let data =[];
 axios
   .delete(url,{headers})
   .then((response) => {
     console.log(response);
     if(response.data != ''){
      getWishList();
     }
     else{
       
     }
   })
   .catch((error) => {
   
     console.log(error);
    
   });
 };


 const handlePlaceOrder = () => {
   console.log("Place order");
  const authToken = localStorage.getItem('AuthToken');
  
  const headers = { Authorization: `${authToken}` };
  
axios
  .post('/Orders/order',{headers:headers})
  .then((response) => {
    console.log(response);
    if(response.data != ''){
      alert("Order Placed Successfully");
     getCartList();
     setShow(true);
     setFavShow(false);
    }
    else{
      
    }
  })
  .catch((error) => {
  
  });
};

if(!mounted){
  const authToken = localStorage.getItem('AuthToken');
  console.log(authToken);
  const headers = { Authorization: `${authToken}` };
  axios
    .get('/secured/claim',{headers:headers})
    .then((response) => {
      console.log("Ares:"+response);
      if(response.data !== ''){
      setUser(true);
        getCartList();
        getWishList();
        getMyOrdersList();
      }
      else{
        setUser(false);
        history.push('/login');
        window.location.reload();
      }
    })
    .catch((error) => {
   
      console.log(error);
      
      history.push('/login');
      window.location.reload();
    });
  }
  useEffect(() =>{
    setMounted(true)
  },[])

  return (
    <React.Fragment>
      <Navbar setShow={setShow} fshow={fshow} setOrderedProductsShow={setOrderedProductsShow} setOrderShow={setOrderShow} size={cart.length}  fcount={favlist.length} ocount={orderList.length} setFavShow={setFavShow} luser={luser} logoutHandler={logoutHandler} />
      {opshow?(<OrderView orderProductList={orderProductList}></OrderView>):oshow?(<MyOrder orderList={orderList} handleVieworder={handleVieworder}></MyOrder>):fshow?(<Fav favlist={favlist} handleRemove={handleRemove} handleClick={handleClick}/>):show ? (
        <Book handleAddtoFav={handleAddtoFav} handleAddtoCart={handleAddtoCart} handleRemoveFromFav={handleRemoveFromFav} />
      ) : (
        <Cart cart={cart} setShow={setShow} setFavShow={setFavShow} setCart={setCart} handlePlaceOrder={handlePlaceOrder} handleChange={handleChange} />
      )}
    </React.Fragment>
    
  );
};

export default Home;
