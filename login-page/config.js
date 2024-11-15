import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-storage.js";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBoSKc0-O0CB-6DsQHW74dSW41Hnk6lQJs",
  authDomain: "social-media-10a7a.firebaseapp.com",
  projectId: "social-media-10a7a",
  storageBucket: "social-media-10a7a.appspot.com",
  messagingSenderId: "770987768855",
  appId: "1:770987768855:web:6dc441a7491249c8cf3052",
  measurementId: "G-61L75JPTKG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadJsonData() {
    try {
        const response = await fetch('../config.json');
        const data = await response.json();
        await uploadToFirestore(data);
    } catch (error) {
        console.error("Error fetching JSON:", error);
    }
}
async function uploadToFirestore(data) {
    for (const item of data) {
        try {
            // Use `setDoc` with a unique ID for each document
            const docRef = doc(db, "placeholder", `user_${item.id}`);
            await setDoc(docRef, item);
            console.log('Document added:', item);
        } catch (error) {
            console.error('Error adding document:', error);
        }
    }
}
loadJsonData();


// Reference to Firestore collection
const questionsCollection = db.collection("../config.json");

// Function to fetch and display data
function fetchAndDisplayQuestions() {
  questionsCollection.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // Each doc represents a question
      const questionData = doc.data();
      displayQuestion(questionData); // Pass data to display function
    });
  }).catch((error) => {
    console.error("Error fetching data: ", error);
  });
}

// Function to render question on the page
function displayQuestion(data) {
  const questionContainer = document.getElementById("questionContainer");
  
  // Create HTML elements to display the question data
  const questionElement = document.createElement("div");
  questionElement.classList.add("question-item");
  questionElement.innerHTML = `
    <h3>${data.title}</h3>
    <p>${data.description}</p>
  `;

  // Append the question to the container
  questionContainer.appendChild(questionElement);
}

// Call the fetch function on page load
window.onload = fetchAndDisplayQuestions;
