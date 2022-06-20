import React, { useState } from "react";

import { mealType, difficulty, timeRange } from "../../../utils/data";
import SelectDifficulty from "../../selects/SelectDifficulty";
import SelectMealType from "../../selects/SelectMealType";
import SelectPreparationTime from "../../selects/SelectPreparationTime";

import useRecipeSearchFilter from "../../../utils/hooks/useRecipeSearchFilter";

const RecipesSearchSideNav = () => {
  const [handleSelectState, clearFilters] = useRecipeSearchFilter();

  return (
    <sidenav className="search-navigation">
      <div className="search-navigation__container">
        <SelectMealType
          mealType={mealType}
          handleSelectState={handleSelectState}
        />
        <SelectPreparationTime
          timeRange={timeRange}
          handleSelectState={handleSelectState}
        />
        <SelectDifficulty
          difficulty={difficulty}
          handleSelectState={handleSelectState}
        />
        <button onClick={clearFilters} className="btn">
          clear filters
        </button>
      </div>
    </sidenav>
  );
};

export default RecipesSearchSideNav;
