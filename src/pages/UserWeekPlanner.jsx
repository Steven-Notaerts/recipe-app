import React, { useState } from "react";

import Header from "../components/header/Header";
import UserSubHeader from "../components/user/UserSubHeader/UserSubHeader";
const UserWeekPlanner = () => {
  const weekdays = [
    {
      day: "Monday",
    },
    {
      day: "Tuesday",
    },
    {
      day: "Wednesday",
    },
    {
      day: "Thursday",
    },
    {
      day: "Friday",
    },
    {
      day: "Saturday",
    },
    {
      day: "Sunday",
    },
  ];
  const [weekPlannerRecipes, setWeekPlannerRecipes] = useState([]);
  return (
    <>
      <Header />
      <UserSubHeader />
      <section className="week-planner">
        <div className="week-planner__container">
          <h2 className="week-planner__title">Week planner</h2>
          <div className="days__container">
            {weekdays.map((day) => {
              return (
                <div>
                  <h3>{day.day}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default UserWeekPlanner;
