import React from "react";

const SelectMealType = ({ mealType, handleSelectState }) => {
  const selectedFilterData = localStorage.getItem("search-params") || [];

  return (
    <div className="search-navigation__dishtype">
      <h2 className="search-navigation__sub-title">Dish type</h2>
      {mealType.map((meal) => {
        if (meal.type === "Set mealtype") {
          return;
        } else {
          return (
            <label htmlFor="" key={meal.id} className="select-label">
              {selectedFilterData.includes(meal.type) ? (
                <input
                  type="checkbox"
                  name="mealType"
                  value={meal.type}
                  onChange={handleSelectState}
                  checked
                  className="select"
                />
              ) : (
                <input
                  type="checkbox"
                  name="mealType"
                  value={meal.type}
                  onChange={handleSelectState}
                  className="select"
                />
              )}
              <span> {meal.type}</span>
            </label>
          );
        }
      })}
    </div>
  );
};

export default SelectMealType;
