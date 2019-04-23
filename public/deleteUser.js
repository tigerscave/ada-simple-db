'use strict';

const endpoint = 'https://ada-simple-db.herokuapp.com/';

const onDeleteButtonClicked = (e) => {
  const id = parseInt(e.target.value);
  const xhr = new XMLHttpRequest();
  xhr.open("DELETE", `${endpoint}/users/${id}`);
  xhr.onreadystatechange = () => {
    console.log(xhr)
    if(xhr.readyState === 4 && xhr.status === 200) {
      alert("user deleted!");
    }
  }

  xhr.send(null);
}

const deleteButton = document.getElementById('deleteButton');
deleteButton.addEventListener('click', onDeleteButtonClicked)