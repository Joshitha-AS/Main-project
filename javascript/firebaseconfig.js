// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
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

// Redirect if already logged in
if (localStorage.getItem("uid")) {
    window.location.href = "./html/home.html";
}

// Helper function for validation
function validateInput(input, errorSpan, rules) {
    let errorMessage = "";

    if (rules.required && !input.value.trim()) {
        errorMessage = "This field is required.";
    } else if (rules.minLength && input.value.length < rules.minLength) {
        errorMessage = `Minimum ${rules.minLength} characters required.`;
    } else if (rules.maxLength && input.value.length > rules.maxLength) {
        errorMessage = `Maximum ${rules.maxLength} characters allowed.`;
    } else if (rules.pattern && !rules.pattern.test(input.value)) {
        errorMessage = rules.patternMessage || "Invalid format.";
    } else if (rules.custom && !rules.custom(input.value)) {
        errorMessage = rules.customMessage || "Invalid value.";
    }

    errorSpan.textContent = errorMessage;
    return !errorMessage;
}

// Form elements
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const logoutButton = document.getElementById("logout");

// Register form validation and submission
registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Fields and validation
    const username = document.getElementById("username");
    const usernameError = document.getElementById("r-textError");
    const email = document.getElementById("registerEmail");
    const emailError = document.getElementById("r-emailError");
    const age = document.getElementById("registerNumber");
    const ageError = document.getElementById("r-ageError");
    const gender = document.getElementById("gender");
    const genderError = document.getElementById("genderError");
    const password = document.getElementById("registerPassword");
    const passwordError = document.getElementById("r-pswdError");

    const isUsernameValid = validateInput(username, usernameError, {
        required: true,
        pattern: /^[A-Z][a-zA-Z0-9_]*$/,
        patternMessage: "Username must start with a capital letter and contain only letters, numbers, or underscores.",
        minLength: 3,
        maxLength: 20
    });
    const isEmailValid = validateInput(email, emailError, {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        patternMessage: "Please enter a valid email address."
    });
    const isAgeValid = validateInput(age, ageError, {
        required: true,
        pattern: /^\d+$/,
        patternMessage: "Age must be a number.",
        custom: (value) => parseInt(value, 10) >= 8 && parseInt(value, 10) <= 100,
        customMessage: "Age must be between 8 and 100."
    });
    const isGenderValid = validateInput(gender, genderError, { required: true });
    const isPasswordValid = validateInput(password, passwordError, {
        required: true,
        minLength: 6,
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        patternMessage: "Password must contain at least one uppercase letter, one lowercase letter, and one number."
    });

    if (isUsernameValid && isEmailValid && isAgeValid && isGenderValid && isPasswordValid) {
        createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                const user = userCredential.user;
                const userData = {
                    email: email.value,
                    userName: username.value,
                    aboutUser: "About_user",
                    profileimg: "https://i0.wp.com/static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg?ssl=1",
                    uid: user.uid,
                    name: username.value,
                };

                const docRef = doc(db, "users", user.uid);
                setDoc(docRef, userData)
                    .then(() => {
                        localStorage.setItem("uid", user.uid);
                        window.location.href = "./html/home.html";
                    })
                    .catch((error) => {
                        console.error("Error writing document:", error);
                    });
            })
            .catch((error) => {
                console.error("Error creating user:", error);
            });
    }
});

// Login form validation and submission
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Fields and validation
    const email = document.getElementById("loginEmail");
    const emailError = document.getElementById("loginEmailError");
    const password = document.getElementById("loginPassword");
    const passwordError = document.getElementById("loginPasswordError");

    const isEmailValid = validateInput(email, emailError, {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        patternMessage: "Please enter a valid email address."
    });
    const isPasswordValid = validateInput(password, passwordError, {
        required: true,
        minLength: 6,
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        patternMessage: "Password must contain at least one uppercase letter, one lowercase letter, and one number."
    });

    if (isEmailValid && isPasswordValid) {
        signInWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                localStorage.setItem("uid", userCredential.user.uid);
                window.location.href = "./html/home.html";
            })
            .catch((error) => {
                console.error("Error signing in:", error);
            });
    }
});
