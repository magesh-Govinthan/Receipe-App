import React, { useEffect, useState, useContext } from 'react'
import { ReceipeContext } from '../Context/receipeContext';
import"./Home.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home({product}) {
  console.log(product);
  const navigate = useNavigate();
  const { addReceipeToDetails } = useContext(ReceipeContext);
  const addReceipeDetails = (receipe) => {
    addReceipeToDetails(receipe);
    navigate(`/receipe/${receipe.idMeal}`);
  }
 
  return (
    <div style={{background:'whitesmoke',padding:"10px",width:"1400px"}}>

      <h1 style={{fontSize:"50px"}}>List of Receipe</h1>

      <div className='parent'>
        
 {product.map((item)=>{
  
     return(
      <div className='home-card' key={item.idMeal} onClick={()=>addReceipeDetails(item)}>
      <img src={item.strMealThumb}/>
      <h2 style={{textAlign:"center"}}>{item.strMeal}</h2>
      <h3 style={{textAlign:"center"}}>{item.strCategory}</h3>
      </div>
     )
})}


       </div>
    </div>
  )
}

export default Home
