'use strict';

const onUpdateButtonClicked = (e) => {
  const id = parseInt(e.target.value);
  const xhr = new XMLHttpRequest();
  xhr.open("PUT", `${endpoint}/users/${id}`);
  xhr.onreadystatechange = () => {
    console.log(xhr)
    if(xhr.readyState === 4 && xhr.status === 200) {
      alert("user updated");
    }
  }

  const name = document.getElementById('nameInput').value;
  const email = document.getElementById('emailInput').value;
  const body = `name=${name}&email=${email}`

  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  xhr.send(body);
}

const updateButton = document.getElementById('updateButton');
updateButton.addEventListener('click', onUpdateButtonClicked)