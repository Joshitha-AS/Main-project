const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  addDoc,
} = require("firebase/firestore");
const fs = require("fs").promises;
const firebaseConfig = {
  apiKey: "AIzaSyBoSKc0-O0CB-6DsQHW74dSW41Hnk6lQJs",
  authDomain: "social-media-10a7a.firebaseapp.com",
  projectId: "social-media-10a7a",
  storageBucket: "social-media-10a7a.appspot.com",
  messagingSenderId: "770987768855",
  appId: "1:770987768855:web:6dc441a7491249c8cf3052",
  measurementId: "G-61L75JPTKG",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// JSON data array
async function loadJsonAndPushToFirestore() {
  try {
    const data = await fs.readFile("./config.json");
    const users = JSON.parse(data);
    const userCollection = collection(db, "userData");
    for (const user of users) {
      await addDoc(userCollection, user);
      console.log(`User ${user.name} added successfully.`);
    }
  } catch (error) {
    console.error("Error adding data to Firestore:", error);
  }
}
loadJsonAndPushToFirestore();
