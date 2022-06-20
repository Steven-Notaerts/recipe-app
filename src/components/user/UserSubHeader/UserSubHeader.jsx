import React from "react";
import { navigate } from "@reach/router";

const UserSubHeader = () => {
  return (
    <section className="user-sub-header">
      <div className="user-sub-header__container">
        <button
          className="user-sub-header__button btn hover-btn"
          onClick={() => {
            navigate(`/AddRecipe`);
          }}
        >
          Add recipe
        </button>
        <button
          className="user-sub-header__button btn hover-btn"
          onClick={() => {
            navigate(`/UserWeekPlanner`);
          }}
        >
          Go to weekplanner
        </button>
      </div>
    </section>
  );
};

export default UserSubHeader;
