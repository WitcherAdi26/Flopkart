import React, { useState } from 'react'
import {NavLink, useLocation} from "react-router-dom";
import "./Header.css"
import { useUserContext } from '../../Context/AppContext.js';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
  const location=useLocation();
  const [search,setSearch]=useState("");
  
  const {username,loginStatus}=useUserContext();

  function loggedIn(){
    return (
      <div className='header__fourth'>
        <NavLink to="/cart" >
          <div className="header__fourth__1">
            <ShoppingCartIcon />
            <p>Cart</p>
          </div>
        </NavLink>
        <div className="header__fourth__2">
          <p style={{color:"white"}}>{username}</p>
          <AccountCircleIcon />
        </div>  
      </div>
    );
  }

  function notLoggedIn(){
    return (
      <div className='header__fourth'>
        <NavLink to="/login" state={{prevPath:location.pathname}}>
          <button className='login__button'>Login</button>
        </NavLink>
      </div>
    );
  }

  // const abortController=useRef<AbortController | null>(null);
  // let cancelToken;

  // useEffect(()=>{
    
  //   // ()() IIFs->Imediately Invoked Functions:created and called immediately. First round brackets contains description and in secod it is called.
  //   ;(async ()=>{
  //     // abortController.current?.abort();
  //     // abortController.current=new AbortController();

  //     if(cancelToken){
  //       cancelToken.cancel("Request Aborted");
  //     }
  //     cancelToken=axios.CancelToken.source();

  //     search!=="" && props.onChangeLoading(true);

  //     try {
  //       props.onChangeError(false);
  //       const limit=30;
  //       const response=await axios.get("http://localhost:8080/api/explore?search="+search+"&limit"+limit,{
  //         cancelToken:cancelToken.token
  //       });
  //       console.log(response);//axios gives response in JSON
  //       props.onChangeProducts(response.data);
  //       // data.length && setSuggestions(true);
  //     } catch (error) {
  //       props.onChangeError(true);
  //       console.log(error);
  //     } finally{
  //       props.onChangeLoading(false);
  //       console.log("reached");
  //     }
      
  //   })()
  // },[search]);

  return (
    <div className='header'>
        <div className="header__first">
          <div className="header__first__logo">
            <img src="http://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png" alt="flopkart logo"></img>
          </div>
        </div>
        <div className="header__second">
          <input type='text' placeholder='Search products...' value={search} onChange={(e)=>setSearch(e.target.value)}/>
          <SearchIcon />
        </div>
        <div className="header__third"></div>
        { loginStatus ? loggedIn() : notLoggedIn()}
    </div>
  )
}

export default Header;
