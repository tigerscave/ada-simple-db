'use strict';

const endpoint = window.origin;

const deleteUser = id => {
  fetch(`${endpoint}/users/${id}`, {
    method: 'DELETE',
  }).then(res => {
    alert('user deleted!')
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
}

const onDeleteButtonClicked = (e) => {
  const id = parseInt(e.target.value);
  deleteUser(id);
}

const deleteButton = document.getElementById('deleteButton');
deleteButton.addEventListener('click', onDeleteButtonClicked)