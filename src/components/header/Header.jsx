import React, { useState, useContext } from "react";
import tastyBites from "../../assets/image/tasty-bites.png";
import { routeData } from "../../utils/data";
import { Link } from "@reach/router";

import { ThemeContext } from "../../utils/context/ThemeContext";

const Header = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const onClick = () => {
    if (darkMode) theme.dispatch({ type: "LIGHTMODE" });
    else theme.dispatch({ type: "DARKMODE" });
  };

  return (
    //className="header"
    <header className={`header${darkMode ? "-dark" : ""}`}>
      <div className={`header${darkMode ? "-dark__container" : "__container"}`}>
        <img
          src={tastyBites}
          alt=""
          className={`header${darkMode ? "-dark__logo-img" : "__logo-img"}`}
        />
        <nav className={`navigation${darkMode ? "-dark" : ""}`}>
          <ul className={`navigation${darkMode ? "-dark__list" : "__list"}`}>
            {routeData.map((route) => {
              const { id, url, text } = route;
              return (
                <Link
                  to={url}
                  key={id}
                  path="/Recipes"
                  className={`navigation${
                    darkMode ? "-dark__list-item" : "__list-item"
                  }`}
                >
                  {text}
                </Link>
              );
            })}
          </ul>
        </nav>

        <div className="navigation-button">
          <button class="theme-switch__input" onClick={onClick}>
            switch color
          </button>
          <input
            type="checkbox"
            id="themeSwitch"
            name="theme-switch"
            class="theme-switch__input"
            onClick={onClick}
            checked={theme.state.checked}
          />
          <label for="themeSwitch" class="theme-switch__label">
            <span></span>
          </label>
        </div>
      </div>
    </header>
  );
};

export default Header;
