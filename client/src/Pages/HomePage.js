import React from 'react'
import "./HomePage.css";
import Header from "./components/Header.js";
import Catagory from "./components/Catagory.js";
import Display1 from "./components/Display1.js";
import Footer from "./components/Footer.js";
import { useProductContext } from '../Context/AppContext.js';
import axios from 'axios';

const HomePage = async (props) => {
  // const [products,setProducts]=useState([]);
  // const [error,setError]=useState(false);
  // const [loading,setLoading]=useState(false);
  // const [i,setI]=useState(0);

  // function handleProducts(prod){
  //   setProducts(prod);
  // }

  // function handleError(err){
  //   setError(err);
  // }

  // function handleLoading(isloading){
  //   setLoading(isloading);
  // }

  // const render=()=>{
  //   console.log(products);
  //   if(!loading && products.length===0){
  //     return <h2>No Products Found</h2>;
  //   }
  //     var row=[];
  //     for(var i=0;i<products.length;i++){
  //       if(i%5==0){
  //         row.push(<br/>);
  //         row.push(<div className='spc_1'/>);
  //       }
  //       row.push(<Display1 
  //         key={products[0].pid}
  //         img={products[0].image[0]}
  //         rating={products[0].product_rating}
  //         name={products[0].product_name}
  //         // description={product.description}
  //         price={products[0].retail_price} />)
  //     }
  //     if(i%5==4){
  //       row.push(<div className='spc_1'/>);
  //     }else{
  //       row.push(<div className='spc_2'/>);
  //     }

  //     return <>{row}</>
    
  // }

  // const token=localStorage.getItem("token");

  // const userValidity=await axios.post("",{token:token});


  const {isLoading,homePageProducts}=useProductContext();

  return (
    <div className="App">
        <div style={{height:"auto",width:"auto",backgroundColor:"#D8D9DA",border:"5px"}}>
            <Header />
            <br/>
            <Catagory />
            <br/>
            <div className='main'>
            {isLoading && <h1>...Loading...</h1>}
            {!isLoading && <>
              {homePageProducts.map((curElem)=>{
                return <Display1 key={curElem._id} id={curElem._id} img={curElem.image[0]} rating={curElem.product_rating} name={curElem.product_name} price={curElem.retail_price} />
              })}
            </>}
            </div>
            <Footer />        
        </div>
    </div> 
  )
}

export default HomePage;
