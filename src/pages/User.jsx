import React, { useContext, useEffect, useState } from "react";
import Header from "../components/header/Header";
import AddRecipe from "./AddRecipe";
import { Link } from "@reach/router";
import UserLogin from "../components/user/userLogin/UserLogin";
import UserSubHeader from "../components/user/UserSubHeader/UserSubHeader";
import { UserSignUp } from "../components/user/userLogin/UserSignUp";

const User = () => {
  return (
    <>
      <Header />

      <UserLogin />
    </>
  );
};

export default User;
