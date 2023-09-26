// Import the functions you need from the SDKs you need
import { error } from "console";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  get,
  set,
  child,
  update,
  remove,
  push,
} from "firebase/database"; // Update the import path
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDscs4ioSqjWZcTIIstbDY7NWLh7MkKvAM",
  authDomain: "gas-detection-v1-752ab.firebaseapp.com",
  databaseURL:
    "https://gas-detection-v1-752ab-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gas-detection-v1-752ab",
  storageBucket: "gas-detection-v1-752ab.appspot.com",
  messagingSenderId: "317745662932",
  appId: "1:317745662932:web:bbd2da0655949338b5e441",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Creating object for getDatabase function
const db = getDatabase(app);

// Creating global variable to get latest data from realtime database
let realtimeDatabaseData;

// Creating global variable to keep record of length of root node
let SIZE_OF_ROOT = 0;

// Global variable to prevent duplicate parent node creation
let SAME_EVENT = false;

// Function to Insert data
async function InsertData(numberOfEvent) {
  // set function to insert data into realtime DB
  // set(ref(db, "GasSensorValues/" + numberOfEvent), {
  //   data,
  // })
  //   .then(() => {
  //     console.log("Data inserted succesfully");
  //   })
  //   .catch((error) => {
  //     console.log("Error: ", error);
  //   });

  // calling push function
  for (let i = 0; i < 5; i++) {
    // data to be used
    let data = {
      mq2Value: i,
    };

    push(ref(db, "GasSensorValues/" + numberOfEvent), data); // firebase push function
    await new Promise((resolve) => setTimeout(resolve, 500)); // Delay for 0.5 seconds
  }
}

// Function to Update data

// Function to Read data
async function SelectData() {
  const dbref = ref(db); // Creating reference for Database

  try {
    const snapshot = await get(child(dbref, "GasSensorValues/")); // Calling get function with required Node

    // Checking if the specified Node exists or not
    if (snapshot.exists()) {
      const resultData = snapshot.val();
      // console.log("Result Data: ", resultData);
      return resultData; // Return response from function
    } else {
      console.log("No data found");
      return null;
    }
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}

// Main function to call the required functions sequentially
async function main() {
  // Check if the function call is in the same event or not
  if (!SAME_EVENT) {
    // Calling SelectData function
    realtimeDatabaseData = await SelectData();
  }

  // Printing global realtimeDatabaseData
  console.log("Database Data: ", realtimeDatabaseData);
  //console.log("Size of node: ", realtimeDatabaseData.length);

  console.log("SAME_EVENT: ", SAME_EVENT);

  // Calculating size of root node
  SIZE_OF_ROOT = realtimeDatabaseData.length;
  console.log("SIZE_OF_ROOT: ", SIZE_OF_ROOT);

  // Setting SAME_EVENT to be true
  SAME_EVENT = true;
  console.log("SAME_EVENT: ", SAME_EVENT);

  if (SAME_EVENT) {
    // Calling InsertData function
    InsertData(SIZE_OF_ROOT);
  }
}

// Calling InsertData function
// InsertData();

// Calling main function
main();
