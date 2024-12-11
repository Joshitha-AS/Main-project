import {
  initializeApp,
  getApps,
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import {
  getAuth,
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import {
  getDatabase,
  get,
  ref,
  onValue,
  set,
  remove,
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-database.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoSKc0-O0CB-6DsQHW74dSW41Hnk6lQJs",
  authDomain: "social-media-10a7a.firebaseapp.com",
  databaseURL: "https://social-media-10a7a-default-rtdb.firebaseio.com/",
  projectId: "social-media-10a7a",
  storageBucket: "social-media-10a7a.appspot.com",
  messagingSenderId: "770987768855",
  appId: "1:770987768855:web:6dc441a7491249c8cf3052",
  measurementId: "G-61L75JPTKG",
};

// Initialize Firebase only if no apps are initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getDatabase(app);
const dbb = getFirestore(app);
const auth = getAuth(app);

const postPath = "socify/posts";

// Fetch and display posts
try {
  const snapShot = await get(ref(db, postPath));
  const data = snapShot.val();

  if (data) {
    const dailyPosts = Object.keys(data).sort().reverse();

    for (const postId of dailyPosts) {
      const postData = data[postId];
      const role = ISOtoIndian(postId); // Convert date format
      const feed = postData.postLink;
      const uid = postData.uid || "Unknown User";
      let userName = "Unknown User";
      let profilePhoto = "default-profile-photo-url.jpg";

      if (uid !== "Unknown User") {
        const userId = doc(dbb, "users", uid);
        const docSnap = await getDoc(userId);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          userName = userData.userName || "Unknown User";
          profilePhoto = userData.profileimg || "default-profile-photo-url.jpg";
        }
      }

      // Create post container dynamically
      const postContainer = document.createElement("div");
postContainer.innerHTML = `
  <div class="bg-faded-white p-4 rounded-lg shadow mb-4 postContainer">
    <div class="flex items-center mb-2">
      <img src="${profilePhoto}" class="h-10 w-10 rounded-full mr-3">
      <h3 class="font-semibold text-gray-800 cursor-pointer user-profile-link" data-uid="${uid}">${userName}</h3>
    </div>
    <p class="text-gray-600 mb-2">${role}</p>
    <div>
      <img src="${feed}" alt="Post Image" class="rounded-lg shadow">
    </div>
    <div class="flex justify-between text-sm text-gray-500 mt-2">
      <div class="flex items-center">
        <button 
          class="likeButton p-2 rounded-full text-gray-500 hover:text-red-500 focus:outline-none"
          data-post-id="${postId}">
          <i class="fa-solid fa-heart text-2xl"></i>
        </button>
        <span class="likeCount ml-3 text-gray-700 font-medium">0</span>
      </div>
      <div class="flex items-center">
        <button 
          class="commentButton p-2 rounded-full text-gray-500 hover:text-blue-500 focus:outline-none"
          data-post-id="${postId}">
          <i class="fa-solid fa-comments text-2xl"></i>
        </button>
      </div>
    </div>
    <div class="commentSection hidden" id="commentSection-${postId}">
      <div class="commentsList"></div>
      <input 
        type="text" 
        class="commentInput border rounded p-2 mt-2 w-full"
        placeholder="Add a comment..." 
      />
      <button 
        class="postCommentButton bg-blue-500 text-white p-2 rounded mt-2">
        Post
      </button>
    </div>
  </div>
`;
      // Append the post container to the main container
      document.getElementById("mainPostContainer").appendChild(postContainer);

      // Start real-time listener for likes
      listenToLikes(postId);

      // Attach event listener for comments
      const commentButton = postContainer.querySelector(".commentButton");
      if (commentButton) {
        commentButton.addEventListener("click", () => {
          const commentSection = document.getElementById(`commentSection-${postId}`);
          if (commentSection) {
            commentSection.classList.toggle("hidden");
          }
        });
      }

      const postCommentButton = postContainer.querySelector(".postCommentButton");
      if (postCommentButton) {
        postCommentButton.addEventListener("click", async () => {
          const commentInput = postContainer.querySelector(".commentInput");
          const commentText = commentInput?.value.trim();
          const user = auth.currentUser;

          if (!user) {
            alert("Please log in to post comments.");
            return;
          }

          if (commentText) {
            const newCommentRef = ref(db, `${postPath}/${postId}/comments/${Date.now()}`);
            await set(newCommentRef, {
              userId: user.uid,
              text: commentText,
            });
            commentInput.value = "";
          }
        });
      }

      // Real-time listener for comments
      const commentList = postContainer.querySelector(".commentsList");
      onValue(ref(db, `${postPath}/${postId}/comments`), async (snapshot) => {
        if (commentList) {
          commentList.innerHTML = "";
          const comments = snapshot.val() || {};

          for (const [key, comment] of Object.entries(comments)) {
            const commentDiv = document.createElement("div");
            commentDiv.className = "commentItem p-2 border-b";

            const userId = comment.userId;
            let commentUserName = "Unknown User";
            let commentProfilePhoto = "default-profile-photo-url.jpg";

            if (userId) {
              const userRef = doc(dbb, "users", userId);
              const docSnap = await getDoc(userRef);
              if (docSnap.exists()) {
                const userData = docSnap.data();
                commentUserName = userData.userName || "Unknown User";
                commentProfilePhoto = userData.profileimg || "default-profile-photo-url.jpg";
              }
            }

            commentDiv.innerHTML = `
              <div class="flex items-center mb-2">
                <img src="${commentProfilePhoto}" class="h-4 w-4 rounded-full mr-3">
                <h2 class="font-semibold text-gray-800">${commentUserName}</h2>
              </div>
              <p class="text-gray-600">${comment.text}</p>
            `;
            commentList.appendChild(commentDiv);
          }
        }
      });
    }
  } else {
    console.warn("No data found at the specified post path.");
  }
} catch (error) {
  console.error("Error retrieving data:", error);
}

// Function to convert ISO date to Indian date format
function ISOtoIndian(dailyPost) {
  let [hour, minute] = dailyPost.split("_").slice(3, 5).map(Number);

  hour += 5;
  minute += 30;

  if (minute >= 60) {
    minute -= 60;
    hour += 1;
  }

  if (hour >= 24) {
    hour -= 24;
  }

  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour > 12 ? hour - 12 : hour || 12;

  return `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}:00 ${ampm}`;
}

// Real-time listener to update likes dynamically
function listenToLikes(postId) {
  const likeCountRef = ref(db, `socify/posts/${postId}/likes`);
  const likeButton = document.querySelector(`[data-post-id="${postId}"]`);
  const likeCountElement = likeButton?.nextElementSibling;
  const heartIcon = likeButton?.querySelector("i");

  onValue(likeCountRef, (snapshot) => {
    console.log("Real-time likes data:", snapshot.val()); // Debugging
    const likes = snapshot.val() || {};
    const likeCount = Object.keys(likes).length;
    if (likeCountElement) likeCountElement.textContent = likeCount;

    const user = auth.currentUser;
    const isLiked = user && likes[user.uid];

    if (isLiked) {
      heartIcon?.classList.add("fa-solid", "text-red-500");
      heartIcon?.classList.remove("fa-regular");
    } else {
      heartIcon?.classList.add("fa-regular");
      heartIcon?.classList.remove("fa-solid", "text-red-500");
    }
  });

  if (likeButton) {
    likeButton.addEventListener("click", async () => {
      const user = auth.currentUser;

      if (!user) {
        alert("Please log in to like the post.");
        return;
      }

      const userLikeRef = ref(db, `socify/posts/${postId}/likes/${user.uid}`);
      try {
        const snapshot = await get(userLikeRef);
        console.log("Like snapshot exists:", snapshot.exists()); // Debugging

        if (snapshot.exists()) {
          await remove(userLikeRef);
          console.log("Like removed!");
        } else {
          await set(userLikeRef, true);
          console.log("Like added!");
        }
      } catch (error) {
        console.error("Error updating like:", error);
      }
    });
  }
}


//Fetch `uid` from query string
const urlParams = new URLSearchParams(window.location.search);
const uid = urlParams.get("uid");

// DOM elements
const profileLoading = document.getElementById("profile-loading");
const profileContent = document.getElementById("profile-content");
const userProfilePhoto = document.getElementById("profile-photo");
const userProfileUsername = document.getElementById("profile-username");
const profileEmail = document.getElementById("profile-email");
const profileBio = document.getElementById("profile-bio");

// Fetch user data from Firestore
async function fetchUserProfile() {
  try {
    if (!uid) {
      profileLoading.textContent = "No user found.";
      return;
    }

    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();

      // Populate profile details
      userProfilePhoto.src = userData.profileimg || "default-profile-photo-url.jpg";
      userProfileUsername.textContent = userData.userName || "Unknown User";
      profileEmail.textContent = userData.email || "No email provided.";
      profileBio.textContent = userData.bio || "No bio available.";
      
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


// Event listener for user profile links
document.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("user-profile-link")) {
    const userId = target.getAttribute("data-uid");
    if (userId) {
      window.location.href = `?uid=${userId}`;
    }
  }
});
fetchUserProfile() 