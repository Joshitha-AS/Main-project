import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";
import { 
    getAuth, 
    setPersistence, 
    browserSessionPersistence, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

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
        window.location.href = "./html/home.html";
    } else {
        console.log("No user is logged in"); // Debugging log
    }
});

// Signup Functionality
document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent default form submission
    clearSignupErrors(); // Clear previous error messages

    // Collect form input values
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();
    const username = document.getElementById("username").value.trim();

    // Validate form fields
    if (!email || !password || !username) {
        displaySignupError("All fields are required.");
        return;
    }

    if (password.length < 6) {
        displaySignupError("Password must be at least 6 characters long.");
        return;
    }

    try {
        // Create user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save additional user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
            username: username,
            email: email,
            createdAt: new Date().toISOString(), // Add timestamp for user creation
        });

        console.log("Registration successful:", user);

        // Redirect to home page
        setTimeout(() => {
            window.location.href = "./html/home.html";
        }, 500); // Slight delay for user data to settle

    } catch (error) {
        console.error("Signup error:", error.message);

        // Handle specific Firebase signup errors
        if (error.code === "auth/email-already-in-use") {
            displaySignupError("This email is already in use. Please use a different one.");
        } else if (error.code === "auth/invalid-email") {
            displaySignupError("Please enter a valid email address.");
        } else if (error.code === "auth/weak-password") {
            displaySignupError("Your password is too weak. Use at least 6 characters.");
        } else {
            displaySignupError(error.message);
        }
    }
});

// Login Functionality
document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent default form submission
    clearLoginErrors(); // Clear previous error messages

    // Collect login input values
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    // Validate login fields
    if (!email || !password) {
        displayLoginError("Email and password are required.");
        return;
    }

    try {
        // Attempt to sign in the user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log("Login successful:", user);

        // Redirect to home page
        setTimeout(() => {
            window.location.href = "./html/home.html";
        }, 500);

    } catch (error) {
        console.error("Login error:", error.message);

        // Handle specific Firebase login errors
        if (error.code === "auth/user-not-found") {
            displayLoginError("No user found with this email.");
        } else if (error.code === "auth/wrong-password") {
            displayLoginError("Incorrect password. Please try again.");
        } else {
            displayLoginError(error.message);
        }
    }
});

// Utility: Clear Signup Errors
function clearSignupErrors() {
    document.getElementById("r-emailError").innerText = "";
    document.getElementById("r-textError").innerText = "";
    document.getElementById("r-pswdError").innerText = "";
}

// Utility: Display Signup Errors
function displaySignupError(message) {
    document.getElementById("r-emailError").innerText = message;
}

// Utility: Clear Login Errors
function clearLoginErrors() {
    document.getElementById("loginEmailError").innerText = "";
}

// Utility: Display Login Errors
function displayLoginError(message) {
    document.getElementById("loginEmailError").innerText = message;
}
