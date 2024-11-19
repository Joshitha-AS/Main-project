import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Your Firebase config object
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

// Initialize Firestore
const db = getFirestore(app);

// Reference to your Firestore collection
const collectionRef = collection(db, "userData");

// Fetch data using getDocs (modular API)
getDocs(collectionRef)
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      
      // Extract fields from document
      const name = data.name || "N/A";  // User's name
      const role = data.role || "N/A";  // User's role
      const email = data.email || "N/A"; // User's email
      const comments= data.comments|| "N/A"; 
      const feed= data.postFeed|| "N/A";
      
      // Create a container for the user data
      const userDiv = document.createElement("div");
      userDiv.classList.add("user");
      userDiv.style.height="400px";
      userDiv.style.marginBottom="20px"
      userDiv.style.backgroundColor="#f8f9fa"


      // Add name, role, and email in separate <p> tags
      const nameP = document.createElement("p");
      nameP.textContent = `Name: ${name}`;
      
      const roleP = document.createElement("p");
      roleP.textContent = `Role: ${role}`;
      
      const emailP = document.createElement("p");
      emailP.textContent = `Email: ${email}`;

      const commentsP = document.createElement("p");
      commentsP.textContent = `Comments: ${comments}`;

      const feedP = document.createElement("img");
      feedP.textContent = `Feed: ${feed}`;

      // Append all <p> tags to the user container
      userDiv.appendChild(nameP);
      userDiv.appendChild(roleP);
      userDiv.appendChild(emailP);
      userDiv.appendChild(commentsP);
      userDiv.appendChild(feedP);

      // Append the user container to the main container
      document.getElementById("postContainer").appendChild(userDiv);
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
