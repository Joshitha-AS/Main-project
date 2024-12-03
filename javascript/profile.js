import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-storage.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoSKc0-O0CB-6DsQHW74dSW41Hnk6lQJs",
  authDomain: "social-media-10a7a.firebaseapp.com",
  projectId: "social-media-10a7a",
  storageBucket: "social-media-10a7a.appspot.com",
  messagingSenderId: "770987768855",
  appId: "1:770987768855:web:6dc441a7491249c8cf3052",
  measurementId: "G-61L75JPTKG",
};

// Initialize Firebase Services
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

// DOM Elements
const editProfileModal = document.getElementById("editProfileModal");
const editProfileButton = document.getElementById("editProfileButton");
const cancelEditProfile = document.getElementById("cancelEditProfile");
const saveEditProfile = document.getElementById("saveEditProfile");

const profilePhoto = document.getElementById("profilePhoto");
const profileName = document.getElementById("profileName");
const profileUsername = document.getElementById("profileUsername");
const aboutMe = document.getElementById("aboutMe");

// Edit form inputs
const editNameInput = document.getElementById("editName");
const editUsernameInput = document.getElementById("editUsername");
const editAboutMeInput = document.getElementById("editAboutMe");
const editUserPhotoInput = document.getElementById("editPhoto");
const editPhotoUpload = document.getElementById("uploadProfile");

// Toggle Edit Profile Modal
function toggleEditProfileModal() {
  editProfileModal.classList.toggle("hidden");
}

// Event Listeners
editProfileButton.addEventListener("click", toggleEditProfileModal);
cancelEditProfile.addEventListener("click", toggleEditProfileModal);
saveEditProfile.addEventListener("click", saveProfileData);
editPhotoUpload.addEventListener("click", async () => {
  await uploadImage();
});

// Upload Profile Picture to Firebase Storage
async function uploadImage() {
  const file = editUserPhotoInput.files[0]; // Get selected file
  if (!file) {
    alert("No file selected.");
    return;
  }

  try {
    // Upload new image
    const newImageRef = storageRef(storage, `profiles/${file.name}`);
    console.log("check 1");
    await uploadBytes(newImageRef, file);
    console.log("check 2");
    const downloadURL = await getDownloadURL(newImageRef);
    console.log(downloadURL);

    // Delete the old image if it exists
    const oldImageName = localStorage.getItem("profileName");
    if (oldImageName) {
      const oldImageRef = storageRef(storage, `profiles/${oldImageName}`);
      await deleteObject(oldImageRef).catch((error) => {
        console.error("Error deleting old image:", error);
      });
    }

    // Update profile in Firestore
    const userId = localStorage.getItem("uid"); // Get user ID from localStorage
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      profileimg: downloadURL,
      profileName: file.name,
    });

    // Update localStorage and UI
    localStorage.setItem("profileimg", downloadURL);
    localStorage.setItem("profileName", file.name);
    profilePhoto.src = downloadURL; // Update profile photo preview
    alert("Profile photo updated successfully!");
  } catch (error) {
    console.error("Error uploading image:", error);
    alert("Failed to upload the profile image. Please try again.");
  }
}

// Save Profile Data
async function saveProfileData() {
  try {
    const userId = localStorage.getItem("uid");
    const userDocRef = doc(db, "users", userId);

    const updatedData = {
      name: editNameInput.value,
      userName: editUsernameInput.value,
      aboutMe: editAboutMeInput.value,
    };

    // Update Firestore document
    await updateDoc(userDocRef, updatedData);

    // Fetch updated user document to get the latest data
    const updatedDoc = await getDoc(userDocRef);
    const updatedUserData = updatedDoc.data();

    // Update UI with the latest data
    profilePhoto.src = updatedUserData.profileimg || profilePhoto.src; // Ensure fallback to existing image
    profileName.textContent = updatedUserData.name;
    profileUsername.textContent = `@${updatedUserData.userName}`;
    aboutMe.textContent = updatedUserData.aboutMe;

    alert("Profile updated successfully!");
    toggleEditProfileModal();
  } catch (error) {
    console.error("Error saving profile data:", error);
    alert("Failed to update profile data. Please try again.");
  }
}


document.addEventListener("DOMContentLoaded", async () => {
  try {
    const userId = localStorage.getItem("uid");
    if (!userId) {
      console.error("User ID not found in localStorage.");
      return;
    }

    const userDocRef = doc(db, "users", userId);
    const docSnapshot = await getDoc(userDocRef); // Await the document snapshot
    // const user = userCredential.user;

    if (docSnapshot.exists()) {
      const data = docSnapshot.data(); // Access the document's data
      console.log(data);
      document.getElementById("profilePhoto").src=data.profileimg
      document.getElementById("profileName").textContent= data.name;
      document.getElementById("profileUsername").textContent=data.userName;
      document.getElementById("aboutMe").textContent=data.aboutMe;
    } else {
      console.error("No document found for the given user ID.");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
});
