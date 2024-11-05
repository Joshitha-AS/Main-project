// Switch form functionality
document.getElementById('showSignUp').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('registerForm').classList.add('active');
    document.getElementById('forgotPasswordForm').classList.remove('active');
  });
  
  document.getElementById('showSignIn').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('registerForm').classList.remove('active');
    document.getElementById('loginForm').classList.add('active');
    document.getElementById('forgotPasswordForm').classList.remove('active');
  });
  
  document.getElementById('backToSignIn').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('forgotPasswordForm').classList.remove('active');
    document.getElementById('loginForm').classList.add('active');
    document.getElementById('registerForm').classList.remove('active');
  });
  
  document.querySelector('.forgot-password').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('forgotPasswordForm').classList.add('active');
    document.getElementById('registerForm').classList.remove('active');
  });
  
  // Form validation
  const registerForm = document.getElementById("registerForm");
  const regTextError = document.getElementById("r-textError");
  const regEmailError = document.getElementById("r-emailError");
  const regPswdError = document.getElementById("r-pswdError");
  
  // Form names
  const username = document.getElementById("username");
  const email = document.getElementById("registerEmail");
  const password = document.getElementById("registerPassword");
  
  registerForm.addEventListener("submit", (event) => {
    regTextError.textContent = "";
    regEmailError.textContent = "";
    regPswdError.textContent = "";
  
    let isValid = true;
  
    if (username.value.trim() === "") {
      regTextError.textContent = `Username is required`;
      isValid = false;
    } else if (username.value.length < 3 || username.value.length > 30) {
      regTextError.textContent = `Username length limit is 3 to 30`;
      isValid = false;
    }
  
    if (email.value.trim() === "") {
      regEmailError.textContent = `Email is required`;
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
      regEmailError.textContent = `Invalid Email`;
      isValid = false;
    } else if (email.value.length > 30 || email.value.length < 5) {
      regEmailError.textContent = `Provide correct Email`;
      isValid = false;
    }
  
    if (password.value.trim() === "") {
      regPswdError.textContent = `Password is required`;
      isValid = false;
    } else if (password.value.length < 8) {
      regPswdError.textContent = `Password must be more than 8 characters`;
      isValid = false;
    }
  
    if (!isValid) {
      event.preventDefault();
    }
  });
  
  // Sign in form validation
  const loginForm = document.getElementById("loginForm");
  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");
  const loginEmailError = document.getElementById("loginEmailError");
  const loginPasswordError = document.getElementById("loginPasswordError");
  
  loginForm.addEventListener("submit", (event) => {
    loginEmailError.textContent = "";
    loginPasswordError.textContent = "";
    let isValid = true;
  
    if (loginEmail.value.trim() === "") {
      loginEmailError.textContent = `Email is required`;
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(loginEmail.value)) {
      loginEmailError.textContent = `Provide a valid email address`;
      isValid = false;
    }
  
    if (loginPassword.value.trim() === "") {
      loginPasswordError.textContent = `Password is required`;
      isValid = false;
    } else if (loginPassword.value.length < 6) {
      loginPasswordError.textContent = `Password must be at least 6 characters long`;
      isValid = false;
    }
  
    if (!isValid) {
      event.preventDefault();
    }
  });
  