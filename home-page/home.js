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

// Fetch and display posts on the homepage
async function fetchAndDisplayPosts() {
  const postsCollection = collection(db, "posts"); // Use your Firestore collection name
  try {
    const postsSnapshot = await getDocs(postsCollection);
    const postsList = postsSnapshot.docs.map(doc => doc.data());
    displayPosts(postsList);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

// Function to insert posts into the homepage
function displayPosts(posts) {
  const postFeedSection = document.querySelector("main section:last-child"); // Adjusted to target the post feed section

  posts.forEach(post => {
    const postElement = document.createElement("div");
    postElement.classList.add("bg-faded-white", "p-4", "rounded-lg", "shadow", "mb-4");

    postElement.innerHTML = `
      <div class="flex items-center mb-2">
        <div class="bg-aqua-blue h-10 w-10 rounded-full mr-3"></div>
        <h3 class="font-semibold text-gray-800">${post.username || "Anonymous"}</h3>
      </div>
      <p class="text-gray-600 mb-2">${post.content || ""}</p>
      ${post.imageUrl ? `<img src="${post.imageUrl}" alt="Post image" class="w-full rounded-lg mb-2">` : ""}
      <div class="flex justify-between text-sm text-gray-500">
        <span class="hover:text-aqua-blue cursor-pointer">Like</span>
        <span class="hover:text-aqua-blue cursor-pointer">Comment</span>
        <span class="hover:text-aqua-blue cursor-pointer">Share</span>
      </div>
    `;

    postFeedSection.appendChild(postElement);
  });
}

// Call the function to load posts when the page loads
fetchAndDisplayPosts();
