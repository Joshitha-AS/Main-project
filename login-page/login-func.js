// Switch form functionality
document.getElementById('showSignUp').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('loginForm').classList.remove('active');
  document.getElementById('registerForm').classList.add('active');
//   document.getElementById('forgotPasswordForm').classList.remove('active');
});

// document.getElementById('showSignIn').addEventListener('click', (e) => {
//   e.preventDefault();
//   document.getElementById('registerForm').classList.remove('active');
//   document.getElementById('loginForm').classList.add('active');
// //   document.getElementById('forgotPasswordForm').classList.remove('active');
// });

document.addEventListener("DOMContentLoaded", () => {
  // Event listeners for form submissions
  document.getElementById("loginForm").addEventListener("submit", validateLoginForm);
  document.getElementById("registerForm").addEventListener("submit", validateRegisterForm);
});

// Helper function to validate email format
function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

// Login Form Validation
function validateLoginForm(event) {
  event.preventDefault();
  let isValid = true;

  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");

  const loginEmailError = document.getElementById("loginEmailError");
  const loginPasswordError = document.getElementById("loginPasswordError");

  // Clear previous error messages
  loginEmailError.textContent = "";
  loginPasswordError.textContent = "";

  // Validate email
  if (!loginEmail.value.trim()) {
      loginEmailError.textContent = "Email is required.";
      isValid = false;
  } else if (!isValidEmail(loginEmail.value)) {
      loginEmailError.textContent = "Please enter a valid email.";
      isValid = false;
  }

  // Validate password
  if (!loginPassword.value.trim()) {
      loginPasswordError.textContent = "Password is required.";
      isValid = false;
  } else if (loginPassword.value.length < 6) {
      loginPasswordError.textContent = "Password must be at least 6 characters.";
      isValid = false;
  }

  if (isValid) {
      // Submit the form if validation passes
      event.currentTarget.submit();
  }
}

// Register Form Validation
function validateRegisterForm(event) {
  event.preventDefault();
  let isValid = true;

  const username = document.getElementById("username");
  const registerEmail = document.getElementById("registerEmail");
  const registerPassword = document.getElementById("registerPassword");
  const age = document.getElementById("registerNumber");
  const gender = document.getElementById("gender");

  const usernameError = document.getElementById("r-textError");
  const emailError = document.getElementById("r-emailError");
  const passwordError = document.getElementById("r-pswdError");
  const ageError = document.getElementById("r-ageError");
  const genderError = document.getElementById("genderError");

  // Clear previous error messages
  usernameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  ageError.textContent = "";
  genderError.textContent = "";

  // Username validation
  if (!username.value.trim()) {
      usernameError.textContent = "Username is required.";
      isValid = false;
  } else if (username.value.length < 3 || username.value.length > 30) {
      usernameError.textContent = "Username must be between 3 and 30 characters.";
      isValid = false;
  }

  // Email validation
  if (!registerEmail.value.trim()) {
      emailError.textContent = "Email is required.";
      isValid = false;
  } else if (!isValidEmail(registerEmail.value)) {
      emailError.textContent = "Please enter a valid email.";
      isValid = false;
  }

  // Password validation
  if (!registerPassword.value.trim()) {
      passwordError.textContent = "Password is required.";
      isValid = false;
  } else if (registerPassword.value.length < 8) {
      passwordError.textContent = "Password must be at least 8 characters.";
      isValid = false;
  }

  // Age validation
  if (!age.value.trim() || isNaN(age.value) || age.value < 18 || age.value > 100) {
      ageError.textContent = "Please enter a valid age between 18 and 100.";
      isValid = false;
  }

  // Gender validation
  if (gender.value === "") {
      genderError.textContent = "Please select a gender.";
      isValid = false;
  }

  if (isValid) {
      // Submit the form if validation passes
      event.currentTarget.submit();
  }
}


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

