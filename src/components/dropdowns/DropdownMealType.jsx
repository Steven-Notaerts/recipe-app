import React from "react";

const DropdownMealType = ({
  mealType,
  userInput,
  setUserInput,
  onChangeHelper,
}) => {
  return (
    <select
      name="mealType"
      defaultValue="Set mealtype"
      value={userInput.mealType}
      onChange={onChangeHelper}
      className="select-main select-main__long"
    >
      {mealType.map((meal) => {
        return (
          <option
            id="mealType"
            value={meal.type}
            key={meal.id}
            name="mealType"
            className="select-main__option"
            required
          >
            {meal.type}
          </option>
        );
      })}
    </select>
  );
};

export default DropdownMealType;
