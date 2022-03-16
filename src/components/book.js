import React, { useState,useEffect } from "react";
import Cards from "./card";
import "../styles/book.css";
import axios from 'axios';
import { createBrowserHistory } from 'history';
import {PaginatedList} from 'react-paginated-list';
const history = createBrowserHistory();
const Book = ({ handleAddtoFav, handleAddtoCart, handleRemoveFromFav }) => {
  const authToken = localStorage.getItem('AuthToken');
  //console.log(authToken);
  const [blist, setBookList] = useState([]);
  const [fblist, setFBookList] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [mounted1, setMounted] = useState(false);

  if(!mounted1){
  axios.defaults.headers.common = { Authorization: `${authToken}` };
  axios
    .get('/products/list')
    .then((response) => {
      console.log("Bresp:"+response.data);
      if(response.data != ''){
      setBookList(response.data);
      }
      else{
        setBookList([]);
        
      }
    })
    .catch((error) => {
    
      console.log(error);
      
      history.push('/login');
    });
  }
  useEffect(() => {
      setMounted(true);
  }, []);

  const handleSearch = (event) => {
    let value = event.target.value;
    let result = [];
console.log(value);
if(value != ''){
result = blist.filter((data) => {
return data.title.search(value) != -1;
});
setFBookList(result);
setFiltered(true);
}
else{
setFBookList([]);
setFiltered(false);	
}
  }
  return (
    <section>
      
					<span style={{ marginTop: '0', marginBottom: '1%' }}>

<input type="text" onChange={(event) =>handleSearch(event)} placeholder="Search Book here" />
</span>
      <PaginatedList
    list={filtered?fblist:blist}
    itemsPerPage={8}
    renderList={(list) => (
      <>
        {list.map((item, id) => {
          //console.log(item);
          return (
            <Cards key={item.id} item={item}  handleAddtoFav={handleAddtoFav} handleAddtoCart={handleAddtoCart} 
            handleRemoveFromFav={handleRemoveFromFav} />
          );
        })}
      </>
    )}
  />

    </section>
  );
};

export default Book;
