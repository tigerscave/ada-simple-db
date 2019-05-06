"use strict";

const endpoint = window.origin;

const userSignUp = (name, email, password) => {
  const body = `name=${name}&email=${email}&password=${password}`;
  fetch(`${endpoint}/signup`, {
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
      if (response.status === 201) {
        window.location.replace("/login");
      }
    })
    .catch(err => {
      console.warn(err);
    });
};

const onSignUpButtonClicked = () => {
  const nameInput = document.getElementById("nameInput");
  const name = nameInput.value;

  const emailInput = document.getElementById("emailInput");
  const email = emailInput.value;

  const passwordInput = document.getElementById("passwordInput");
  const password = passwordInput.value;

  userSignUp(name, email, password);
  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
};

const signUpButton = document.getElementById("signUpButton");
signUpButton.addEventListener("click", onSignUpButtonClicked);
