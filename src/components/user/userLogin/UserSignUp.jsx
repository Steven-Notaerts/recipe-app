import React, { useRef, useState, useContext } from "react";
import { AuthProvider } from "../../../utils/context/AuthContext";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { authentication } from "../../../utils/crud";

export const UserSignUp = ({ children, AuthContext }) => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const passwordConfirmRef = useRef("");
  const [user, setUser] = useState({});
  const [error, setError] = useState();

  onAuthStateChanged(authentication, (currentUser) => {
    setUser(currentUser);
  });

  const handleSubmit = async (event) => {
    //event.preventDefault();
    const emailCheck =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //console.log(emailCheck.test(emailRef.current.value));
    if (
      emailCheck.test(emailRef.current.value) === false ||
      passwordRef.current.value !== passwordConfirmRef.current.value
    ) {
      event.preventDefault();
      setError("please check your values, email or password contains errors");
      return;
    }
    try {
      const user = await createUserWithEmailAndPassword(
        authentication,
        emailRef.current.value,
        passwordRef.current.value
      );
      console.log("user " + emailRef.current.value);
    } catch (error) {
      return setError(
        "please check your values, email or password contains errors",
        error.message
      );
    }
  };

  const value = {
    user,
  };

  return (
    <div>
      <h2>sign up</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            <span>email:</span>
            <input
              type="email"
              ref={emailRef}
              name="email"
              id="email"
              required
            />
          </label>
          <label htmlFor="password">
            <span>password:</span>
            <input
              type="password"
              name="password"
              id="password"
              ref={passwordRef}
              required
            />
          </label>
          <label htmlFor="password">
            <span>password confirmation:</span>
            <input
              type="password"
              name="password"
              id="password"
              ref={passwordConfirmRef}
              required
            />
          </label>
          <button type="submit">sign up</button>
        </form>
        {error ? <div>{error}</div> : <div></div>}
      </div>
    </div>
  );
};
