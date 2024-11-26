import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getDatabase, ref as databaseRef, set, get } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-database.js";

// Your Firebase config object
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
const firebase = getDatabase(app);

const postPath=`socify/posts`;

// Fetch data using getDocs (modular API)
await get(databaseRef(firebase, postPath))
  .then((snapShot) => {
    const data=snapShot.val();
    Object.keys(data).sort().forEach(dailyPost=>{ 
        const Post=data[dailyPost]         
        Object.keys(Post).forEach(x=>{
            let postData=Post[x];
            let userName=x;
            console.log(dailyPost);

            let role=ISOtoIndian(dailyPost)
            let feed=postData.postLink;
          
            console.log(userName,role,feed);
            const postContainer = document.createElement("div");
            postContainer.innerHTML = `<div class="bg-faded-white p-4 rounded-lg shadow mb-4 postContainer" >
                  <div class="flex items-center mb-2">
                    <div class="bg-aqua-blue h-10 w-10 rounded-full mr-3"></div>
                    <h3 class="font-semibold text-gray-800">${userName}</h3>
                  </div>
                  <p class="text-gray-600 mb-2">${role}</p>
                  <div>
                     <img src='${feed}' alt="">
                  </div>
                  <div class="flex justify-between text-sm text-gray-500">
                    <span id="like-btn" class="hover:text-aqua-blue cursor-pointer">Like</span>
                    <span id="comment-box" class="hover:text-aqua-blue cursor-pointer">Comment</span>
                  </div>
                </div>`
        
            // Append the user container to the main container
            document.getElementById("mainPostContainer").appendChild(postContainer);
          })

        })
          
        })
        
  .catch((error) => {
    console.error("Error fetching data:", error);
  });





  function ISOtoIndian(dailyPost) {
    let hour = parseInt(dailyPost.split("_")[3]);
let minute = parseInt(dailyPost.split("_")[4]);

// Add 5 hours and 30 minutes to convert to IST
hour += 5;
minute += 30;

// Handle overflow if minutes exceed 60
if (minute >= 60) {
    minute -= 60;
    hour += 1;
}

// Handle overflow if hours exceed 24
if (hour >= 24) {
    hour -= 24;
}

// Determine AM or PM
let ampm = hour >= 12 ? 'PM' : 'AM';

// Convert hour to 12-hour format
if (hour > 12) {
    hour -= 12;
} else if (hour === 0) {
    hour = 12; // Midnight case
}

// Format the time in hh:mm:ss AM/PM format (add leading zero if needed)
const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00 ${ampm}`;

return(formattedTime); 
  }