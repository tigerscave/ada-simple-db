'use strict';

const endpoint = window.origin;

const createUser = (name, email) => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", `${endpoint}/users`);
  xhr.onreadystatechange = () => {
    console.log(xhr)
    if(xhr.readyState === 4 && xhr.status === 201) {
      alert("user added!");

    }
  }
  const body = `name=${name}&email=${email}`
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  xhr.send(body);
}

const onCreateButtonClicked = () => {
  const nameInput = document.getElementById('nameInput')
  const name = nameInput.value;

  const emailInput = document.getElementById('emailInput')
  const email = emailInput.value;

  createUser(name, email);
  nameInput.value = "";
  emailInput.value = "";
}

const createButton = document.getElementById('createButton');
createButton.addEventListener('click', onCreateButtonClicked)