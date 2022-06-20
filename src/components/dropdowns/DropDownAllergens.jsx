import React from "react";

const DropDownAllergens = ({ allergensTypes, onChangeHelper }) => {
  return (
    <>
      {allergensTypes.map((allergen) => {
        return (
          <option
            className="select-main__option"
            key={allergen.id}
            name="allergen"
            value={allergen.type}
            required
          >
            {allergen.type}
          </option>
        );
      })}
    </>
  );
};

export default DropDownAllergens;
