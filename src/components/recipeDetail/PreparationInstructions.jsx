import React from "react";

const PreparationInstructions = ({ recipepreparationMethod }) => {
  return (
    <>
      {Object.entries(recipepreparationMethod)
        .sort((a, b) => (a[0] > b[0] ? 1 : -1))
        .map((item) => {
          return (
            <li className="preparation-instructions__list-item">
              <span className="preparation-instructions__step">{item[0]}</span>
              <span className="preparation-instructions__instruction">
                {item[1]}
              </span>
            </li>
          );
        })}
    </>
  );
};

export default PreparationInstructions;
