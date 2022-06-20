import React, { useRef, useState } from "react";
import { AuthContext } from "../../../utils/context/AuthContext";

import { authentication, signup, logout, login } from "../../../utils/crud";

import UserSubHeader from "../UserSubHeader/UserSubHeader";

const UserLogin = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const currentUser = AuthContext();
  async function handleSignUp() {
    setLoading(true);
    try {
      await signup(emailRef.current.value, passwordRef.current.value);
      setError("");
    } catch (error) {
      return setError("You allready have a account", error.message);
    }
    setLoading(false);
  }
  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
      setError("");
    } catch (error) {
      return setError("error on login out", error.message);
    }
    setLoading(false);
  }

  async function handleLogin() {
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      setError("");
    } catch (error) {
      return setError("error on sign in", error.message);
    }
  }

  return (
    <section className="user-section">
      <div className="user">
        <div className="user__user-container">
          <span className="user_name">
            currently logged in as: {currentUser?.email}{" "}
          </span>
          {!currentUser ? (
            <div>
              <label htmlFor="email" className="user__label">
                <span>email:</span>
                <input
                  type="email"
                  ref={emailRef}
                  name="email"
                  id="email"
                  required
                />
              </label>
              <label htmlFor="password" className="user__label">
                <span>password:</span>
                <input
                  type="password"
                  name="password"
                  id="password"
                  ref={passwordRef}
                  required
                />
              </label>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        <div className="user__button-container">
          <button
            className="btn user__button"
            disabled={loading || currentUser}
            onClick={handleSignUp}
          >
            signup
          </button>
          <button
            className="btn user__button"
            disabled={loading || currentUser}
            onClick={handleLogin}
          >
            login
          </button>
          <button
            className="btn user__button"
            disabled={loading || !currentUser}
            onClick={handleLogout}
          >
            sign out
          </button>
        </div>

        {error ? <div>{error}</div> : <div></div>}
      </div>
      {currentUser ? <UserSubHeader /> : <div></div>}
    </section>
  );
};

export default UserLogin;
