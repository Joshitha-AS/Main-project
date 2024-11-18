import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";
import { getAuth, setPersistence, browserSessionPersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

// Firebase configuration
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

// Set Firebase Auth Persistence to session
setPersistence(auth, browserSessionPersistence)
    .then(() => {
        console.log("Session persistence set.");
    })
    .catch((error) => {
        console.error("Error setting persistence:", error.message);
    });

// Redirect if the user is already logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is logged in:", user); // Debugging log
        window.location.href = "./home-page/home.html";
    } else {
        console.log("No user is logged in"); // Debugging log
    }
});

// Registration
document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    document.getElementById("r-emailError").innerText = ""; // Clear any previous error messages
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
        
        console.log("Registration successful, redirecting to home page..."); // Debugging log
        window.location.href = "./home-page/home.html";
    } catch (error) {
        console.error("Error during registration:", error.message);
    }
});

// Login
document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    document.getElementById("loginEmailError").innerText = ""; // Clear any previous error messages
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        console.log("Login successful, redirecting to home page..."); // Debugging log
        window.location.href = "./home-page/home.html";
    } catch (error) {
        console.error("Login error:", error.message);
    }
});
