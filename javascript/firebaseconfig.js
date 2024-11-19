import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";
import {
    getAuth,
    setPersistence,
    browserSessionPersistence,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBoSKc0-O0CB-6DsQHW74dSW41Hnk6lQJs",
    authDomain: "social-media-10a7a.firebaseapp.com",
    projectId: "social-media-10a7a",
    storageBucket: "social-media-10a7a.appspot.com",
    messagingSenderId: "770987768855",
    appId: "1:770987768855:web:6dc441a7491249c8cf3052",
    measurementId: "G-61L75JPTKG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Set Firebase Auth Persistence to session
setPersistence(auth, browserSessionPersistence)
    .then(() => console.log("Session persistence set."))
    .catch((error) => console.error("Error setting persistence:", error.message));

// Redirect if the user is already logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is logged in:", user);
        window.location.href = "./html/home.html";
    } else {
        console.log("No user is logged in.");
    }
});

// DOMContentLoaded Event
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loginForm").addEventListener("submit", handleLogin);
    document.getElementById("registerForm").addEventListener("submit", handleRegister);

    // Real-time validation for registration fields
    ["username", "registerEmail", "registerPassword", "registerNumber", "gender"].forEach((field) =>
        document.getElementById(field).addEventListener("input", validateRegisterField)
    );

    // Real-time validation for login fields
    ["loginEmail", "loginPassword"].forEach((field) =>
        document.getElementById(field).addEventListener("input", validateLoginField)
    );
});

// --- Utility: Real-time Field Validation ---
function validateRegisterField(event) {
    const fieldId = event.target.id;
    switch (fieldId) {
        case "username":
            validateUsername();
            break;
        case "registerEmail":
            validateEmail("registerEmail", "r-emailError");
            break;
        case "registerPassword":
            validatePassword("registerPassword", "r-pswdError");
            break;
        case "registerNumber":
            validateAge();
            break;
        case "gender":
            validateGender();
            break;
    }
}

function validateLoginField(event) {
    const fieldId = event.target.id;
    switch (fieldId) {
        case "loginEmail":
            validateEmail("loginEmail", "loginEmailError");
            break;
        case "loginPassword":
            validatePassword("loginPassword", "loginPasswordError");
            break;
    }
}

// --- Form Submission Handlers ---
async function handleRegister(event) {
    event.preventDefault();

    // Perform all validations and collect results
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail("registerEmail", "r-emailError");
    const isPasswordValid = validatePassword("registerPassword", "r-pswdError");
    const isAgeValid = validateAge();
    const isGenderValid = validateGender();

    // Check if all validations passed
    const isValid = isUsernameValid && isEmailValid && isPasswordValid && isAgeValid && isGenderValid;

    if (!isValid) {
        console.log("Validation failed. Please check the highlighted errors.");
        return; // Stop submission if any validation fails
    }

    // Proceed with Firebase registration
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            username,
            email,
            createdAt: new Date().toISOString(),
        });

        console.log("Registration successful:", user);
        window.location.href = "./html/home.html";
    } catch (error) {
        console.error("Registration error:", error.message);
        handleAuthErrors(error, "r-emailError");
    }
}

async function handleLogin(event) {
    event.preventDefault();

    // Perform all validations and collect results
    const isEmailValid = validateEmail("loginEmail", "loginEmailError");
    const isPasswordValid = validatePassword("loginPassword", "loginPasswordError");

    // Check if all validations passed
    const isValid = isEmailValid && isPasswordValid;

    if (!isValid) {
        console.log("Validation failed. Please check the highlighted errors.");
        return; // Stop submission if any validation fails
    }

    // Proceed with Firebase login
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Login successful:", userCredential.user);
        window.location.href = "./html/home.html";
    } catch (error) {
        console.error("Login error:", error.message);
        handleAuthErrors(error, "loginEmailError");
    }
}

// --- Validation Functions ---
function validateUsername() {
    const username = document.getElementById("username").value.trim();
    const errorField = document.getElementById("r-textError");
    errorField.textContent = ""; // Clear previous error

    const usernamePattern = /^[a-zA-Z0-9_]+$/;

    if (!username) {
        errorField.textContent = "Username is required.";
        return false;
    }
    if (!usernamePattern.test(username)) {
        errorField.textContent = "Username can only contain letters, numbers, and underscores.";
        return false;
    }
    if (username.length < 3 || username.length > 30) {
        errorField.textContent = "Username must be between 3 and 30 characters.";
        return false;
    }

    return true;
}

function validateEmail(inputId, errorId) {
    const email = document.getElementById(inputId).value.trim();
    const errorField = document.getElementById(errorId);
    errorField.textContent = "";

    if (!email) {
        errorField.textContent = "Email is required.";
        return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        errorField.textContent = "Please enter a valid email.";
        return false;
    }
    return true;
}

function validatePassword(inputId, errorId) {
    const password = document.getElementById(inputId).value.trim();
    const errorField = document.getElementById(errorId);
    errorField.textContent = ""; // Clear previous error

    // Regular expression to check if password contains at least one lowercase, one uppercase, and one number
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

    if (!password) {
        errorField.textContent = "Password is required.";
        return false;
    }
    if (password.length < 8) {
        errorField.textContent = "Password must be at least 8 characters.";
        return false;
    }
    if (!passwordPattern.test(password)) {
        errorField.textContent = "Password must contain at least one uppercase letter, one lowercase letter, and one number.";
        return false;
    }

    return true;
}


function validateAge() {
    const age = document.getElementById("registerNumber").value.trim();
    const errorField = document.getElementById("r-ageError");
    errorField.textContent = "";

    if (!age || isNaN(age) || age < 18 || age > 100) {
        errorField.textContent = "Please enter a valid age between 18 and 100.";
        return false;
    }
    return true;
}

function validateGender() {
    const gender = document.getElementById("gender").value;
    const errorField = document.getElementById("genderError");
    errorField.textContent = "";

    if (!gender) {
        errorField.textContent = "Please select a gender.";
        return false;
    }
    return true;
}

// --- Error Handling ---
function handleAuthErrors(error, errorFieldId) {
    const errorField = document.getElementById(errorFieldId);
    errorField.textContent = "";

    switch (error.code) {
        case "auth/email-already-in-use":
            errorField.textContent = "This email is already in use.";
            break;
        case "auth/invalid-email":
            errorField.textContent = "Invalid email address.";
            break;
        case "auth/weak-password":
            errorField.textContent = "Weak password. Use at least 8 characters.";
            break;
        case "auth/user-not-found":
            errorField.textContent= "user not found"}
    }