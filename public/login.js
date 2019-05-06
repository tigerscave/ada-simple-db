"use strict";

const endpoint = window.origin;

const userLogin = (email, password) => {
  const body = `email=${email}&password=${password}`;
  fetch(`${endpoint}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body
  })
    .then(response => {
      console.log(response);
      if (response.status === 422) {
        alert(response.statusText);
      }
      if (response.status === 200) {
        window.location.replace("/account");
      }
    })
    .catch(err => {
      console.warn(err);
    });
};

const onLoginButtonClicked = () => {
  console.log("loginButton");
  const emailInput = document.getElementById("emailInput");
  const email = emailInput.value;

  const passwordInput = document.getElementById("passwordInput");
  const password = passwordInput.value;

  userLogin(email, password);
};

const loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", onLoginButtonClicked);
