// import React, { useState, useEffect } from "react";

// const IngredientApiList = () => {
//   const [ingredientList, setIngredientList] = useState("");
//   async function ingredientListFunction() {
//     console.log(`${process.env.REACT_APP_INGREDIENT_API_URL}`);
//     try {
//       const response = await fetch(
//         "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
//       );
//       const data = await response.json();
//       console.log(data);
//       console.log(data.meals[0].strIngredient);
//       setIngredientList(data);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     ingredientListFunction();
//   }, []);

//   return ingredientList;
// };

// export default IngredientApiList;

//export default IngredientApiList = () => {};
