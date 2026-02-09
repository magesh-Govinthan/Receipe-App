import React, { useEffect, useState } from "react";
import { FaSearch, FaStar } from "react-icons/fa";
import "./NavBar.css";
import axios, { all } from "axios";
import Home from "./Home";
import { useContext } from "react";
import { ReceipeContext } from "../Context/receipeContext";

function NavBar() {
  const { allReceipes, allReceipesWhichSearched } = useContext(ReceipeContext);
  console.log(allReceipes);
  const [searchinput, setSearchInput] = useState("");
  const [submtinput, setSubmitInput] = useState("");
  const [product, setProduct] = useState(allReceipes ? allReceipes :[]);
  const [ingredient, setIngrediant] = useState([]);
  const [category, setCategory] = useState([]);
  const [mealtype, setMealType] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState(
    allReceipes ? allReceipes : []
  );

  useEffect(() => {
    if (submtinput.length > 0) {
      axios
        .get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${submtinput}`,
        )
        .then((data) => {
          setFilteredMeals(data.data.meals);
          setProduct(data.data.meals);
          allReceipesWhichSearched(data.data.meals);
        })
        .catch((err) => console.log(err));
    }
  }, [submtinput]);
  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
      .then((data) => setIngrediant(data.data.meals));
  }, []);
  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then((data) => setCategory(data.data.meals));
  }, []);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then((data) => setMealType(data.data.meals));
  }, []);

  console.log(product);
  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSumbit = () => {
    setSubmitInput(searchinput);
    setSearchInput("");
    allReceipesWhichSearched(product);
  };
  const fliterIngredientFromProduct = (value) => {
    const meals = product
      .map((item) =>
        Array.from({ length: 20 }, (_, id) =>
          [value].includes(item[`strIngredient${id + 1}`]) ? item : "",
        ),
      )
      .flat()
      .filter((item) => item !== "");
    if (value === "ingredients") {
      setFilteredMeals(product);
      return;
    }
    setFilteredMeals(meals);
  };

  const filterIngredientFromCategory = (value) => {
    const meals = product.filter((item) => item.strCategory === value);
    if (value === "categories") {
      setFilteredMeals(product);
      return;
    }
    console.log(meals);
    setFilteredMeals(meals);
  };

  const filterIngredientFromMealType = (value) => {
    const meals = product.filter((item) => item.strArea === value);
    if (value === "meal types") {
      setFilteredMeals(product);
      return;
    }
    setFilteredMeals(meals);
  };
  const handleIngredient = (e) => {
    console.log(e.target.value);
    fliterIngredientFromProduct(e.target.value);
  };
  const handleFilterCategory = (e) => {
    console.log(e.target.value);
    filterIngredientFromCategory(e.target.value);
  };

  const handleMealType = (e) => {
    filterIngredientFromMealType(e.target.value);
  };

  return (
    <>
      <div className="nav-parent">
        <div className="search-container">
          <input
            type="text"
            value={searchinput}
            placeholder="What do you want to cook receipe?"
            onChange={(e) => handleChange(e)}
          />
          <button
            className="search-button"
            onClick={() => {
              handleSumbit();
            }}
          >
            Search
          </button>
        </div>
        <div className="select-div">
          <h2>Fliter by</h2>
          <div className="select-parent">
            <select
              onChange={(e) => {
                handleIngredient(e);
              }}
            >
              <option value="ingredients" defaultValue={"ingredients"}>
                Ingredients
              </option>
              {ingredient.map((item) => (
                <option value={item.strIngredient} key={item.idIngredient}>
                  {item.strIngredient}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => {
                handleFilterCategory(e);
              }}
            >
              <option value="categories" defaultValue={"categories"}>
                Categories
              </option>
              {category.map((item) => (
                <option value={item.strCategory}>{item.strCategory}</option>
              ))}
            </select>
            <select
              onChange={(e) => {
                handleMealType(e);
              }}
            >
              <option value="meal types" defaultValue={"meal types"}>
                Meal Types
              </option>
              {mealtype.map((item) => (
                <option value={item.strArea}>{item.strArea}</option>
              ))}
            </select>
          </div>
        </div>

      </div>

      {filteredMeals.length > 0 ? (
        <Home product={filteredMeals} />
      ) : (
        <h1
          style={{
            
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "100px",
            padding: "20px",
            textShadow: "1px 1px 2px lightgray,0 0 2px black, 0 0 0.2em black",
            fontSize: "60px",
          }}
        >
          No Result...
        </h1>
      )}
    </>
  );
}

export default NavBar;
