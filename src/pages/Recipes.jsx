import React from "react";
import Header from "../components/header/Header";
import RecipesSearchSideNav from "../components/Recipes/RecipesSearchSideNav/RecipesSearchSideNav";
import SubHeaderRecipe from "../components/Recipes/SubHeaderRecipe/SubHeaderRecipe";
import SearchRecipe from "../components/SearchRecipe/SearchRecipe";

const Recipes = () => {
  return (
    <>
      <Header />
      <main class="recipes">
        <SubHeaderRecipe />
        <section class="recipes__container">
          <div className="recipes__components">
            <RecipesSearchSideNav />
            <SearchRecipe />
          </div>
        </section>
      </main>
    </>
  );
};

export default Recipes;
