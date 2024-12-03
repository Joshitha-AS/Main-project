import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoSKc0-O0CB-6DsQHW74dSW41Hnk6lQJs",
  authDomain: "social-media-10a7a.firebaseapp.com",
  projectId: "social-media-10a7a",
  storageBucket: "social-media-10a7a.appspot.com",
  messagingSenderId: "770987768855",
  appId: "1:770987768855:web:6dc441a7491249c8cf3052",
  measurementId: "G-61L75JPTKG",
};

// Initialize Firebase Services
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// DOM Elements
const homeProfilePhoto = document.getElementById("homeProfilePhoto");
const homeUsernameElement = document.getElementById("homeUsername");
const logoutButton = document.getElementById("logout");

// Load User Profile Data
document.addEventListener("DOMContentLoaded", async () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userId = user.uid;
      localStorage.setItem("uid", userId); // Store UID for reuse

      try {
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);
     
        if (userDoc.exists()) {
          const userData = userDoc.data();
          // Update Home Page Profile UI
          homeProfilePhoto.src = userData.profileimg || "default-profile.png"; // Fallback image
          homeUsernameElement.textContent = `@${userData.userName}`;
        } else {
          console.error("No user data found.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    } else {
      console.error("No user is signed in.");
    }
  });
});

// Logout Functionality
if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully.");
        localStorage.removeItem("uid");
        window.location.href = "../index.html"; // Redirect to login page
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  });
}
