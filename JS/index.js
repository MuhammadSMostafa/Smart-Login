var signUp = document.getElementById("signUp");
var signIn = document.getElementById("signIn");
var nameInput = document.getElementById("nameInput");
var emailInput = document.getElementById("emailInput");
var passwordInput = document.getElementById("passwordInput");
var welcomeUser = document.getElementById("welcomeUser");
var emptyInputs = document.getElementById("empty");
var users = [];
var user = null;

if (localStorage.getItem("user")) {
  user = localStorage.getItem("user");
  welcomeUser ? (welcomeUser.innerHTML += ` ${user}`) : navigateToHome();
}

if (localStorage.getItem("users")) {
  users = JSON.parse(localStorage.getItem("users"));
}

signUp?.addEventListener("click", function () {
  navigateToRegister();
});

signIn?.addEventListener("click", function () {
  navigateToLogin();
});

if (
  user &&
  (location.pathname.match(/\/login.html$/i) ||
    location.pathname.match(/\/register.html$/i))
) {
  navigateToHome();
}

if (
  (location.pathname.match(/\/index.html$/i) ||
    location.pathname.match(/\/$/i)) &&
  !user
) {
  navigateToLogin();
}

function navigateToHome() {
  window.location.href = "index.html";
}

function navigateToLogin() {
  window.location.href = "login.html";
}

function navigateToRegister() {
  window.location.href = "register.html";
}

function register() {
  if (
    emailInput.value.length < 1 ||
    passwordInput.value.length < 1 ||
    nameInput.value.length < 1
  ) {
    emptyInputs.classList.remove("d-none");
  } else {
    var user;
    if (
      validateInputs(nameInput) &&
      validateInputs(emailInput) &&
      validateInputs(passwordInput) &&
      emailExist(emailInput.value)
    ) {
      user = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
      };
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("user", nameInput.value);
      navigateToHome();
    }
  }
}

function emailExist(email) {
  for (i = 0; i < users.length; i++) {
    if (users[i].email.toLowerCase() == email.toLowerCase()) {
      emailInput.nextElementSibling.innerHTML = "This email is already exist";
      emailInput.nextElementSibling.classList.remove("d-none");
      setTimeout(function () {
        emailInput.nextElementSibling.innerHTML = "Must be valid email";
        emailInput.nextElementSibling.classList.add("d-none");
      }, 3000);
      return false;
    }
  }
  return true;
}

function login() {
var loginEmailExist = false;
  if (emailInput.value.length < 1 || passwordInput.value.length < 1) {
    emptyInputs.classList.remove("d-none");
    setTimeout(function () {
      emptyInputs.classList.add("d-none");
    }, 3000);
  } else {
    for (i = 0; i < users.length; i++) {
      if (users[i].email.toLowerCase() == emailInput.value.toLowerCase()) {
        loginEmailExist = true;
        if (users[i].password == passwordInput.value) {
          localStorage.setItem("user", users[i].name);
          navigateToHome();
        } else {
          passwordInput.nextElementSibling.classList.remove("d-none");
          setTimeout(function () {
            passwordInput.nextElementSibling.classList.add("d-none");
          }, 3000);
        }
      }
    }
    if (!loginEmailExist) {
      emailInput.nextElementSibling.classList.remove("d-none");
      setTimeout(function () {
        emailInput.nextElementSibling.classList.add("d-none");
      }, 3000);
    }
  }
}

function logout() {
  localStorage.removeItem("user");
  navigateToLogin();
}

function validateInputs(element) {
  emptyInputs.classList.add("d-none");
  var text = element.value;
  var regex = {
    nameInput: /^[a-zA-Z]{3,}$/,
    emailInput: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    passwordInput: /^[A-Za-z\d@$!%*?&]{6,}$/,
  };
  if (regex[element.id].test(text)) {
    element.nextElementSibling.classList.add("d-none");
    return true;
  } else {
    element.nextElementSibling.classList.remove("d-none");
    return false;
  }
}
