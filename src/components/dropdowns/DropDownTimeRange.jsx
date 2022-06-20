import React, { useEffect } from "react";

export const DropDownTimeRange = ({ timeRange, userInput, onChangeHelper }) => {
  return (
    <select
      name="timeRange"
      defaultValue="Set timerange"
      value={userInput.timeRange}
      onChange={onChangeHelper}
      className="select-main select-main__long"
    >
      {timeRange.map((timeRange) => {
        return (
          <option
            id="timeRange"
            value={timeRange.type}
            key={timeRange.id}
            name="timeRange"
            className="select-main__option"
            required
          >
            {timeRange.type}
          </option>
        );
      })}
    </select>
  );
};
