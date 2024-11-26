import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDoc, 
  doc, 
  updateDoc, 
  onSnapshot 
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";
import { getDatabase, ref as blogRef, set, get, push} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-database.js";



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
const firebase= getDatabase(app)

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

// DOM Elements
const blogInput = document.getElementById('blogInput');
const blogButton = document.getElementById('blogButton');
const blogsSection = document.getElementById('blogsSection');

// Firestore references
const blogsCollection = collection(db, "blogs");

// Add a new blog
blogButton.addEventListener('click', async () => {
  const blogContent = blogInput.value.trim();
  if (blogContent) {
    try {
      // Add blog to Firestore
      const blogDoc = await addDoc(blogsCollection, {
        content: blogContent,
        likes: 0, // Initialize with 0 likes
        Comment:"Enter comment",
        timestamp: new Date() // Store timestamp for sorting if needed
      });

      console.log("blog added with ID:", blogDoc.id);
      blogInput.value = ""; // Clear input field
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  }
});

// Listen for real-time updates
onSnapshot(blogsCollection, (snapshot) => {
  blogsSection.innerHTML = ""; // Clear blogs section
  snapshot.forEach(doc => {
    const blog = doc.data();
    const blogElement = document.createElement('div');
    blogElement.classList.add('bg-faded-white', 'p-4', 'rounded-lg', 'shadow', 'mb-4');
    blogElement.innerHTML = `
      <div class="flex items-center mb-2">
        <div class="bg-aqua-blue h-10 w-10 rounded-full mr-3"></div>
        <h3 class="font-semibold text-gray-800">You</h3>
      </div>
      <p class="text-gray-600 mb-2">${blog.content}</p>
      <div class="flex justify-between text-sm text-gray-500">
        <span class="like-btn hover:text-aqua-blue cursor-pointer" data-id="${doc.id}">\
        
        Like (${blog.likes})</span>
        <span class="comment-btn hover:text-aqua-blue cursor-pointer" data-id="${doc.id}">💬 Comment</span>
      </div>
    `;
    blogsSection.appendChild(blogElement);
  });

  // Attach like event listeners
  document.querySelectorAll('.like-btn').forEach(button => {
    button.addEventListener('click', () => {
      const blogId = button.getAttribute('data-id');
      increaseLike(blogId);
    });
  });
});

// Function to increase likes 
async function increaseLike(blogId) {
  try {
    const blogRef = doc(db, "blogs", blogId); // Get a reference to the specific document
    const blogSnapshot = await getDoc(blogRef); // Fetch the document data

    if (blogSnapshot.exists()) {
      const blog = blogSnapshot.data();
      const updatedLikes = (blog.likes || 0) + 1;

      // Update the likes count in Firestore
      await updateDoc(blogRef, { likes: updatedLikes });
      console.log(`Likes updated for blog ${blogId}: ${updatedLikes}`);
    } else {
      console.error("blog not found:", blogId);
    }
  } catch (error) {
    console.error("Error updating likes:", error);
  }
}

