import React, { useEffect, useState } from "react";
import { readAllItems } from "../../utils/crud";
import { Link } from "@reach/router";
import Loader from "../Loader/Loader";
import useRecipeSearchFilter from "../../utils/hooks/useRecipeSearchFilter";

const SearchRecipe = () => {
  const [recipeData, setRecipeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recipeDetail, setRecipeDetail] = useState([{ id: null }]);
  const [recipeFilter, setRecipeFilter] = useState([]);
  const [handleSelectState, recipeSelectSearch] = useRecipeSearchFilter();

  const readAllitemsData = async (recipeSelectSearch) => {
    setLoading(true);
    const response = await readAllItems(recipeSelectSearch);
    setRecipeData(response);
  };

  useEffect(() => {
    readAllitemsData(recipeSelectSearch);
  }, []);

  return (
    <div classsName="search-result__container">
      <ul className="search-result__recipes">
        {loading ? setRecipeData : <Loader />}
        {recipeData.map((data) => {
          return (
            <li key={data.docId} className="recipe">
              <Link
                recipeDetail={recipeDetail}
                className="recipe__link"
                state={recipeDetail}
                to={`/Recipes/${data.docId}`}
                key={data.docId}
                onClick={() => {
                  setRecipeDetail([{ id: data.docId }]);
                }}
              >
                <div className="recipe__container">
                  <span className="recipe__meal-type">
                    {data.docData.information.mealType}
                  </span>
                  <div className="recipe__image-container">
                    <img alt="" className="recipe__image" />
                    <div className="recipe__details-container">
                      <h2 className="recipe__title">
                        {data.docData.information.recipeTitle}
                      </h2>
                      <span className="recipe__wrapper">
                        <h3 className="recipe__prep-time">
                          {data.docData.information.timeRange}
                        </h3>
                        <h3 className="recipe__difficulty">
                          {data.docData.information.difficulty}
                        </h3>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchRecipe;
