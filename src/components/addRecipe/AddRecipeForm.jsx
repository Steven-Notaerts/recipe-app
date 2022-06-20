import React, { useState, useEffect, useContext } from "react";
import DropDownDifficulty from "../dropdowns/DropDownDifficulty";
import DropdownMealType from "../dropdowns/DropdownMealType";
import AddRecipeIngredientTableRow from "./AddRecipeIngredientTableRow";
import { useParams, navigate } from "@reach/router";

import {
  mealType,
  difficulty,
  ingredientMeasurements,
  initializeAddRecipeData,
  allergensTypes,
  timeRange,
} from "../../utils/data";

import {
  writeItem,
  uploadFile,
  readItem,
  updateDocument,
  addImageUrl,
} from "../../utils/crud";
import { DropDownTimeRange } from "../dropdowns/DropDownTimeRange";

import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { upload } from "@testing-library/user-event/dist/upload";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage(app);

const AddRecipeForm = () => {
  const [userInput, setUserInput] = useState(initializeAddRecipeData);

  const [fileUpload, setFileUpload] = useState("");
  const [videoUpload, setVideoUpload] = useState("");
  const [percent, setPercent] = useState(0);
  const [updateRecipe, setUpdateRecipe] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  //when there is an input change update the state directly
  const onChangeHelper = (event) => {
    setUserInput({
      ...userInput,
      [event.target.name]: event.target.value,
    });
  };
  //when there is an image added, before uploading it it will be stored in fileUpload state
  //function works, images are being uploaded, the image url is added to the userInput state but when writing to database, it doesnt add the image url or image name
  const imageChangeHelper = async (event) => {
    event.preventDefault();
    setFileUpload(event?.target?.files[0]);
  };
  //when there is an video added, before uploading it it will be stored in videoUpload state
  //function works, videos are being uploaded, the video url is added to the userInput state but when writing to database, it doesnt add the video url or video name
  const videoChangeHelper = async (event) => {
    event.preventDefault();
    setVideoUpload(event?.target?.files[0]);
  };

  //reset input fields after submit recipe
  const resetForm = () => {
    // after submit recipe clear the input fields
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    // after submit recipe clear the text areas
    Array.from(document.querySelectorAll("textarea")).forEach(
      (input) => (input.value = "")
    );
    // after submit recipe set the selects to first value
    Array.from(document.querySelectorAll("select")).forEach(
      (input) => (input.selectedIndex = 0)
    );
    //reset the userInput state to initial values (imported from data.jsx)
    setUserInput(initializeAddRecipeData);
    //clear the state for the file uploads
    setFileUpload("");
    setVideoUpload("");
  };

  //update function to run when button update is clicked and set the userInput state to the values from the wanted recipe
  const updateRecipeOnId = async (event, id, userInput) => {
    //when button is clicked to update, add id as parameter and run the readItem function
    const response = await readItem(id);
    setUserInput({
      ...userInput,
      recipeTitle: response[0]?.docData?.information?.recipeTitle,
      recipeInformation: response[0]?.docData?.information?.recipeInformation,
      mealType: response[0]?.docData?.information?.mealType,
      preparationTime: response[0]?.docData?.information?.preparationTime,
      difficulty: response[0]?.docData?.information?.difficulty,
      howManyPersons: response[0]?.docData?.information?.howManyPersons,
      recipeImage: response[0]?.docData?.information?.recipeImage,
      recipeImageUrl: response[0]?.docData?.information?.recipeImageUrl,
      recipeVideo: response[0]?.docData?.information?.recipeVideo, //to add
      recipeVideoUrl: response[0]?.docData?.information?.recipeVideoUrl,

      ingredients: {
        ingredient1: {
          ingredientOne:
            response[0]?.docData?.ingredients?.ingredient1?.ingredientOne,
          quantityOne:
            response[0]?.docData?.ingredients?.ingredient1?.quantityOne,
          measurementOne:
            response[0]?.docData?.ingredients?.ingredient1?.measurementOne,
          allergensOne:
            response[0]?.docData?.ingredients?.ingredient1?.allergensOne,
          unitPriceOne:
            response[0]?.docData?.ingredients?.ingredient1?.unitPriceOne,
        },
        ingredient2: {
          ingredientOne:
            response[0]?.docData?.ingredients?.ingredient2?.ingredientTwo,
          quantityOne:
            response[0]?.docData?.ingredients?.ingredient2?.quantityTwo,
          measurementOne:
            response[0]?.docData?.ingredients?.ingredient2?.measurementTwo,
          allergensOne:
            response[0]?.docData?.ingredients?.ingredient2?.allergensTwo,
          unitPriceOne:
            response[0]?.docData?.ingredients?.ingredient2?.unitPriceTwo,
        },
        ingredient3: {
          ingredientOne:
            response[0]?.docData?.ingredients?.ingredient3?.ingredientThree,
          quantityOne:
            response[0]?.docData?.ingredients?.ingredient3?.quantityThree,
          measurementOne:
            response[0]?.docData?.ingredients?.ingredient3?.measurementThree,
          allergensOne:
            response[0]?.docData?.ingredients?.ingredient3?.allergensThree,
          unitPriceOne:
            response[0]?.docData?.ingredients?.ingredient3?.unitPriceThree,
        },
        ingredient4: {
          ingredientOne:
            response[0]?.docData?.ingredients?.ingredient4?.ingredientFour,
          quantityOne:
            response[0]?.docData?.ingredients?.ingredient4?.quantityFour,
          measurementOne:
            response[0]?.docData?.ingredients?.ingredient4?.measurementFour,
          allergensOne:
            response[0]?.docData?.ingredients?.ingredient4?.allergensFour,
          unitPriceOne:
            response[0]?.docData?.ingredients?.ingredient4?.unitPriceFour,
        },
        ingredient5: {
          ingredientOne:
            response[0]?.docData?.ingredients?.ingredient5?.ingredientFive,
          quantityOne:
            response[0]?.docData?.ingredients?.ingredient5?.quantityFive,
          measurementOne:
            response[0]?.docData?.ingredients?.ingredient5?.measurementFive,
          allergensOne:
            response[0]?.docData?.ingredients?.ingredient5?.allergensFive,
          unitPriceOne:
            response[0]?.docData?.ingredients?.ingredient5?.unitPriceFive,
        },
        ingredient6: {
          ingredientOne:
            response[0]?.docData?.ingredients?.ingredient6?.ingredientSix,
          quantityOne:
            response[0]?.docData?.ingredients?.ingredient6?.quantitySix,
          measurementOne:
            response[0]?.docData?.ingredients?.ingredient6?.measurementSix,
          allergensOne:
            response[0]?.docData?.ingredients?.ingredient6?.allergensSix,
          unitPriceOne:
            response[0]?.docData?.ingredients?.ingredient6?.unitPriceSix,
        },
        ingredient7: {
          ingredientOne:
            response[0]?.docData?.ingredients?.ingredient7?.ingredientSeven,
          quantityOne:
            response[0]?.docData?.ingredients?.ingredient7?.quantitySeven,
          measurementOne:
            response[0]?.docData?.ingredients?.ingredient7?.measurementSeven,
          allergensOne:
            response[0]?.docData?.ingredients?.ingredient7?.allergensSeven,
          unitPriceOne:
            response[0]?.docData?.ingredients?.ingredient7?.unitPriceSeven,
        },
        ingredient8: {
          ingredientOne:
            response[0]?.docData?.ingredients?.ingredient8?.ingredientEight,
          quantityOne:
            response[0]?.docData?.ingredients?.ingredient8?.quantityEight,
          measurementOne:
            response[0]?.docData?.ingredients?.ingredient8?.measurementEight,
          allergensOne:
            response[0]?.docData?.ingredients?.ingredient8?.allergensEight,
          unitPriceOne:
            response[0]?.docData?.ingredients?.ingredient8?.unitPriceEight,
        },
      },

      step1: response[0]?.docData?.preparationMethod?.step1,
      step2: response[0]?.docData?.preparationMethod?.step2,
      step3: response[0]?.docData?.preparationMethod?.step3,
      step4: response[0]?.docData?.preparationMethod?.step4,
      step5: response[0]?.docData?.preparationMethod?.step5,
      step6: response[0]?.docData?.preparationMethod?.step6,
      step7: response[0]?.docData?.preparationMethod?.step7,
      step8: response[0]?.docData?.preparationMethod?.step8,
    });
  };

  useEffect(() => {
    updateRecipeOnId(id, userInput);
  }, []);
  //upload image to firebase sorage
  const uploadImageFile = async (setUserInput, userInput, fileUpload) => {
    try {
      const imageRef = ref(storage, `/recipeImages/${fileUpload.name}`);
      const uploadImage = uploadBytesResumable(imageRef, fileUpload);
      uploadImage.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          // update progress
          setPercent(percent);
        },
        (error) => alert(error),
        async () => {
          // download url
          getDownloadURL(uploadImage.snapshot.ref).then((imageUrl) => {
            console.log(imageUrl);
            setUserInput({
              ...userInput,
              recipeImage: `${fileUpload.name}`,
              recipeImageUrl: imageUrl,
            });
          });
        }
      );
    } catch (error) {
      alert(error);
    }
  };
  //upload video to firebase storage
  const uploadVideoFile = async (setUserInput, userInput, videoUpload) => {
    try {
      const imageRef = ref(storage, `/recipeVideos/${videoUpload.name}`);
      const uploadVideo = uploadBytesResumable(imageRef, videoUpload);
      uploadVideo.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          // update progress
          setPercent(percent);
        },
        (error) => alert(error),
        async () => {
          // download url
          getDownloadURL(videoUpload.snapshot.ref).then((videoUrl) => {
            console.log(videoUrl);
            setUserInput({
              ...userInput,
              recipeImage: `${videoUpload.name}`,
              recipeImageUrl: videoUrl,
            });
          });
        }
      );
    } catch (error) {
      alert(error);
    }
  };

  const updateDocumentOnId = (event, id, userInput) => {
    try {
      event.preventDefault();
      updateDocument(id, userInput);
      navigate(`/Recipes/`);
    } catch (error) {
      alert("error");
    }
  };

  //write a new recipe to database
  const writeDocument = async (event, id) => {
    event.preventDefault();
    //if there is no id
    if (!id) {
      event.preventDefault();
      //try to
      try {
        //upload imagefile
        uploadImageFile(setUserInput, userInput, fileUpload)
          //then upload video
          .then(uploadVideoFile(setUserInput, userInput, videoUpload))
          //then with setTimeOut, to try and wait to get the image/video url
          .then(
            setTimeout(() => {
              writeItem(userInput);
              resetForm();
              navigate(`/Recipes`);
            }, 1000)
          );
      } catch (error) {
        event.preventDefault();
        alert(error);
      }
    }
  };
  return (
    <section className="form-section">
      {id ? (
        <div className="sub-header__container">
          <div>
            <h1 className="sub-header__title">Update Recipe</h1>
            <h2 className="sub-header__sub-title">
              Here you can update a recipe
            </h2>
          </div>

          <div className="sub-header__btn-container">
            <button
              className="sub-header__submit-button btn"
              form="add-recipe"
              onClick={() => {
                navigate(`/Recipes`);
              }}
            >
              cancel update
            </button>
            <button
              className="sub-header__submit-button btn"
              onClick={resetForm()}
            >
              clear form
            </button>
            <button
              className="sub-header__submit-button btn"
              onClick={updateDocumentOnId}
            >
              update recipe
            </button>
          </div>
        </div>
      ) : (
        <div className="sub-header__container">
          <div>
            <h1 className="sub-header__title">Add Recipe</h1>

            <h2 className="sub-header__sub-title">
              Here you can add your great recipe!
            </h2>
          </div>

          <div className="sub-header__btn-container">
            <button
              className="sub-header__submit-button btn"
              type="submit"
              onClick={writeDocument}
            >
              submit recipe
            </button>
          </div>
        </div>
      )}

      <div className="form">
        <form className="form-section__container">
          <div>
            <div className="form-section__information-recipe">
              <h3 className="form-section__title">
                Information about your recipe
              </h3>
              <label htmlFor="" className="form-section__label">
                <span>Title of your recipe:</span>
                <input
                  required
                  type="text"
                  name="recipeTitle"
                  value={userInput?.recipeTitle}
                  onChange={onChangeHelper}
                  className="form-input form-input__long"
                />
              </label>
              <label htmlFor="" className="form-section__label">
                <span>Information About your recipe:</span>
                <input
                  required
                  type="text"
                  name="recipeInformation"
                  value={userInput.recipeInformation}
                  onChange={onChangeHelper}
                  className="form-input form-input__long"
                />
              </label>
              <label htmlFor="" className="form-section__label">
                <span>Meal Type:</span>
                <DropdownMealType
                  mealType={mealType}
                  setUserInput={setUserInput}
                  userInput={userInput}
                  name="mealType"
                  value={userInput.mealType}
                  onChangeHelper={onChangeHelper}
                  required
                />
              </label>
              <label htmlFor="" className="form-section__label">
                <span>Preparation time range:</span>
                <DropDownTimeRange
                  timeRange={timeRange}
                  setUserInput={setUserInput}
                  userInput={userInput}
                  name="timeRange"
                  value={userInput.timeRange}
                  onChangeHelper={onChangeHelper}
                  required
                />
              </label>
              <label htmlFor="" className="form-section__label">
                <span>Difficulty:</span>
                <DropDownDifficulty
                  difficulty={difficulty}
                  setUserInput={setUserInput}
                  userInput={userInput}
                  name="difficulty"
                  onChangeHelper={onChangeHelper}
                  required
                />
              </label>
              <label htmlFor="" className="form-section__label">
                <span>For how many persons is this recipe?</span>
                <input
                  name="howManyPersons"
                  type="number"
                  min="1"
                  value={userInput.howManyPersons}
                  onChange={onChangeHelper}
                  className="form-input form-input__long"
                  required
                />
              </label>
              <label htmlFor="" className="form-section__label">
                <span>
                  Do you have an image of your preparation? upload here!
                </span>
                <label
                  htmlFor="recipeImageUrl"
                  className="form-input__file-label"
                >
                  <input
                    required
                    className="form-input__file"
                    type="file"
                    accept="image/*"
                    name="recipeImage"
                    id="recipeImage"
                    // value={(event) => event?.target?.files[0].name}
                    onChange={imageChangeHelper}
                  />
                </label>
              </label>
              <label htmlFor="recipeVideo" className="form-section__label">
                <span>Do you have an instruction video? upload here!</span>
                <label htmlFor="recipeVideo" className="form-input__file-label">
                  <input
                    className="form-input__file"
                    type="file"
                    accept="video/*"
                    name="recipeVideo"
                    id="recipeVideo"
                    onChange={videoChangeHelper}
                    required
                  />
                </label>
              </label>
            </div>
            <div className="form-section__ingredients">
              <h3 className="form-section__title">Ingrediënts</h3>
              <table>
                <caption className="sr-only">Ingrediënts</caption>

                <tbody>
                  <tr className="table-head">
                    <th className="table-head__row">Ingredient</th>
                    <th className="table-head__row">Quantity</th>
                    <th className="table-head__row">Measurement</th>
                    <th className="table-head__row">Allergenes</th>
                    <th className="table-head__row">Unit price (€)</th>
                  </tr>
                  <AddRecipeIngredientTableRow
                    setUserInput={setUserInput}
                    userInput={userInput}
                    onChangeHelper={onChangeHelper}
                    ingredientMeasurements={ingredientMeasurements}
                    allergensTypes={allergensTypes}
                    initializeAddRecipeData={initializeAddRecipeData}
                    required
                  />
                </tbody>
              </table>
            </div>
          </div>

          <div className="form-section__preparation-method">
            <h3 className="form-section__title">Preparation method</h3>

            <label htmlFor="" className="form-section__label">
              <span>Step 1</span>
              <textarea
                rows="3"
                cols="60"
                value={userInput.step1}
                name="step1"
                onChange={onChangeHelper}
                className="form-input__text-area"
                required
              ></textarea>
            </label>
            <label htmlFor="" className="form-section__label">
              <span>Step 2</span>
              <textarea
                rows="3"
                cols="60"
                value={userInput.step2}
                name="step2"
                onChange={onChangeHelper}
                className="form-input__text-area"
                required
              ></textarea>
            </label>
            <label htmlFor="" className="form-section__label">
              <span>Step 3</span>
              <textarea
                rows="3"
                cols="60"
                value={userInput.step3}
                name="step3"
                onChange={onChangeHelper}
                className="form-input__text-area"
                required
              ></textarea>
            </label>
            <label htmlFor="" className="form-section__label">
              <span>Step 4</span>
              <textarea
                rows="3"
                cols="60"
                value={userInput.step4}
                name="step4"
                onChange={onChangeHelper}
                className="form-input__text-area"
                required
              ></textarea>
            </label>
            <label htmlFor="" className="form-section__label">
              <span>Step 5</span>
              <textarea
                rows="3"
                cols="60"
                value={userInput.step5}
                name="step5"
                onChange={onChangeHelper}
                required
                className="form-input__text-area"
              ></textarea>
            </label>
            <label htmlFor="" className="form-section__label">
              <span>Step 6</span>
              <textarea
                rows="3"
                cols="60"
                value={userInput.step6}
                name="step6"
                onChange={onChangeHelper}
                className="form-input__text-area"
                required
              ></textarea>
            </label>
            <label htmlFor="" className="form-section__label">
              <span>Step 7</span>
              <textarea
                rows="3"
                cols="60"
                value={userInput.step7}
                name="step7"
                onChange={onChangeHelper}
                required
                className="form-input__text-area"
              ></textarea>
            </label>
            <label htmlFor="" className="form-section__label">
              <span>Step 8</span>
              <textarea
                rows="3"
                cols="60"
                value={userInput.step8}
                name="step8"
                onChange={onChangeHelper}
                className="form-input__text-area"
                required
              ></textarea>
            </label>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddRecipeForm;
