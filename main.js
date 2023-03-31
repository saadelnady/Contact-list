// btn scroll to top
let btnScrollTotop = document.getElementsByClassName("scrollTotop")[0];

onscroll = () => {
    if (scrollY >= 200) {
        btnScrollTotop.style.display = "block";
    } else {
        btnScrollTotop.style.display = "none";
    }
};
btnScrollTotop.onclick = () => {
    scroll({ top: 0, behavior: "smooth" });
};
// overlay
let formDiv = document.querySelector(".overlay");
let btnAddnewContact = document.getElementById("addContact");
let btnFormclose = document.querySelector("form .close");

btnAddnewContact.onclick = openForm;
btnFormclose.onclick = closeForm;

// form inputs
let name = document.getElementById("name");
let phone = document.getElementById("phone");
let email = document.getElementById("email");
let address = document.getElementById("address");
let save = document.getElementById("save");
let tableBody = document.getElementById("tbody");
// create user
let users;
if (localStorage.users != null) {
    users = JSON.parse(localStorage.getItem("users"));
} else {
    users = [];
}
let mood = "create";
// using temp for edit  table row
// temp = i
let temp;
save.onclick = function(e) {
    e.preventDefault();
    let user = {
        name: name.value.toLowerCase(),
        phone: phone.value,
        email: email.value,
        address: address.value.toLowerCase(),
    };
    // add object to array

    if (mood === "create") {
        users.push(user);
    } else {
        // edit table row
        // temp = i
        users[temp] = user;
        mood = "create";
        save.value = "create";
    }
    // add users (array) to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    clearForminputs();

    closeForm();

    showData();
};

function closeForm() {
    formDiv.classList.remove("active");
}

function openForm() {
    formDiv.classList.add("active");
}
// remove form inputs
function clearForminputs() {
    name.value = "";
    phone.value = "";
    email.value = "";
    address.value = "";
}

function showData() {
    let tableRow = "";

    for (let i = 0; i < users.length; i++) {
        tableRow += `
    <tr>
        <td>${i + 1} </td>
        <td> ${users[i].name}  </td>
        <td> ${users[i].phone}   </td>
        <td> ${users[i].email}   </td>
        <td> ${users[i].address} </td>
        <td> <button onclick = "editUser(${i})" id= "edit">Edit</button></td>
        <td> <button onclick = "deleteUser(${i})" id="delete">Delete</button></td>
      </tr>`;
    }
    tableBody.innerHTML = tableRow;
    //create delete All btn
    let deleteAlldiv = document.getElementById("deletAll");

    if (users.length > 0) {
        deleteAlldiv.innerHTML = `<button onclick ="deleteAll()" >Delete All (${users.length})</button>`;
    } else {
        deleteAlldiv.innerHTML = "";
    }
}
showData();

function deleteUser(i) {
    // remove From array
    users.splice(i, 1);
    //Add new  array to localstorage after delete selected user
    //  عنصر منها تعديل للمصفوفه اللى فى  اللوكال ستوردج بالمصفوفه الجديده بعد حذف
    localStorage.users = JSON.stringify(users);
    // trigger function show data
    // هيشثغل التكرار على المصفوفه الجديده
    showData();
}

function deleteAll() {
    users.splice(0);
    localStorage.clear();
    showData();
}

function editUser(i) {
    openForm();
    name.value = users[i].name;
    phone.value = users[i].phone;
    email.value = users[i].email;
    address.value = users[i].address;
    save.value = "Edit";
    mood = "Edit";
    temp = i;
}

// search input
let searchArrow = document.querySelector(".search .arrow i");
let searchBy = document.querySelector(".searchby");
let searchOptions = document.querySelectorAll(".searchby li");
let searchInput = document.getElementById("search");

function showSearchoption() {
    searchArrow.classList.toggle("active");
    searchBy.classList.toggle("active");
}

searchArrow.onclick = showSearchoption;
searchInput.onclick = showSearchoption;
// searchInput.onblur = () => {
//     searchArrow.classList.remove("active");
//     searchBy.classList.remove("active");
// };
let searchMood = "name";
searchOptions.forEach((option) => {
    option.onclick = () => {
        searchArrow.classList.remove("active");
        searchBy.classList.remove("active");
        searchInput.placeholder = option.innerHTML;
        if (option.id == "searchByname") {
            searchMood = "name";
        } else {
            searchMood = "phone";
        }
        searchInput.focus();
    };
});
searchInput.onkeyup = searchData;

function searchData(value) {
    let tableRow = "";
    if (searchMood === "name") {
        for (let i = 0; i < users.length; i++) {
            if (users[i].name.includes(this.value.toLowerCase())) {
                tableRow += `
                    <tr>
                        <td>${i + 1} </td>
                        <td> ${users[i].name}  </td>
                        <td> ${users[i].phone}   </td>
                        <td> ${users[i].email}   </td>
                        <td> ${users[i].address} </td>
                        <td> <button onclick = "editUser(${i})" id= "edit">Edit</button></td>
                        <td> <button onclick = "deleteUser(${i})" id="delete">Delete</button></td>
                     </tr>
                   `;
            }
        }
    } else {
        for (let i = 0; i < users.length; i++) {
            if (users[i].phone.includes(this.value.toLowerCase())) {
                tableRow += `
                <tr>
                    <td>${i + 1} </td>
                    <td> ${users[i].name}  </td>
                    <td> ${users[i].phone}   </td>
                    <td> ${users[i].email}   </td>
                    <td> ${users[i].address} </td>
                    <td> <button onclick = "editUser(${i})" id= "edit">Edit</button></td>
                    <td> <button onclick = "deleteUser(${i})" id="delete">Delete</button></td>
                 </tr>
               `;
            }
        }
    }

    tableBody.innerHTML = tableRow;
}