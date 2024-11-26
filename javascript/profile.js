const editProfileButton = document.getElementById('editProfileButton');
        const editProfileModal = document.getElementById('editProfileModal');
        const cancelEditProfile = document.getElementById('cancelEditProfile');
        const editProfileForm = document.getElementById('editProfileForm');

        // Elements to update dynamically
        const profileName = document.getElementById('profileName');
        const profileUsername = document.getElementById('profileUsername');
        const aboutMe = document.getElementById('aboutMe');
        const profilePhoto = document.getElementById('profilePhoto');

        // Open the modal
        editProfileButton.addEventListener('click', () => {
            editProfileModal.classList.remove('hidden');
        });

        // Close the modal
        cancelEditProfile.addEventListener('click', () => {
            editProfileModal.classList.add('hidden');
        });

        // Handle form submission
        editProfileForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent form reload

            // Get input values
            const newName = document.getElementById('editName').value;
            const newUsername = document.getElementById('editUsername').value;
            const newAboutMe = document.getElementById('editAboutMe').value;
            const newPhotoURL = document.getElementById('editPhotoURL').value;

            // Update the page with new values
            if (newName) profileName.textContent = newName;
            if (newUsername) profileUsername.textContent = newUsername.startsWith('@') ? newUsername : `@${newUsername}`;
            if (newAboutMe) aboutMe.textContent = newAboutMe;
            if (newPhotoURL) profilePhoto.src = newPhotoURL;

            // Close the modal
            editProfileModal.classList.add('hidden');
        });