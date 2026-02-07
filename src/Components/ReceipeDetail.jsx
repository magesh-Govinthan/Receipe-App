import React from "react";
import "./ReceipeDetail.css";
import { FaVideo} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ReceipeContext } from "../Context/receipeContext";

function ReceipeDetail() {

  const { selectedReceipe } = useContext(ReceipeContext);

  const ingredients = [];
  if(selectedReceipe) {
  for (let i = 1; i <= 20; i++) {
    const ingredient = selectedReceipe[`strIngredient${i}`];
    const measure = selectedReceipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({ ingredient, measure });
    }
  }
}
  console.log(selectedReceipe);
  return (
    selectedReceipe &&
    <div style={{ background: "whitesmoke", padding: "10px",width:"1400px" }}>
      <div>
        <h1 style={{ fontSize: "50px" }}>{selectedReceipe.strMeal}</h1>
        <p className="para1">
          {selectedReceipe.strInstructions}
        </p>
        <div className="catandrec">
        <button className="rec-child">{selectedReceipe.strCategory}</button>
        <button className="rec-child">{selectedReceipe.strArea}</button>
        </div>
      </div>
      <div className="detail">
        <div>
        <img className="imagerec"src={selectedReceipe.strMealThumb}/>
        </div>
        <div className="detail-cate">
            <h1 style={{ fontSize: "50px",margin:"0px"}}>Ingredient & Measure</h1>
            {
              ingredients.map((item, index) => (
                <div key={index} className="cate1">
                  <h4>{item.ingredient}</h4>
                  <h4>{item.measure}</h4>
                </div>
              ))
            }
            <h1 style={{ fontSize: "50px", margin:"0px"}}>Receipe Video</h1>
        <div className="cate2"><h4><FaVideo/></h4><a href={selectedReceipe.strYoutube} target="_blank">{selectedReceipe.strYoutube? selectedReceipe.strYoutube : 'not available for this dish'}</a></div>
        </div>
        </div>
       
      
    </div>
  );
}

export default ReceipeDetail;
