import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";
import { getStorage, ref as storeRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-storage.js";
import { getDatabase, ref as databaseRef, set, get } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-database.js";

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
const db = getFirestore(app);
const storage = getStorage(app);
const firebase = getDatabase(app);  

const uploadButton = document.getElementById('uploadButton');
const imageInput = document.getElementById('imageInput');
const uploadStatus = document.getElementById('uploadStatus');
const uploadedImagePreview = document.getElementById('uploadedImagePreview');
const userID=localStorage.getItem("uid");
uploadButton.addEventListener('click', async () => {
  const file = imageInput.files[0];
  if (file) {
    const storageRef = storeRef(storage, `UserPosts/${ file.name+ new Date().toISOString() + Math.random()}`); // Create reference with folder

    uploadStatus.textContent = 'Uploading...';

    try {
      // Upload file to Firebase Storage
      await uploadBytes(storageRef, file);

      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);

      function sanitizingDate() {
        return new Date().toISOString().replace(/[-:.T]/g, '_');
      }

      // const isoDateTime = sanitizedDateTime
      // .replace(/_/g, '-')              // Replace underscores with hyphens
      // .replace(/(\d{4})-(\d{2})-(\d{2})$/, '$1-$2T$3')  // Add 'T' between date and time
      // .replace(/(\d{2}:\d{2}:\d{2})$/, (match) => match + '.123Z'); // Add milliseconds and 'Z'

      const postPath = `socify/posts/${sanitizingDate()}_${userID}/`;
      let postData = {
        postLink: downloadURL,
        like: 0,
        comment: 0,
        uid: userID,
      }
      await set(databaseRef(firebase, postPath), postData)
        .then(() => console.log("Data written successfully."))
        .catch((e) => console.log(e)
        )


      // Update the UI with the uploaded image
      uploadedImagePreview.innerHTML = `
            <p class="text-green-500">Image uploaded successfully!</p>
            <img src="${downloadURL}" alt="Uploaded Image" class="mt-4 max-w-full rounded-lg shadow-md">
          `;

      uploadStatus.textContent = 'Upload complete.';
    } catch (error) {
      console.error('Error uploading image:', error);
      uploadStatus.textContent = 'Error uploading image. Please try again.';
    }
  } else {
    uploadStatus.textContent = 'Please select an image first.';
  }
});
