import React from 'react'
import "./Catagory.css"
import Catagory_Details from './Catagory_Details';


function createCatagory(catagory){
  return (
    <CatagoryPartition key={catagory.id} image={catagory.image} content={catagory.content} />
  );
}

function CatagoryPartition(props){
    return (
        <div className='catagory__partition'>
            <div className='first'>
                <img src={props.image} alt="img" />
                <p>{props.content}</p>
            </div>
        </div>
    );
}

const Catagory = () => {
  return (
    <div className='catagory'>
      {Catagory_Details.map(createCatagory)}
    </div>
  )
}

export default Catagory
