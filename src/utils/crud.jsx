import { initializeApp } from "firebase/app";

import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  where,
  limit,
  query,
  deleteDoc,
  updateDoc,
  FieldValue,
  arrayUnion,
  setDoc,
  setUpdate,
  onSnapshot,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

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

export default app;

const storage = getStorage(app);

// export const uploadFile = async (fileUpload) => {
//   console.log("in uploadfile");
//   if (fileUpload == null) return;
//   try {
//     const imageToUpload = fileUpload;
//     const imageRef = ref(storage, `/recipeImages/${fileUpload.name}`);
//     uploadBytes(imageRef, fileUpload).then((snapshot) => {
//       alert(`uploaded ${fileUpload.name}`);
//       getDownloadURL(snapshot.ref)
//         .then((imageUrl) => {
//           console.log(typeof imageUrl);
//           console.log(imageUrl);
//           return imageUrl;
//         })
//         .then();
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const writeItem = async (userInput) => {
  try {
    // uploadFile();

    // const imageUrlLink = await imageUrl;

    const docRef = await addDoc(collection(db, "recipes/"), {
      information: {
        recipeId: "",
        recipeTitle: userInput.recipeTitle,
        recipeInformation: userInput.recipeInformation,
        mealType: userInput.mealType,
        timeRange: userInput.timeRange,
        difficulty: userInput.difficulty,
        howManyPersons: userInput.howManyPersons / userInput.howManyPersons,
        recipeImage: userInput.recipeImage || "no image", //to add
        recipeImageUrl: userInput.recipeImageUrl || "no image", //to add
        recipeVideo: userInput.recipeVideo || "no video", //to add
        recipeVideoUrl: userInput.recipeVideoUrl || "no video",
      },
      ingredients: {
        ingredient1: {
          ingredientOne: userInput.ingredientOne || null,
          quantityOne: userInput.quantityOne / userInput.howManyPersons || null,
          measurementOne: userInput.measurementOne || null,
          allergensOne: userInput.allergensOne || null,
          unitPriceOne: userInput.unitPriceOne || null,
        },
        ingredient2: {
          ingredientTwo: userInput.ingredientTwo || null,
          quantityTwo: userInput.quantityTwo / userInput.howManyPersons || null,
          measurementTwo: userInput.measurementTwo || null,
          allergensTwo: userInput.allergensTwo || null,
          unitPriceTwo: userInput.unitPriceTwo || null,
        },
        ingredient3: {
          ingredientThree: userInput.ingredientThree || null,
          quantityThree:
            userInput.quantityThree / userInput.howManyPersons || null,
          measurementThree: userInput.measurementThree || null,
          allergensThree: userInput.allergensThree || null,
          unitPriceThree: userInput.unitPriceThree || null,
        },
        ingredient4: {
          ingredientFour: userInput.ingredientFour || null,
          quantityFour:
            userInput.quantityFour / userInput.howManyPersons || null,
          measurementFour: userInput.measurementFour || null,
          allergensFour: userInput.allergensFour || null,
          unitPriceFour: userInput.unitPriceFour || null,
        },
        ingredient5: {
          ingredientFive: userInput.ingredientFive || null,
          quantityFive:
            userInput.quantityFive / userInput.howManyPersons || null,
          measurementFive: userInput.measurementFive || null,
          allergensFive: userInput.allergensFive || null,
          unitPriceFive: userInput.unitPriceFive || null,
        },
        ingredient6: {
          ingredientSix: userInput.ingredientSix || null,
          quantitySix: userInput.quantitySix / userInput.howManyPersons || null,
          measurementSix: userInput.measurementSix || null,
          allergensSix: userInput.allergensSix || null,
          unitPriceSix: userInput.unitPriceSix || null,
        },
        ingredient7: {
          ingredientSeven: userInput.ingredientSeven || null,
          quantitySeven:
            userInput.quantitySeven / userInput.howManyPersons || null,
          measurementSeven: userInput.measurementSeven || null,
          allergensSeven: userInput.allergensSeven || null,
          unitPriceSeven: userInput.unitPriceSeven || null,
        },
        ingredient8: {
          ingredientEight: userInput.ingredientEight || null,
          quantityEight:
            userInput.quantityEight / userInput.howManyPersons || null,
          measurementEight: userInput.measurementEight || null,
          allergensEight: userInput.allergensEight || null,
          unitPriceEight: userInput.unitPriceEight || null,
        },
      },
      preparationMethod: {
        step1: userInput.step1 || null,
        step2: userInput.step2 || null,
        step3: userInput.step3 || null,
        step4: userInput.step4 || null,
        step5: userInput.step5 || null,
        step6: userInput.step6 || null,
        step7: userInput.step7 || null,
        step8: userInput.step8 || null,
      },
      ratings: [],
      comments: [],
    });
  } catch (error) {
    alert("Error adding document: ", error);
  } finally {
    //
  }
};

/*add feedback, rating and typed feedback*/
export const addFeedback = async (id, currentValue, feedback) => {
  //get the document from the database on ID
  const docRef = doc(db, "recipes/", id);

  const docSnap = await getDoc(docRef);

  //check if the document exists with a specified ID.
  if (docSnap.exists()) {
    //if it exists try to add feedback to the array.
    try {
      await updateDoc(docRef, {
        // admin.firestore().FieldValue.arrayUnion() does not work gives multiple errors
        //fixed with arrayUnion
        ratings: arrayUnion(currentValue),
        comments: arrayUnion(feedback),
      });
      //if the document exist, but there is an error on adding the feedback catch the error
    } catch (error) {
      alert(error);
    }
    //if there is no document with the ID specified, alert that there is no document with the specified ID
  } else {
    alert("No such document!");
  }
};

/*add feedback, rating and typed feedback*/
export const addImageUrl = async (id, userInput) => {
  //get the document from the database on ID
  const docRef = doc(db, "recipes/", id);

  const docSnap = await getDoc(docRef);

  //check if the document exists with a specified ID.
  if (docSnap.exists()) {
    //if it exists try to add feedback to the array.
    try {
      await updateDoc(docRef, {
        // admin.firestore().FieldValue.arrayUnion() does not work gives multiple errors
        //fixed with arrayUnion
        recipeImage: userInput.recipeImage,
        recipeImageUrl: userInput.recipeImageUrl,
      });
      //if the document exist, but there is an error on adding the feedback catch the error
    } catch (error) {
      console.log(error);
    }
    //if there is no document with the ID specified, alert that there is no document with the specified ID
  } else {
    console.log("No such document!");
  }
};

//update an excisting document.
export const updateDocument = async (event, id, userInput) => {
  const docRef = doc(db, "recipes/", id);
  const docSnap = await getDoc(docRef);
  console.log(userInput);
  if (docSnap.exists()) {
    try {
      await updateDoc(docRef, {
        information: {
          recipeId: "",
          recipeTitle: userInput.recipeTitle,
          recipeInformation: userInput.recipeInformation,
          mealType: userInput.mealType,
          timeRange: userInput.timeRange,
          difficulty: userInput.difficulty,
          howManyPersons: userInput.howManyPersons / userInput.howManyPersons,
          recipeImage: userInput.recipeImage || null, //to add
          recipeImageUrl: userInput.recipeImageUrl || null, //to add
          recipeVideo: "", //to add
        },
        ingredients: {
          ingredient1: {
            ingredientOne: userInput.ingredientOne || null,
            quantityOne:
              userInput.quantityOne / userInput.howManyPersons || null,
            measurementOne: userInput.measurementOne || null,
            allergensOne: userInput.allergensOne || null,
          },
          ingredient2: {
            ingredientTwo: userInput.ingredientTwo || null,
            quantityTwo:
              userInput.quantityTwo / userInput.howManyPersons || null,
            measurementTwo: userInput.measurementTwo || null,
            allergensTwo: userInput.allergensTwo || null,
          },
          ingredient3: {
            ingredientThree: userInput.ingredientThree || null,
            quantityThree:
              userInput.quantityThree / userInput.howManyPersons || null,
            measurementThree: userInput.measurementThree || null,
            allergensThree: userInput.allergensThree || null,
          },
          ingredient4: {
            ingredientFour: userInput.ingredientFour || null,
            quantityFour:
              userInput.quantityFour / userInput.howManyPersons || null,
            measurementFour: userInput.measurementFour || null,
            allergensFour: userInput.allergensFour || null,
          },
          ingredient5: {
            ingredientFive: userInput.ingredientFive || null,
            quantityFive:
              userInput.quantityFive / userInput.howManyPersons || null,
            measurementFive: userInput.measurementFive || null,
            allergensFive: userInput.allergensFive || null,
          },
          ingredient6: {
            ingredientSix: userInput.ingredientSix || null,
            quantitySix:
              userInput.quantitySix / userInput.howManyPersons || null,
            measurementSix: userInput.measurementSix || null,
            allergensSix: userInput.allergensSix || null,
          },
          ingredient7: {
            ingredientSeven: userInput.ingredientSeven || null,
            quantitySeven:
              userInput.quantitySeven / userInput.howManyPersons || null,
            measurementSeven: userInput.measurementSeven || null,
            allergensSeven: userInput.allergensSeven || null,
          },
          ingredient8: {
            ingredientEight: userInput.ingredientEight || null,
            quantityEight:
              userInput.quantityEight / userInput.howManyPersons || null,
            measurementEight: userInput.measurementEight || null,
            allergensEight: userInput.allergensEight || null,
          },
        },
        preparationMethod: {
          step1: userInput.step1 || null,
          step2: userInput.step2 || null,
          step3: userInput.step3 || null,
          step4: userInput.step4 || null,
          step5: userInput.step5 || null,
          step6: userInput.step6 || null,
          step7: userInput.step7 || null,
          step8: userInput.step8 || null,
        },
        ratings: [],
        comments: [],
      });

      alert(id + " updated");
    } catch (error) {
      alert(error);
    }
  } else {
    alert("No such document!");
  }
};
//read item
export const readItem = async (id) => {
  const docRef = doc(db, "recipes/", id);
  const docSnap = await getDoc(docRef);
  const recipeDetail = [];

  if (docSnap.exists()) {
    recipeDetail.push({ docId: docSnap.id, docData: docSnap.data() });
    //console.log(docSnap.id, docSnap.data());
    return recipeDetail;
  } else {
    // doc.data() will be undefined in this case
    recipeDetail.push("no documents");
    // console.log("No such document!");
    return recipeDetail;
  }
};
//readItem();

//
// export const readFilterdItems = async (recipeSelectSearch) => {
//   let unsub;
//   //console.log(recipeSelectSearch);
//   const queryDocs = query(collection(db, "recipes"));

//   const querySnapshot = await getDocs(queryDocs);
//   const filteredRecipeData = Object.entries(recipeSelectSearch);
//   const recipeData = [];
//   console.log(filteredRecipeData);

//   if (filteredRecipeData.length === 0) {
//     unsub = onSnapshot(ref, (snapshot) => {
//       let results = [];
//       snapshot.docs.forEach((doc) => {
//         recipeData.push({ ...doc.data(), id: doc.id });
//       });
//       // setData(results);
//     });
//   } else {
//     const queries = filteredRecipeData.map(([field, value]) =>
//       // where(field, "in", [value])
//       query(ref, where(field, "in", value))
//     );
//     // let searchQuery = query(ref, ...whereStatements);
//     unsub = onSnapshot(...queries, (snapshot) => {
//       let results = [];
//       snapshot.docs.forEach((doc) => {
//         console.log({ ...doc.data(), id: doc.id });
//         recipeData.push({ ...doc.data(), id: doc.id });
//       });
//       // setData(results);
//     });
//   }
// };

//read all items test with filter
export const readAllItems = async (recipeSelectSearch) => {
  const data = [
    { value: "Breakfast", field: "mealType" },
    { value: "Lunch", field: "mealType" },
  ];
  const filter = Object.entries(data);
  if (filter.length !== 0) {
    const queryDocs = query(collection(db, "recipes"), limit(25));
    const querySnapshot = await getDocs(queryDocs);
    const recipeData = [];
    if (querySnapshot) {
      querySnapshot.forEach((doc) => {
        recipeData.push({ docId: doc.id, docData: doc.data() });
      });
    }
    return recipeData;
  } else {
    const queryDocs = query(collection(db, "recipes"));
    const queries = recipeSelectSearch.map(([field, value]) =>
      // where(field, "in", [value])
      {
        query(queryDocs, where(field, "in", value));
      }
    );
    const querySnapshot = await getDocs(queries);
    const recipeData = [];
    if (querySnapshot) {
      querySnapshot.forEach((doc) => {
        recipeData.push({ docId: doc.id, docData: doc.data() });
      });
    }
    return recipeData;
  }
};

// //read all items
// export const readAllItems = async () => {
//   //TO ADD, where ratings is the highest (order by)
//   const queryDocs = query(collection(db, "recipes"), limit(25));

//   const querySnapshot = await getDocs(queryDocs);
//   const recipeData = [];

//   if (querySnapshot) {
//     querySnapshot.forEach((doc) => {
//       recipeData.push({ docId: doc.id, docData: doc.data() });
//     });
//     return recipeData;
//   } else {
//     recipeData.push("no documents");
//   }
// };

export const readFilterData = async (filterd) => {
  const queryDocs = query(
    collection(db, "recipes"),
    where("information.mealType", "==", filterd)
  );

  const querySnapshot = await getDocs(queryDocs);
  const recipeData = [];
  // console.log(querySnapshot.docs[0]);

  if (querySnapshot) {
    querySnapshot.forEach((doc) => {
      recipeData.push({ docId: doc.id, docData: doc.data() });
      // console.log(doc.id, "=>", doc.data());
    });
    return recipeData;
  } else {
    // doc.data() will be undefined in this case
    recipeData.push("no documents");
    // console.log("No such document!");
  }
};

//delete item on ID
export const deleteRecipe = async (id) => {
  try {
    const deleteDocId = await deleteDoc(doc(db, "recipes/", id));
  } catch (error) {
    console.log(error);
  }
};

export const authentication = getAuth(app);

export function signup(email, password) {
  return createUserWithEmailAndPassword(authentication, email, password);
}

export function logout() {
  return signOut(authentication);
}

export function login(email, password) {
  return signInWithEmailAndPassword(authentication, email, password);
}
