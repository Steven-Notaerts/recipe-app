import React, { useEffect, useState, useReducer } from "react";
import Header from "../components/header/Header";
import { readItem, deleteRecipe } from "../utils/crud";
import Loader from "../components/Loader/Loader";
import IngredientListItem from "../components/recipeDetail/IngredientListItem";
import AllergensListItems from "../components/recipeDetail/AllergensListItems";
import PreparationInstructions from "../components/recipeDetail/PreparationInstructions";
import { navigate } from "@reach/router";
import { useParams } from "@reach/router";
import RecipeFeedback from "../components/recipeDetail/RecipeFeedback";
import { AuthContext } from "../utils/context/AuthContext";

const RecipeDetail = ({ id }) => {
  const [recipeDetail, setRecipeDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const initialHowManyPersonsCount = 1;
  const [howManyPersons, setHowManyPersons] = useState(
    initialHowManyPersonsCount
  );
  const [recipeInformation, setRecipeInformation] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipepreparationMethod, setRecipepreparationMethod] = useState([]);

  const [weekPlannerRecipes, setWeekPlannerRecipes] = useState([]);
  const [favoritRecipes, setFavoritRecipes] = useState([]);

  const params = useParams(id);

  const recipeDetailData = async (id) => {
    setLoading(true);
    const response = await readItem(id);
    setRecipeDetail(response);
    setRecipeInformation(response[0].docData.information);
    setRecipeIngredients(response[0].docData.ingredients);
    setRecipepreparationMethod(response[0].docData.preparationMethod);
  };

  useEffect(() => {
    recipeDetailData(id);
  }, []);

  const addToWeekplanner = async (id, recipeDetail) => {
    try {
      const response = await readItem(id);
      setRecipeDetail(response);
      localStorage.setItem("monday", recipeDetail);
    } catch (error) {}
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "DELETE":
        if (window.confirm("Do you want to delete this recipe?") === true) {
          deleteRecipe(id);
          navigate("/Recipes");
          alert("deleted");
          return;
        }
      // case "FAVORIT":
      //   setFavoritRecipes([...favoritRecipes, id]);
      //   alert("added to favorit");

      // case "WEEKPLANNER":
      //   addToWeekplanner();

      //gets in error 'too much re renders''
      case "UPDATE":
        navigate(`/AddRecipe/${id}`);

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, null);

  const updateRecipe = () => {};
  return (
    <>
      <Header />
      <main class="recipe-detail">
        <section class="recipe-detail__container">
          {loading ? setRecipeDetail : <Loader />}
          <div className="recipe-detail__header-image-wrapper">
            <h1 className="recipe-detail__title">
              {recipeDetail[0]?.docData.information.recipeTitle}
            </h1>
            <h2 className="recipe-detail__sub-title">
              {recipeDetail[0]?.docData.information.recipeInformation}
            </h2>
          </div>

          <div className="recipe-detail__recipe-image-wrapper">
            <img src="" alt="" className="recipe-detail__recipe-image" />
          </div>

          <div className="recipe-detail__ingredients-button-wrapper">
            <div className="recipe-detail__ingredients">
              <div className="recipe-persons">
                {howManyPersons === 1 ? (
                  <button disabled className="recipe-persons__min-btn btn">
                    -
                  </button>
                ) : (
                  <button
                    className="recipe-persons__min-btn btn"
                    onClick={() => {
                      setHowManyPersons(howManyPersons - 1);
                    }}
                  >
                    -
                  </button>
                )}
                {/* <button className="recipe-details__min-btn">-</button> */}
                <span className="recipe-persons__how-many-persons">
                  {howManyPersons} person(s)
                </span>
                <button
                  className="recipe-persons__plus-btn btn"
                  onClick={() => {
                    setHowManyPersons(howManyPersons + 1);
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div className="recipe-ingredient-allergenen-buttons-wrapper">
              <div className="ingredient-allergens__wrapper">
                <div className="recipe-ingredient">
                  <h3 className="recipe-ingredient__sub-title">
                    ingredient list
                  </h3>
                  <ul className="recipe-ingredient__ingredient-list">
                    <IngredientListItem
                      recipeDetail={recipeDetail}
                      howManyPersons={howManyPersons}
                      recipeIngredients={recipeIngredients}
                    />
                  </ul>
                </div>
                <div className="recipe-allergens">
                  <h3 className="recipe-allergens__sub-title">
                    allergens list
                  </h3>
                  <ul>
                    <AllergensListItems recipeDetail={recipeDetail} />
                  </ul>
                </div>
              </div>

              <div className="recipe-buttons">
                <div className="recipe-buttons__top-btn">
                  <button
                    className="btn"
                    // onClick={() => {
                    //   dispatch({ type: "WEEKPLANNER", id });
                    // }}
                  >
                    Add to weekplanner
                  </button>
                </div>
                <div className="recipe-buttons__bottom-btn">
                  <button
                    className="btn hover-btn"
                    onClick={() => {
                      navigate(`/AddRecipe/${id}`);
                    }}
                  >
                    update recipe
                  </button>
                  <button
                    className="btn"
                    onClick={() => {
                      dispatch({ type: "DELETE", id });
                      // if (
                      //   window.confirm("Do you want to delete this recipe?") ===
                      //   true
                      // ) {
                      //   deleteRecipe(id);
                      //   navigate("/Recipes");
                      //   alert("deleted");
                      // }
                    }}
                  >
                    delete recipe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="preparation-instructions">
          <div className="preparation-instructions__container">
            <h2 className="preparation-instructions__sub-title">
              Preparation instructions
            </h2>
            <ul className="preparation-instructions__list">
              <PreparationInstructions
                recipepreparationMethod={recipepreparationMethod}
              />
            </ul>
          </div>
        </section>
        <RecipeFeedback id={id} recipeDetail={recipeDetail} />
      </main>
    </>
  );
};

export default RecipeDetail;
