import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-storage.js";
import { getFirestore, doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

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
        const fileRef = ref(storage, `profilePhotos/${user.uid}`);
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


