import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getStorage, ref as databaseref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-storage.js";
import { getFirestore, doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import { getDatabase, ref as postRef, onValue } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-database.js";


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
      console.log(userData)
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

const postsContainer = document.getElementById("postsContainer");

// Listen to changes in user's posts
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("check 1")
    const userPostsRef = postRef(database, `posts/${user.uid}`);
    onValue(userPostsRef, (snapshot) => {
      postsContainer.innerHTML = ""; // Clear existing posts
      if (snapshot.exists()) {
        const posts = snapshot.val();
        // console.log(posts)
        Object.keys(posts).forEach((postId) => {
          const post = posts[postId];
          
          renderPost(post);
        });
      } else {
        postsContainer.innerHTML = "<p>No posts to display.</p>";
      }
    });
  }
});

// Function to render a single post
function renderPost(postData) {
  const postDiv = document.createElement("div");
  postDiv.className = "post";
   
  postDiv.innerHTML = `
    <h3>${postData.title || "Untitled Post"}</h3>
    <p>${postData.content || "No content provided."}</p>

    <small>Uploaded on: ${new Date(postData.timestamp || Date.now()).toLocaleString()}</small>
  `;

  postsContainer.appendChild(postDiv);
}