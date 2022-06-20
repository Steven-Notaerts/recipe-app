import React, { useEffect, useContext } from "react";

import { ThemeContext } from "../../utils/context/ThemeContext";

const Hero = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  let today = new Date();
  let actualHour = today.getHours();
  let greeting;
  //6 pm
  if (actualHour >= 18) {
    greeting = "Good Evening!";
    //12pm
  } else if (actualHour >= 12) {
    greeting = "Good Afternoon!";
    // 00:00 midnight
  } else if (actualHour >= 0) {
    greeting = "Good morning!";
  } else {
    greeting = "Welcome!";
  }

  return (
    <section className={`hero${darkMode ? "-dark" : ""}`}>
      <div className="hero__container">
        {/* <h1 className="hero__main-title">For The Love Of Food {greeting}</h1> */}
        <h1 className="hero__main-title">{greeting}</h1>
        <p className="hero__description">
          Tasty and by association… yummy! It is delicious, flavorsome, full of
          flavor, appetizing, scrumptious, probably fresh and juicy, making a
          succulent meal, a kid would say finger licking good. Apply to food and
          dishes full of bite, piquancy, zing, zest and relish. It will never be
          dull or tasteless, disgusting, gross or nauseating.
        </p>
      </div>
    </section>
  );
};

export default Hero;
