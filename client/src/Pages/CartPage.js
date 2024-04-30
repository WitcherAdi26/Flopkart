import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import axios from 'axios';
import { useUserContext } from '../Context/AppContext.js';

const CartPage = async () => {
  const {id,cart}=useUserContext();

  console.log(cart);

  try {
    const response=await axios.post("http://localhost:8080/api/addItemToCart",{
      userID:id,
      cart:cart
  });
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      <Header />
      {cart.map((item)=>{
        return <>
          <h2>{item.product_name}</h2>
          <h2>{item.retail_price}</h2>
          <h2>{item.qty}</h2>
          <br/>
          <br/>
        </>
      })}
      <Footer />
    </div>
  )
}

export default CartPage;
