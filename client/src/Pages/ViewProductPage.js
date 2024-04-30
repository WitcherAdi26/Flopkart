import React, { useEffect } from 'react';
import "./ViewProductPage.css";
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import { useProductContext, useUserContext } from '../Context/AppContext';
import { NavLink,useLocation, useNavigate, useParams } from 'react-router-dom';

const ViewProductPage = () => {
  const navigate=useNavigate();
  const location=useLocation();

  const {isSingleLoading,singleProduct,fetchSingleProduct}=useProductContext();
  const {addItem,cart,loginStatus}=useUserContext();
  console.log(loginStatus);

  const {id}=useParams();

  useEffect(()=>{
    fetchSingleProduct("http://localhost:8080/api/getProduct?id="+id);
  },[]);

  const {_id,product_name,image,retail_price}=singleProduct;

  function handleAddCart(){
    addItem(singleProduct);
    console.log(cart);
  }

  return (
    <div>
      <Header />
      {isSingleLoading ? <h1>"...Loading..."</h1> : <>
        <h1>{product_name}</h1>
        <h3>{retail_price}</h3>
        
        {!loginStatus && <NavLink to="/login" state={{prevPath:location.pathname}}>
          <button>Add to Cart</button>
        </NavLink>}

        {loginStatus && <button onClick={handleAddCart}>Add to Cart</button>}
      </> }
      <div className='footer-component'>
      <Footer />
      </div>
    </div>
  )
}

export default ViewProductPage;
