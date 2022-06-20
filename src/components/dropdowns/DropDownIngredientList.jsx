import React, { useState, useEffect } from "react";

const DropDownIngredientList = ({
  userInput,
  setUserInput,
  onChangeHelper,
}) => {
  const [ingredientList, setIngredientList] = useState("");
  async function ingredientListFunction() {
    console.log(`${process.env.REACT_APP_INGREDIENT_API_URL}`);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_INGREDIENT_API_URL}`
      );
      const data = await response.json();
      setIngredientList(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    ingredientListFunction();
  }, []);

  return (
    <>
      <option
        className="select-main__option"
        key="-1"
        name="allergen"
        value="Set Ingredient"
      >
        Set Ingredient
      </option>
      {ingredientList.meals?.map((ingredient) => {
        return (
          <option
            value={ingredient.strIngredient}
            key={ingredient.idIngredient}
            className="select-main__option"
            required
          >
            {ingredient.strIngredient}
          </option>
        );
      })}
    </>
  );
};

export default DropDownIngredientList;
