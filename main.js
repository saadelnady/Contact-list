let addUser = document.getElementById("addContact");
let formDiv = document.querySelector(".overlay");
let btnClose = document.querySelector("form .close");

// form inputs
let name = document.getElementById("name");
let phoneNumber = document.getElementById("phone");
let email = document.getElementById("email");
let address = document.getElementById("address");
let save = document.getElementById("save");

//mood of broject
let mood = "create";
let temp;
// create user

let users;

// check array in localstorage not empty
if (localStorage.users != null) {
  // save and get data from local storage
  users = JSON.parse(localStorage.users);
} else {
  users = [];
}
save.onclick = (e) => {
  // stop page reload
  e.preventDefault();

  // create user object
  let user = {};

  // add user value
  user.name = name.value;
  user.phoneNumber = phoneNumber.value;
  user.email = email.value;
  user.address = address.value;

  // Add object to Array
  if (mood === "create") {
    users.push(user);
  } else {
    users[temp] = user;
    mood = "create";
    save.value = "create";
  }

  // save in local storage
  localStorage.setItem("users", JSON.stringify(users));

  showData();

  // remove Inputs data
  removeInputsdata();

  // close form
  closeForm();
};
addUser.onclick = openForm;
btnClose.onclick = closeForm;

function openForm() {
  formDiv.classList.add("active");
}

function closeForm() {
  formDiv.classList.remove("active");
}
// remove Inputs data
function removeInputsdata() {
  name.value = "";
  phoneNumber.value = "";
  email.value = "";
  address.value = "";
}

function showData() {
  let tableBody = document.querySelector(" table tbody");
  let tableRow = "";
  for (let i = 0; i < users.length; i++) {
    tableRow += ` 
    <tr>
        <td>  ${i + 1}</td>
        <td>  ${users[i].name} </td>
        <td>  ${users[i].phoneNumber}</td>
        <td>  ${users[i].email}</td>
        <td>  ${users[i].address}</td>
        <td><button id="edit" onclick = "updateData(${i})">Edit</button></td>
        <td><button id="delete" onclick =" deleteData(${i})">Delete</button></td>
      </tr>`;
  }
  tableBody.innerHTML = tableRow;
  let deleteAlldiv = document.getElementById("deletAll");
  if (users.length > 0) {
    deleteAlldiv.innerHTML = `<button onclick = "deleteAll()">Delete all (${users.length})</button>`;
  } else {
    deleteAlldiv.innerHTML = "";
  }
}
showData();

// delete Data

function deleteData(i) {
  users.splice(i, 1);
  //Add new  array to localstorage after delete selected user
  localStorage.users = JSON.stringify(users);
  // trigger function show data
  showData();
}

function deleteAll() {
  users.splice(0);
  localStorage.clear();
  showData();
}

function updateData(i) {
  openForm();
  name.value = users[i].name;
  phoneNumber.value = users[i].phoneNumber;
  email.value = users[i].email;
  address.value = users[i].address;
  save.value = "Edit";
  mood = "edit";
  temp = i;
}
