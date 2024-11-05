import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
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
const auth = getAuth(app);
const db = getFirestore(app);

// Check if user is already logged in
const userId = localStorage.getItem("userId");
if (userId && userId.length > 0) {
  window.location.href = "/src/index.html";
}

// Registration
document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault(); 
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const username = document.getElementById("username").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: email,
      });
      console.log("User registered:", user);
    })
    .catch((error) => {
      console.error("Error during registration:", error.message);
    });
});

// Login
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem("userId", user.uid);
      console.log("User logged in:", user);

      document.getElementById('logout').style.display = 'block';
      window.location.href = "/src/index.html";
    })
    .catch((error) => {
      console.error("Login error:", error.message);
    });
});

// Logout functionality
document.getElementById('logout').addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      document.getElementById('logout').style.display = 'none';
      localStorage.removeItem("userId"); // Clear the userId from localStorage
      window.location.href = "./login.html";
    })
    .catch((error) => {
      console.error("Logout error:", error.message);
    });
});



