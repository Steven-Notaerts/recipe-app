import React from "react";

const AllergensListItems = ({ recipeDetail }) => {
  const uniqueTags = [];
  recipeDetail.map((img) => {
    if (uniqueTags.indexOf(img.tag) === -1) {
      uniqueTags.push(img.tag);
    }
  });

  return (
    <>
      <li className="recipe-ingredient__ingredient-list-item">
        <span>
          {recipeDetail[0]?.docData?.ingredients?.ingredient1?.allergensOne}
        </span>
      </li>
      <li className="recipe-ingredient__ingredient-list-item">
        <span>
          {recipeDetail[0]?.docData?.ingredients?.ingredient2?.allergensTwo}
        </span>
      </li>
      <li className="recipe-ingredient__ingredient-list-item">
        <span>
          {recipeDetail[0]?.docData?.ingredients?.ingredient3?.allergensThree}
        </span>
      </li>
      <li className="recipe-ingredient__ingredient-list-item">
        <span>
          {recipeDetail[0]?.docData?.ingredients?.ingredient4?.allergensFour}
        </span>
      </li>
      <li className="recipe-ingredient__ingredient-list-item">
        <span>
          {recipeDetail[0]?.docData?.ingredients?.ingredient5?.allergensFive}
        </span>
      </li>
      <li className="recipe-ingredient__ingredient-list-item">
        <span>
          {recipeDetail[0]?.docData?.ingredients?.ingredient6?.allergensSix}
        </span>
      </li>
      <li className="recipe-ingredient__ingredient-list-item">
        <span>
          {recipeDetail[0]?.docData?.ingredients?.ingredient7?.allergensSeven}
        </span>
      </li>
      <li className="recipe-ingredient__ingredient-list-item">
        <span>
          {recipeDetail[0]?.docData?.ingredients?.ingredient8?.allergensEight}
        </span>
      </li>
    </>
  );
};

export default AllergensListItems;
