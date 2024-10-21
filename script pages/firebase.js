// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDy-eRIp-iywjosQm6ik1YUe153Vo7pibc",
  authDomain: "my-login-form-23.firebaseapp.com",
  projectId: "my-login-form-23",
  storageBucket: "my-login-form-23.appspot.com",
  messagingSenderId: "756387737326",
  appId: "1:756387737326:web:40fbf94c988d0d4309cdff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
console.log(app);

// Registration functionality
document.getElementById("rinput-submit").addEventListener("click", (e) => {
  e.preventDefault(); // Prevent form from refreshing
  var email = document.getElementById("reg-email").value;
  var password = document.getElementById("reg-pswd").value;

  // For new registration
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      alert("Registration successful!");
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage);
    });
});

// Login functionality
document.getElementById("input-submit").addEventListener("click", (e) => {
  e.preventDefault(); // Prevent form from refreshing
  var email = document.getElementById("loginEmail").value;
  var password = document.getElementById("login-pswd").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      alert(user.email + " logged in successfully!");
      document.getElementById('logout').style.display = 'block'; // Show logout button
      
    })
    
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage);
    });

});

// Logout functionality
document.getElementById("logout").addEventListener("click", (e) => {
  e.preventDefault(); // Prevent any default actions
  signOut(auth).then(() => {
    console.log('Sign-out successful.');
    alert('Sign-out successful.');
    document.getElementById('logout').style.display = 'none'; // Hide logout button
  }).catch((error) => {
    console.log('An error happened during sign-out.');
  });
});

const forgotPassword = document.querySelector('.forgot-password');
if (forgotPassword) {
    forgotPassword.addEventListener('click', () => {
        const email = prompt("Please enter your email for password reset:");
        if (email) {
            // Log email for debugging purposes
            console.log("Email entered for password reset: ", email);
            
            auth.sendPasswordResetEmail(email)
                .then(() => {
                    alert('Password reset email sent!');
                    console.log('Password reset email sent to:', email); // Log success
                })
                .catch((error) => {
                    alert('Error: ' + error.message);
                    console.error("Password reset failed: ", error); // Log error details
                });
        } else {
            alert("Please enter a valid email address.");
        }
    });
} else {
    console.error("Forgot password button not found.");
}