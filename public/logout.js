"use strict";

const endpoint = window.origin;

const onLogoutClicked = () => {
  fetch(`${endpoint}/logout`, {
    method: "GET"
  })
    .then(response => {
      console.log(response);
      if (response.status === 200) {
        window.location.replace("/");
      } else {
        alert("can not log out!");
      }
    })
    .catch(err => {
      console.warn(err);
    });
};

const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", onLogoutClicked);
