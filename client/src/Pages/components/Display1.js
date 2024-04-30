import React from 'react'
import "./Display1.css"
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import { NavLink } from 'react-router-dom';

function Display1Partition(curElem){
    return (
        <div className='Display1Partition'>
            <div className='detail'>
              <img src={curElem.img} alt="img"/>
              <h3>{curElem.name}</h3>
              {/* <p>{props.description}</p> */}
              <div className='stars_price'>
                <div className='stars'>
                  {/* <Stars rating={props.rating}/> */}
                  <StarOutlinedIcon />
                  <StarOutlinedIcon />
                  <StarOutlinedIcon />
                  <StarOutlinedIcon />
                  <StarOutlinedIcon />
                </div>
                <div className='price'>
                  <CurrencyRupeeOutlinedIcon />
                  <h2>{curElem.price}</h2>
                </div>
              </div>
            </div>
        </div>
    );
}

const Display_1 = (curElem) => {
  return (
    <NavLink to={`/viewProduct/${curElem.id}`}>
      <Display1Partition img={curElem.img} rating={curElem.rating} name={curElem.name} price={curElem.price}/>
    </NavLink>
  )
}

export default Display_1
