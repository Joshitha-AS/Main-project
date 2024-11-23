import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

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

// Logout functionality
document.getElementById("logout").addEventListener("click", function() {
    signOut(auth)
      .then(function() {
        console.log("User signed out successfully.");
        // Redirect to the login page after logging out
        window.location.href = "../index.html";
      })
      .catch(function(error) {
        console.error("Error signing out:", error);
      });
});

    // JavaScript to handle posting
    const postInput = document.getElementById('postInput');
    const postButton = document.getElementById('postButton');
    const postsSection = document.getElementById('postsSection');

    postButton.addEventListener('click', () => {
      const postContent = postInput.value.trim();
      if (postContent) {
        // Create a new post element
        const post = document.createElement('div');
        post.classList.add('bg-faded-white', 'p-4', 'rounded-lg', 'shadow', 'mb-4');
        post.innerHTML = `
          <div class="flex items-center mb-2">
            <div class="bg-aqua-blue h-10 w-10 rounded-full mr-3"></div>
            <h3 class="font-semibold text-gray-800">You</h3>
          </div>
          <p class="text-gray-600 mb-2">${postContent}</p>
          <div class="flex justify-between text-sm text-gray-500">
            <span class="hover:text-aqua-blue cursor-pointer">Like</span>
            <span class="hover:text-aqua-blue cursor-pointer">Comment</span>
            <span class="hover:text-aqua-blue cursor-pointer">Share</span>
          </div>
        `;

        // Append the post to the posts section
        postsSection.appendChild(post);

        // Clear the input field
        postInput.value = '';
      }
    });
    