import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";
import {
    getAuth,
    setPersistence,
    browserSessionPersistence,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
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

// Set Firebase Auth Persistence to session
setPersistence(auth, browserSessionPersistence)
    .then(() => console.log("Session persistence set."))
    .catch((error) => console.error("Error setting persistence:", error.message));

// Redirect if the user is already logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is logged in:", user);
        window.location.href = "./html/home.html"; // Adjust path as needed
    } else {
        console.log("No user is logged in.");
    }
});

// Utility function to set or clear error messages
function setError(inputId, errorId, message = "") {
    const errorField = document.getElementById(errorId);
    errorField.textContent = message;
    if (message) {
        document.getElementById(inputId).classList.add("invalid");
    } else {
        document.getElementById(inputId).classList.remove("invalid");
    }
}

// --- Validation Functions ---
function validateEmail(email, errorId) {
    const emailPattern = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    if (!email) {
        setError("registerEmail", errorId, "Enter Email Address.");
        return false;
    }
    if (!emailPattern.test(email)) {
        setError("registerEmail", errorId, "Enter a valid email (e.g., example@gmail.com).");
        return false;
    }
    setError("registerEmail", errorId);
    return true;
}

function validatePassword(password, errorId) {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).+$/;
    if (!password) {
        setError("registerPassword", errorId, "Enter Password.");
        return false;
    }
    if (password.length < 8) {
        setError("registerPassword", errorId, "Password must be at least 8 characters.");
        return false;
    }
    if (!passwordPattern.test(password)) {
        setError(
            "registerPassword",
            errorId,
            "Password must include uppercase, a number, and a special character."
        );
        return false;
    }
    setError("registerPassword", errorId);
    return true;
}

function validateUsername(username, errorId) {
    const usernamePattern = /^[A-Z][a-z]*$/;
    if (!username) {
        setError("username", errorId, "Enter Username.");
        return false;
    }
    if (!usernamePattern.test(username)) {
        setError(
            "username",
            errorId,
            "Username must start with an uppercase letter followed by lowercase letters only."
        );
        return false;
    }
    setError("username", errorId);
    return true;
}

function validateAge(age, errorId) {
    if (!age) {
        setError("registerNumber", errorId, "Enter Age.");
        return false;
    }
    if (age < 10 || age > 100) {
        setError("registerNumber", errorId, "Age must be between 10 and 100.");
        return false;
    }
    setError("registerNumber", errorId);
    return true;
}

function validateGender(gender, errorId) {
    if (!gender) {
        setError("gender", errorId, "Select Gender.");
        return false;
    }
    setError("gender", errorId);
    return true;
}

// --- Event Handlers ---
async function handleSignUp(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const age = document.getElementById("registerNumber").value.trim();
    const gender = document.getElementById("gender").value;
    const password = document.getElementById("registerPassword").value.trim();

    const isUsernameValid = validateUsername(username, "r-textError");
    const isEmailValid = validateEmail(email, "r-emailError");
    const isAgeValid = validateAge(age, "r-ageError");
    const isGenderValid = validateGender(gender, "genderError");
    const isPasswordValid = validatePassword(password, "r-pswdError");

    if (isUsernameValid && isEmailValid && isAgeValid && isGenderValid && isPasswordValid) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save additional user data to Firestore
            await setDoc(doc(db, "users", user.uid), {
                username,
                email,
                age,
                gender,
            });

            alert("Sign Up Successful!");
            window.location.href = "./html/home.html"; // Adjust path as needed
        } catch (error) {
            alert("Error during sign up: " + error.message);
        }
    }
}

async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    const isEmailValid = validateEmail("loginEmail", "loginEmailError");
    const isPasswordValid = validatePassword("loginPassword", "loginPasswordError");

    if (!isEmailValid || !isPasswordValid) return;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login Successful!");
        window.location.href = "./html/home.html"; // Adjust path as needed
    } catch (error) {
        alert("Error during login: " + error.message);
    }
}

async function handleLogout() {
    try {
        await signOut(auth);
        alert("Logged out successfully!");
        window.location.href = "./index.html"; // Redirect to login
    } catch (error) {
        alert("Error during logout: " + error.message);
    }
}

// --- Real-Time Validation Setup ---
function setupRealTimeValidation() {
    document.getElementById("username").addEventListener("input", () =>
        validateUsername(document.getElementById("username").value, "r-textError")
    );
    document.getElementById("registerEmail").addEventListener("input", () =>
        validateEmail(document.getElementById("registerEmail").value, "r-emailError")
    );
    document.getElementById("registerNumber").addEventListener("input", () =>
        validateAge(document.getElementById("registerNumber").value, "r-ageError")
    );
    document.getElementById("gender").addEventListener("change", () =>
        validateGender(document.getElementById("gender").value, "genderError")
    );
    document.getElementById("registerPassword").addEventListener("input", () =>
        validatePassword(document.getElementById("registerPassword").value, "r-pswdError")
    );

    // Login Fields
    document.getElementById("loginEmail").addEventListener("input", () =>
        validateEmail("loginEmail", "loginEmailError")
    );
    document.getElementById("loginPassword").addEventListener("input", () =>
        validatePassword("loginPassword", "loginPasswordError")
    );
}

// --- Event Listeners ---
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("registerForm").addEventListener("submit", handleSignUp);
    document.getElementById("loginForm").addEventListener("submit", handleLogin);
    document.getElementById("logout").addEventListener("click", handleLogout);

    // Set up real-time validation
    setupRealTimeValidation();
});
