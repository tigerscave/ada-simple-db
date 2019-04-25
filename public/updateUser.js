'use strict';

const updateUser = (id, name, email) => {
  const body = `name=${name}&email=${email}`
  fetch(`${endpoint}/users/${id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body
  }).then(() => {
    alert('user updated!')
  }).catch(err => {
    console.log(err)
  })
}

const onUpdateButtonClicked = (e) => {
  const id = parseInt(e.target.value);
  const name = document.getElementById('nameInput').value;
  const email = document.getElementById('emailInput').value;

  updateUser(id, name, email);
}

const updateButton = document.getElementById('updateButton');
updateButton.addEventListener('click', onUpdateButtonClicked)