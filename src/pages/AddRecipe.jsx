import React, { useState } from "react";
import Header from "../components/header/Header";
import AddRecipeForm from "../components/addRecipe/AddRecipeForm";

const AddRecipe = () => {
  return (
    <>
      <Header />
      <main className="add-recipe">
        <AddRecipeForm />
      </main>
    </>
  );
};

export default AddRecipe;
