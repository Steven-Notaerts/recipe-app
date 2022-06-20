import React from "react";

const IngredientListItem = ({
  recipeDetail,
  howManyPersons,
  recipeIngredients,
}) => {
  return (
    <>
      <li className="recipe-ingredient__ingredient-list-item">
        <span>
          {recipeDetail[0]?.docData?.ingredients?.ingredient1?.quantityOne.toFixed(
            2
          ) * howManyPersons}
        </span>
        <span>
          {recipeDetail[0]?.docData?.ingredients?.ingredient1?.measurementOne}
        </span>
        <span>
          {recipeDetail[0]?.docData?.ingredients?.ingredient1?.ingredientOne}
        </span>
      </li>
      <li className="recipe-ingredient__ingredient-list-item">
        <span>
          {recipeDetail[0]?.docData?.ingredients?.ingredient2?.quantityTwo.toFixed(
            2
          ) * howManyPersons}
        </span>
        <span>
          {recipeDetail[0]?.docData?.ingredients?.ingredient2?.measurementTwo}
        </span>
        <span>
          {recipeDetail[0]?.docData?.ingredients?.ingredient2?.ingredientTwo}
        </span>
      </li>
      <li className="recipe-ingredient__ingredient-list-item">
        <span>
          {recipeDetail[0]?.docData?.ingredients?.ingredient3?.quantityThree.toFixed(
            2
          ) * howManyPersons}
        </span>
        <span>
          {recipeDetail[0]?.docData?.ingredients?.ingredient3?.measurementThree}
        </span>
        <span>
          {recipeDetail[0]?.docData?.ingredients?.ingredient3?.ingredientThree}
        </span>
      </li>

      <li className="recipe-ingredient__ingredient-list-item">
        <span>
          {recipeDetail[0]?.docData?.ingredients?.ingredient4?.quantityFour.toFixed(
            2
          ) * howManyPersons}
        </span>
        <span>
          {recipeDetail[0]?.docData?.ingredients?.ingredient4?.measurementFour}
        </span>
        <span>
          {recipeDetail[0]?.docData?.ingredients?.ingredient4?.ingredientFour}
        </span>
      </li>

      <li className="recipe-ingredient__ingredient-list-item">
        <span>
          {recipeDetail[0]?.docData?.ingredients?.ingredient5?.quantityFive.toFixed(
            2
          ) * howManyPersons}
        </span>
        <span>
          {recipeDetail[0]?.docData?.ingredients?.ingredient5?.measurementFive}
        </span>
        <span>
          {recipeDetail[0]?.docData?.ingredients?.ingredient5?.ingredientFive}
        </span>
      </li>

      <li className="recipe-ingredient__ingredient-list-item">
        <span>
          {recipeDetail[0]?.docData?.ingredients?.ingredient6?.quantitySix.toFixed(
            2
          ) * howManyPersons}
        </span>
        <span>
          {recipeDetail[0]?.docData?.ingredients?.ingredient6?.measurementSix}
        </span>
        <span>
          {recipeDetail[0]?.docData?.ingredients?.ingredient6?.ingredientSix}
        </span>
      </li>

      <li className="recipe-ingredient__ingredient-list-item">
        <span>
          {recipeDetail[0]?.docData?.ingredients?.ingredient7?.quantitySeven.toFixed(
            2
          ) * howManyPersons}
        </span>
        <span>
          {recipeDetail[0]?.docData?.ingredients?.ingredient7?.measurementSeven}
        </span>
        <span>
          {recipeDetail[0]?.docData?.ingredients?.ingredient7?.ingredientSeven}
        </span>
      </li>

      <li className="recipe-ingredient__ingredient-list-item">
        <span>
          {recipeDetail[0]?.docData?.ingredients?.ingredient8?.quantityEight.toFixed(
            2
          ) * howManyPersons}
        </span>
        <span>
          {recipeDetail[0]?.docData?.ingredients?.ingredient8?.measurementEight}
        </span>
        <span>
          {recipeDetail[0]?.docData?.ingredients?.ingredient8?.ingredientEight}
        </span>
      </li>
    </>
  );
};

export default IngredientListItem;
