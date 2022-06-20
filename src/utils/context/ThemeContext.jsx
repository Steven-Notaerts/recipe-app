import React, { useContext, useReducer, createContext } from "react";

export const ThemeContext = createContext();

const initialState = { darkMode: false };

export const themeReducer = (state, action) => {
  switch (action.type) {
    case "LIGHTMODE":
      return { darkMode: false, checked: false };
    case "DARKMODE":
      return { darkMode: true, checked: true };
    default:
      return state;
  }
};

export function ThemeProvider(props) {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  return (
    <ThemeContext.Provider value={{ state: state, dispatch: dispatch }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
