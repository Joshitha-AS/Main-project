import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
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

// Redirect user to homepage if they are already logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        localStorage.setItem("userId", user.uid);
        window.location.href = "./home-page/home.html";
    }
});

// Registration
document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const username = document.getElementById("username").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Add user data to Firestore
        await setDoc(doc(db, "users", user.uid), {
            username: username,
            email: email,
        });
        
        // Store user ID and redirect
        localStorage.setItem("userId", user.uid);
        window.location.href = "./home-page/home.html";
    } catch (error) {
        console.error("Error during registration:", error.message);
        document.getElementById("r-emailError").innerText = error.message;
    }
});

// Login
document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Store user ID and redirect
        localStorage.setItem("userId", user.uid);
        window.location.href = "./home-page/home.html";
    } catch (error) {
        console.error("Login error:", error.message);
        document.getElementById("loginEmailError").innerText = error.message;
    }
});

// Ensure the logout button displays only when a user is logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
      document.getElementById("logout").style.display = "block";
  } else {
      document.getElementById("logout").style.display = "none";
  }
});

// Logout functionality
document.getElementById("logout").addEventListener("click", async function () {
  try {
      await signOut(auth);
      localStorage.removeItem("userId"); // Clear userId from local storage
      console.log("User successfully logged out.");
      window.location.href = "./login-page/login.html"; // Redirect to login page
  } catch (error) {
      console.error("Logout error:", error.message);
  }
});;