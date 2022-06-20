import React, { useState, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import useDeleteKeyFromLocalStorage from "./useDeleteKeyFromLocalStorage";
import { readFilterdItems } from "../crud";
export default function useRecipeSearchFilter() {
  const [recipeSelectSearch, setRecipeSelectSearch] = useState([]);
  //   const [localStorageData, setLocalStorageData] = useLocalStorage(
  //     "search-params",
  //     ""
  //   );
  const handleSelectState = (event) => {
    //   let statusChecked = [...recipeSelectSearch];
    //   if (event.target.checked) {
    //     statusChecked = [
    //       ...recipeSelectSearch,
    //       { value: event.target.value, field: event.target.name },
    //     ];
    //     setRecipeSelectSearch(statusChecked);
    //   } else {
    //     statusChecked.splice(statusChecked.indexOf(event.target.value), 1);
    //     setRecipeSelectSearch(statusChecked);
    //   }
    //   localStorage.setItem("search-params", JSON.stringify(...[statusChecked]));
    //   // setRecipeSelectSearch(statusChecked);
    //   //  return recipeSelectSearch;
    //   //readFilterdItems(recipeSelectSearch);
    // };
    // console.log(recipeSelectSearch);

    const selectedName = event.target.name;
    if (event.target.checked) {
      // if checkboxes are being checked
      setRecipeSelectSearch({
        // we spread selectedFilters to preserve already selected filters
        ...recipeSelectSearch,
        // check if selectedName is already present in selectedFilters
        [selectedName]: recipeSelectSearch[selectedName]
          ? // if so we added the newly selected value to the existing array in the selectedFilters
            // if not we initialise a new array with the selected value
            recipeSelectSearch[selectedName].concat(event.target.value)
          : [event.target.value],
      });
    } else {
      // if checkboxes are being deselected
      // we calculate the new values of the selectedName by removing the selected value
      const newValues = recipeSelectSearch[selectedName].filter(
        (value) => value !== event.target.value
      );
      // we spread selectedFilters to preserve already selected filters
      const newFilters = { ...recipeSelectSearch, [selectedName]: newValues };
      // if the new values are an empty array we need to remove the selectedName from the selectedFilters
      // because firebase doesn't allow an empty array in it's compound queries
      if (newValues.length === 0) {
        delete newFilters[selectedName];
      }
      setRecipeSelectSearch(newFilters);
    }
    console.log(recipeSelectSearch);
  };

  const clearFilters = () => {
    setRecipeSelectSearch([]);
    document
      .querySelectorAll("input[type=checkbox]")
      .forEach((checkbox) => (checkbox.checked = false));
    localStorage.removeItem("search-params");
  };

  return [handleSelectState, clearFilters, recipeSelectSearch];
}
