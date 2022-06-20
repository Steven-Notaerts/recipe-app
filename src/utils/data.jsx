export const routeData = [
  {
    id: 1,
    url: "/",
    text: "Home",
    subRoutes: [],
  },
  {
    id: 2,
    url: "/Recipes",
    text: "Recipes",
    subRoutes: [],
  },

  {
    id: 3,
    url: "/User",
    text: "User",
    subRoutes: [],
  },
];

export const mealType = [
  { id: 1, type: "Set mealtype" },
  { id: 2, type: "Breakfast" },
  { id: 3, type: "Brunch" },
  { id: 4, type: "Lunch" },
  { id: 5, type: "Dinner" },
  { id: 6, type: "Dessert" },
  { id: 7, type: "Snack" },
];

export const difficulty = [
  { id: 1, type: "Set difficulty" },
  { id: 2, type: "Easy" },
  { id: 3, type: "Medium" },
  { id: 4, type: "Hard" },
];

export const ingredientMeasurements = [
  { id: 1, type: "Set measurement" },
  { id: 2, type: "teaspoon(s)" },
  { id: 3, type: "tablespoon(s)" },
  { id: 4, type: "cup" },
  { id: 5, type: "gram" },
  { id: 6, type: "milliliter" },
  { id: 7, type: "piece" },
];

export const allergensTypes = [
  { id: 1, type: "none" },
  { id: 2, type: "Milk" },
  { id: 3, type: "Eggs" },
  { id: 4, type: "Fish" },
  { id: 5, type: "Shellfish" },
  { id: 6, type: "Tree nuts" },
  { id: 7, type: "Peanuts" },
  { id: 8, type: "Wheat" },
  { id: 9, type: "Soybeans" },
];

export const timeRange = [
  { id: 1, type: "Set time range" },
  { id: 2, type: "0 - 20 min" },
  { id: 3, type: "20 - 40 min" },
  { id: 4, type: "40 - 60 min" },
  { id: 5, type: "+ 60 min" },
];

export const initializeAddRecipeData = {
  recipeId: null,
  recipe: {
    information: {
      recipeTitle: "",
      recipeInformation: "",
      mealType: "",
      preparationTime: null,
      difficulty: "",
      howManyPersons: null,
      recipeImage: "",
      recipeImageUrl: "",
      recipeVideo: "",
      recipeVideoUrl: "",
    },
    ingredients: {
      ingredient1: {
        ingredientOne: "",
        quantityOne: null,
        measurementOne: "",
        allergensOne: "",
        unitPriceOne: "",
      },
      ingredient2: {
        ingredientTwo: "",
        quantityTwo: null,
        measurementTwo: "",
        allergensTwo: "",
        unitPriceTwo: "",
      },
      ingredient3: {
        ingredientThree: "",
        quantityThree: null,
        measurementThree: "",
        allergensThree: "",
        unitPriceThree: "",
      },
      ingredient4: {
        ingredientFour: "",
        quantityFour: null,
        measurementFour: "",
        allergensFour: "",
        unitPriceFour: "",
      },
      ingredient5: {
        ingredientFive: "",
        quantityFive: null,
        measurementFive: "",
        allergensFive: "",
        unitPriceFive: "",
      },
      ingredient6: {
        ingredientSix: "",
        quantitySix: null,
        measurementSix: "",
        allergensSix: "",
        unitPriceSix: "",
      },
      ingredient7: {
        ingredientSeven: "",
        quantitySeven: "",
        measurementSeven: "",
        allergensSeven: "",
        unitPriceSeven: "",
      },
      ingredient8: {
        ingredientEight: "",
        quantityEight: null,
        measurementEight: "",
        allergensEight: "",
        unitPriceEight: "",
      },
    },
    preparationMethod: {
      step1: "",
      step2: "",
      step3: "",
      step4: "",
      step5: "",
      step6: "",
      step7: "",
      step8: "",
    },
    ratings: [],
    comments: [],
  },
};
