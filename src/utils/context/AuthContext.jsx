import { onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect, useState, createContext } from "react";
import { authentication } from "../crud";

export const AuthContextUser = createContext(AuthContext);

export function AuthContext() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(authentication, (user) => {
      setCurrentUser(user);
      return unsub;
    });
  }, []);
  return currentUser;
  // return (
  //   <AuthContext.Provider value={currentUser}>
  //     {props.children}
  //   </AuthContext.Provider>
  // );
}

export function AuthContextProvider({ props, currentUser }) {
  return (
    <AuthContext.Provider value={currentUser}>
      {props.children}
    </AuthContext.Provider>
  );
}
