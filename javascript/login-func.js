// Switch form functionality
document.getElementById('showSignUp').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('loginForm').classList.remove('active');
  document.getElementById('registerForm').classList.add('active');

});
// Password visibility toggle function
function togglePasswordVisibility(fieldId) {
  const passwordField = document.getElementById(fieldId);
  const icon = passwordField.nextElementSibling;

  if (passwordField.type === "password") {
      passwordField.type = "text";
      icon.classList.add("fa-eye-slash");
      icon.classList.remove("fa-eye");
  } else {
      passwordField.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
  }
}

// Add event listeners for toggle icons
document.querySelectorAll(".toggle-password").forEach((toggleIcon) => {
  toggleIcon.addEventListener("click", (event) => {
      // Prevent form submission on icon click
      event.preventDefault();
      const fieldId = event.target.previousElementSibling.id;
      togglePasswordVisibility(fieldId);
  });
});

