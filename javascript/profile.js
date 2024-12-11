import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getStorage, ref as databaseref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-storage.js";
import { getFirestore, doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";
import { getAuth,onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBoSKc0-O0CB-6DsQHW74dSW41Hnk6lQJs",
  authDomain: "social-media-10a7a.firebaseapp.com",
  projectId: "social-media-10a7a",
  storageBucket: "social-media-10a7a.appspot.com",
  messagingSenderId: "770987768855",
  appId: "1:770987768855:web:6dc441a7491249c8cf3052",
  measurementId: "G-61L75JPTKG"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage();
const db = getFirestore();
const auth = getAuth();
const database = getDatabase();

const profilePhoto = document.getElementById("profilePhoto");
const uploadProfile = document.getElementById("uploadProfile");
const editProfileButton = document.getElementById("editProfileButton");
const editProfileModal = document.getElementById("editProfileModal");
const cancelEditProfile = document.getElementById("cancelEditProfile");
const saveEditProfile = document.getElementById("saveEditProfile");

const editName = document.getElementById("editName");
const editUsername = document.getElementById("editUsername");
const editAboutMe = document.getElementById("editAboutMe");
const aboutMe = document.getElementById("aboutMe");
const profileName = document.getElementById("profileName");
const profileUsername = document.getElementById("profileUsername");
const followButton= document.getElementById("followButton")

// Fetch user details
auth.onAuthStateChanged(async (user) => {
  if (user) {
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);
    // console.log(userDoc)

    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log(userData);
      profilePhoto.src = userData.profileimg || "https://via.placeholder.com/150";
      profileName.textContent = userData.name || "Anonymous";
      profileUsername.textContent = userData.userName || "@username";
      aboutMe.textContent = userData.about || "No information provided.";
    }
  }
});

// Profile photo upload
uploadProfile.addEventListener("click", () => {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.click();

  fileInput.onchange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const user = auth.currentUser;
      if (user) {
        const fileRef = databaseref(storage, `profilePhotos/${user.uid}`);
        await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(fileRef);

        profilePhoto.src = downloadURL;

        // Update Firestore
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { profileimg: downloadURL });
      }
    }
  };
});

// Edit profile functionality
editProfileButton.addEventListener("click", () => {
  editProfileModal.classList.remove("hidden");
});

cancelEditProfile.addEventListener("click", () => {
  editProfileModal.classList.add("hidden");
});

saveEditProfile.addEventListener("click", async (event) => {
  event.preventDefault();
  const user = auth.currentUser;
  if (user) {
    const updatedData = {
      name: editName.value || profileName.textContent,
      userName: editUsername.value || profileUsername.textContent,
      about: editAboutMe.value || aboutMe.textContent,
    };
    console.log(updatedData)

    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, updatedData);

    // Update UI
    profileName.textContent = updatedData.name;
    profileUsername.textContent = updatedData.userName;
    aboutMe.textContent = updatedData.about;

    editProfileModal.classList.add("hidden");
  }
});


const coverPhoto = document.getElementById("coverPhoto");

// Fetch user details (extended to include cover photo)
auth.onAuthStateChanged(async (user) => {
  if (user) {
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      coverPhoto.src = userData.coverPhoto || "https://via.placeholder.com/600x200"; // Default cover photo
      profilePhoto.src = userData.profileimg || "https://via.placeholder.com/150";
      profileName.textContent = userData.name || "Anonymous";
      profileUsername.textContent = userData.userName || "@username";
      aboutMe.textContent = userData.about || "No information provided.";
    }
  }
});

// Cover photo upload functionality
coverPhoto.addEventListener("click", () => {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.click();

  fileInput.onchange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const user = auth.currentUser;
      if (user) {
        const fileRef = databaseref(storage, `coverPhotos/${user.uid}`);
        await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(fileRef);

        coverPhoto.src = downloadURL;

        // Update Firestore
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { coverPhoto: downloadURL });
      }
    }
  };
});



// Correct path to fetch posts from Firebase Realtime Database
const postPath = 'socify/posts';
const postsContainer = document.getElementById('postsContainer');

auth.onAuthStateChanged(async (user) => {
  if (user) {
    try {
      // Correct reference to the Realtime Database
      const snapshot = await get(ref(database, postPath));  // Use `database` instead of `db` for Realtime DB.
      
      if (snapshot.exists()) {
        const allPosts = snapshot.val();
        console.log("All posts:", allPosts);
        
        const userPosts = Object.values(allPosts).filter(post => post.uid === user.uid); // Filter posts by user UID

        // Clear the posts container before rendering
        postsContainer.innerHTML = "";

        if (userPosts.length > 0) {
          // Loop through the filtered posts and render each one
          userPosts.forEach(post => renderPost(post));
        } else {
          postsContainer.innerHTML = "<p>No posts to display.</p>";
        }
      } else {
        postsContainer.innerHTML = "<p>No posts found in the database.</p>";
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      postsContainer.innerHTML = "<p>Error loading posts. Please try again later.</p>";
    }
  } else {
    postsContainer.innerHTML = "<p>Please log in to view your posts.</p>";
  }
});

// Function to render a single post
function renderPost(postData) {
  const postDiv = document.createElement("div");
  postDiv.className = "post";

  postDiv.innerHTML = `
    <div class="post-image mb-4">
      <img src="${postData.postLink || ''}" alt="Post Image" class="w-full h-auto rounded-md">
    </div>
    
    <small class="text-gray-500">Uploaded on: ${new Date(postData.timestamp || Date.now()).toLocaleString()}</small>
  `;

  postsContainer.appendChild(postDiv);
}


// Additional styling for grid layout
document.addEventListener('DOMContentLoaded', () => {
  const postsContainer = document.getElementById("postsContainer");
  postsContainer.classList.add("grid", "grid-cols-4", "sm:grid-cols-2", "lg:grid-cols-3", "gap-10"); // Tailwind grid classes
});


//=============================PROFILE===================================//
// DOM elements
const profileLoading = document.getElementById("profile-loading");
const profileContent = document.getElementById("profile-content");
const userProfilePhoto = document.getElementById("profile-photo");
const userProfileUsername = document.getElementById("profile-username");
const profileEmail = document.getElementById("profile-email");
const profileBio = document.getElementById("profile-bio");
const userPostsContainer = document.getElementById("userPosts");

// Fetch UID from URL or localStorage
const urlParams = new URLSearchParams(window.location.search);
let targetUid = urlParams.get("uid") || localStorage.getItem("targetUid");

if (targetUid) {
  fetchUserProfile(targetUid);
  loadUserPosts(targetUid);
} else {
  console.log("No target UID found in URL or localStorage.");
}

// Fetch user profile data
async function fetchUserProfile(uid) {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();

      // Populate profile details
      userProfilePhoto.src = userData.profileimg || "https://via.placeholder.com/150";
      userProfileUsername.textContent = userData.userName || "Unknown User";
      profileEmail.textContent = userData.email || "No email provided.";
      profileBio.textContent = userData.about || "No bio available.";

      profileLoading.classList.add("hidden");
      profileContent.classList.remove("hidden");
    } else {
      profileLoading.textContent = "User profile not found.";
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    profileLoading.textContent = "Error loading profile.";
  }
}

// Load user posts dynamically
async function loadUserPosts(uid) {
  try {
    const snapshot = await get(ref(database, "socify/posts"));
    const posts = snapshot.val() || {};
    const userPosts = Object.entries(posts).filter(([_, post]) => post.uid === uid);

    userPostsContainer.innerHTML = ""; // Clear previous content

    if (userPosts.length > 0) {
      userPosts.forEach(([id, postData]) => {
        const postElement = document.createElement("div");
        postElement.innerHTML = `
          <div class="bg-white p-4 rounded-lg shadow mb-4">
            <img src="${postData.postLink}" class="rounded-lg shadow">
            <p>${new Date(postData.timestamp || Date.now()).toLocaleString()}</p>
          </div>
        `;
        userPostsContainer.appendChild(postElement);
      });
    } else {
      userPostsContainer.innerHTML = "<p>No posts to display.</p>";
    }
  } catch (error) {
    console.error("Error loading user posts:", error);
    userPostsContainer.innerHTML = "<p>Error loading posts. Please try again later.</p>";
  }
}

// Handle navigation to profile page
function navigateToProfile(uid) {
  localStorage.setItem("targetUid", uid);
  window.location.href = `/profile.html?uid=${uid}`;
}

// Add username click listener to navigate
function renderUserLink(userData) {
  const userLink = document.createElement("a");
  userLink.href = `javascript:void(0);`; // Prevent immediate navigation
  userLink.textContent = userData.userName || "Unknown User";
  userLink.addEventListener("click", () => navigateToProfile(userData.uid));
  document.body.appendChild(userLink);
}


// Fetch UID by username if needed
async function fetchUidByUsername(username) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("userName", "==", username));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    return userDoc.id; // UID is the document ID
  }
  console.log("User not found.");
  return null;
}
fetchUidByUsername()
renderUserLink()