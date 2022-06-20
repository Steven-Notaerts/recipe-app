import React, { useEffect } from "react";
import { ingredientList } from "../../api/IngredientApiList";

const DropdownIngredientMeasurement = ({
  ingredientMeasurements,
  onChangeHelper,
}) => {
  return (
    <>
      {ingredientMeasurements.map((Measurement) => {
        return (
          <option
            value={Measurement.type}
            key={Measurement.id}
            className="select-main__option"
            required
          >
            {Measurement.type}
          </option>
        );
      })}
    </>
  );
};

export default DropdownIngredientMeasurement;
