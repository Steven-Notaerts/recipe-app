import { Router } from "@reach/router";
import About from "./pages/About";
import AddRecipe from "./pages/AddRecipe";
import ContactUs from "./pages/ContactUs";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/RecipeDetail";
import Suggestions from "./pages/Suggestions";
import User from "./pages/User";
import UserWeekPlanner from "./pages/UserWeekPlanner";
import UserFavorits from "./pages/UserFavorits";
import { ThemeProvider } from "./utils/context/ThemeContext";
function App() {
  return (
    // <AuthContextProvider>
    <ThemeProvider>
      <Router>
        <Home path="/" />
        <About path="/About" />
        <Recipes path="/Recipes" />
        <RecipeDetail path="/Recipes/:id" />
        <Suggestions path="/Suggestions" />
        <ContactUs path="/ContactUs" />
        <AddRecipe path="/AddRecipe" />
        <AddRecipe path="/AddRecipe/:id" />
        <User path="/User" />
        <UserWeekPlanner path="/UserWeekPlanner" />
        <UserFavorits path="/UserFavorits" />
      </Router>
    </ThemeProvider>
    // </AuthContextProvider>
  );
}

export default App;
