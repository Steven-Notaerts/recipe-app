import React from "react";

const SelectDifficulty = ({ difficulty, handleSelectState }) => {
  const selectedFilterData = localStorage.getItem("search-params") || [];
  return (
    <div className="search-navigation__difficulty">
      <h2 className="search-navigation__sub-title">Difficulty</h2>
      {difficulty.map((difficulty) => {
        if (difficulty.type === "Set difficulty") {
          return;
        } else {
          return (
            <label htmlFor="" className="select-label" key={difficulty.id}>
              {selectedFilterData.includes(difficulty.type) ? (
                <input
                  type="checkbox"
                  name="difficulty"
                  value={difficulty.type}
                  onChange={handleSelectState}
                  checked
                  className="select"
                />
              ) : (
                <input
                  type="checkbox"
                  name="difficulty"
                  value={difficulty.type}
                  onChange={handleSelectState}
                  className="select"
                />
              )}

              <span> {difficulty.type} </span>
            </label>
          );
        }
      })}
    </div>
  );
};

export default SelectDifficulty;
