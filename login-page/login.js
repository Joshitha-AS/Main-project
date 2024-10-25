
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

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

// Registration
document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault(); 
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
    })
    .catch((error) => {
      console.error("Error during registration:", error.message);
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

      // Show the logout button
      document.getElementById('logout').style.display = 'block';

      // Redirect to home page after login
      window.location.href = "/home.html";
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
      window.location.href = "./login.html";  // Redirect to login after logout
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


//form validation
const registerForm = document.getElementById("registerForm");
const regTextError = document.getElementById("r-textError");
const regEmailError = document.getElementById("r-emailError");
const regPswdError = document.getElementById("r-pswdError");

//form names
const username = document.getElementById("username");
const email= document.getElementById("registerEmail");
const password= document.getElementById("registerPassword")

registerForm.addEventListener("submit", (event) => {
  regTextError.textContent = "";
  regEmailError.textContent = "";
  regPswdError.textContent = "";
  
  let isValid = true;


  if (username.value.trim() === "") {
    regTextError.textContent = `Username is required`;
    isValid = false;
  }

  else if (username.value.length < 3 || username.value.length > 30) {
    regTextError.textContent = `Username length limit is 3 to 30`;
    isValid = false;
  }
  
  if(email.value.trim() ===""){
    regEmailError.textContent=`Email is required`
    isValid=false;
  }
  else if(!/\S+@\S+\.\S+/.test(email.value)){
    regEmailError.textContent= `Invalid Email`
  }
  else if(email.value.length>30 || email.value.length<5){
    regEmailError.textContent=`Provide correct Email`
    isValid=false;
  }
   if(password.value.trim() ===""){
    regPswdError.textContent=`password is required`
    isValid=false;
  }
  else if(password.value.length<8){
    regPswdError.textContent=`Password must be more than 8 characters`
    isValid=false;
  }

  if (!isValid) {
    event.preventDefault(); 
  }
});

//sign in form
const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginEmailError = document.getElementById("loginEmailError");
const loginPasswordError = document.getElementById("loginPasswordError");

loginForm.addEventListener("submit", (event) => {
  loginEmailError.textContent = "";
  loginPasswordError.textContent = "";
  let isValid = true;

  // Validate email
  if (loginEmail.value.trim() === "") {
    loginEmailError.textContent = `Email is required`;
    isValid = false;
  } 
  // Basic email format validation
  else if (!/\S+@\S+\.\S+/.test(loginEmail.value)) {
    loginEmailError.textContent = `Provide a valid email address`;
    isValid = false;
  }

  // Validate password
  if (loginPassword.value.trim() === "") {
    loginPasswordError.textContent = `Password is required`;
    isValid = false;
  } 
  else if (loginPassword.value.length < 6) { // Check for a minimum length
    loginPasswordError.textContent = `Password must be at least 6 characters long`;
    isValid = false;
  }

  // Prevent form submission if validation fails
  if (!isValid) {
    event.preventDefault(); 
  }
});

