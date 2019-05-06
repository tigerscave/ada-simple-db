"use strict";

const endpoint = window.origin;

const createUser = (name, email) => {
  const body = `name=${name}&email=${email}`;
  fetch(`${endpoint}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body
  })
    .then(response => {
      alert("user added!");
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
};

const onCreateButtonClicked = () => {
  const nameInput = document.getElementById("nameInput");
  const name = nameInput.value;

  const emailInput = document.getElementById("emailInput");
  const email = emailInput.value;

  createUser(name, email);
  nameInput.value = "";
  emailInput.value = "";
};

const createButton = document.getElementById("createButton");
createButton.addEventListener("click", onCreateButtonClicked);
