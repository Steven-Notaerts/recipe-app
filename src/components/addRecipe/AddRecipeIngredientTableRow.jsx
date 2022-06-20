import React from "react";
import DropDownIngredientList from "../dropdowns/DropDownIngredientList";
import DropdownIngredientMeasurement from "../dropdowns/DropdownIngredientMeasurement";
import DropDownAllergens from "../dropdowns/DropDownAllergens";

const AddRecipeIngredientTableRow = ({
  userInput,
  onChangeHelper,
  ingredientMeasurements,
  allergensTypes,
  initializeAddRecipeData,
}) => {
  return (
    <>
      {Object.values(initializeAddRecipeData?.recipe?.ingredients).map(
        (ingredient) => {
          const ingredientItem = Object.keys(ingredient)[0];
          const ingredientQuantity = Object.keys(ingredient)[1];
          const ingredientMeasurement = Object.keys(ingredient)[2];
          const ingredientAllergens = Object.keys(ingredient)[3];
          const ingredientUnitPrice = Object.keys(ingredient)[4];

          return (
            <tr key={Object.keys(ingredient)[0]} className="table-data-row">
              <td className="table-data-row__">
                <select
                  name={ingredientItem}
                  id="ingredients"
                  defaultValue="Select ingredient"
                  onChange={onChangeHelper}
                  className="select-main"
                >
                  <DropDownIngredientList
                    name={ingredientItem}
                    value={userInput.ingredientItem}
                    onChangeHelper={onChangeHelper}
                  />
                </select>
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  name={ingredientQuantity}
                  value={userInput.ingredientQuantity}
                  onChange={onChangeHelper}
                  className="form-input"
                />
              </td>
              <td>
                <select
                  name={ingredientMeasurement}
                  id="ingredientMeasurement"
                  onChange={onChangeHelper}
                  defaultValue="Select Measurement"
                  className="select-main"
                >
                  <DropdownIngredientMeasurement
                    ingredientMeasurements={ingredientMeasurements}
                    name={ingredientMeasurement}
                    value={userInput.ingredientMeasurement}
                    onChangeHelper={onChangeHelper}
                  />
                </select>
              </td>
              <td>
                <select
                  name={Object.keys(ingredient)[3]}
                  id="ingredientAllergenes"
                  defaultValue="none"
                  onChange={onChangeHelper}
                  className="select-main"
                >
                  <DropDownAllergens
                    allergensTypes={allergensTypes}
                    name={ingredientAllergens}
                    value={userInput.ingredientAllergenes}
                    onChangeHelper={onChangeHelper}
                  />
                </select>
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  name={ingredientUnitPrice}
                  value={userInput.ingredientUnitPrice}
                  onChange={onChangeHelper}
                  className="form-input"
                  step=".01"
                />
              </td>
            </tr>
          );
        }
      )}
    </>
  );
};

export default AddRecipeIngredientTableRow;
