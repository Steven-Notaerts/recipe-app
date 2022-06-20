import React from "react";

const SelectPreparationTime = ({ timeRange, handleSelectState }) => {
  const selectedFilterData = localStorage.getItem("search-params") || [];
  return (
    <div className="search-navigation__preptime">
      <h2 className="search-navigation__sub-title">Time range</h2>
      {timeRange.map((timeRange) => {
        if (timeRange.type === "Set time range") {
          return;
        } else {
          return (
            <label htmlFor="" key={timeRange.id} className="select-label">
              {selectedFilterData.includes(timeRange.type) ? (
                <input
                  type="checkbox"
                  name="timeRange"
                  value={timeRange.type}
                  onChange={handleSelectState}
                  checked
                  className="select"
                />
              ) : (
                <input
                  type="checkbox"
                  name="timeRange"
                  value={timeRange.type}
                  onChange={handleSelectState}
                  className="select"
                />
              )}
              <span> {timeRange.type}</span>
            </label>
          );
        }
      })}
    </div>
  );
};

export default SelectPreparationTime;
