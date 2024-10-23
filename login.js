
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

// Firebase configuration object (make sure you have this in your code)

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

// Registration
document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();  // Prevent form submission

  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const username = document.getElementById("username").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Successfully registered
      const user = userCredential.user;

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: email,
      });

      console.log("User registered:", user);
      alert("Registration successful!");
    })
    .catch((error) => {
      console.error("Error during registration:", error.message);
      alert(error.message);
    });
});

// Login
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();  // Prevent form submission

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Successfully signed in
      const user = userCredential.user;
      console.log("User logged in:", user);
      alert(`${user.email} logged in successfully!`);

      // Show the logout button
      document.getElementById('logout').style.display = 'block';

      // Redirect to home page after login
      window.location.href = "home.html";
    })
    .catch((error) => {
      console.error("Login error:", error.message);
      alert(error.message);
    });
});

// Logout functionality
document.getElementById('logout').addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      alert("User logged out!");
      document.getElementById('logout').style.display = 'none';
      window.location.href = "login.html";  // Redirect to login after logout
    })
    .catch((error) => {
      console.error("Logout error:", error.message);
    });
});

// Switch form functionality
document.getElementById('showSignUp').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('loginForm').classList.remove('active');
  document.getElementById('registerForm').classList.add('active');
  document.getElementById('forgotPasswordForm').classList.remove('active');
});

document.getElementById('showSignIn').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('registerForm').classList.remove('active');
  document.getElementById('loginForm').classList.add('active');
  document.getElementById('forgotPasswordForm').classList.remove('active');
});

document.getElementById('backToSignIn').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('forgotPasswordForm').classList.remove('active');
  document.getElementById('loginForm').classList.add('active');
  document.getElementById('registerForm').classList.remove('active');
});

document.querySelector('.forgot-password').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('loginForm').classList.remove('active');
  document.getElementById('forgotPasswordForm').classList.add('active');
  document.getElementById('registerForm').classList.remove('active');
});
