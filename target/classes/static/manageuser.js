const uri = "http://localhost:8080/api/users/";
var userOnly;

var allusers;
// = JSON.parse(localStorage.getItem("usersList") || "[]");
var updateid = 0;
var removeid = 0;
var text = "";
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
});
function setallusers() {
  if (localStorage) {
    localStorage.setItem("usersList", JSON.stringify(allusers));
  } else {
    alert("Sorry, your browser do not support local storage.");
  }
}
function logout() {
  sessionStorage.clear();
  alert("log out..");
  location.href = "login.html";
}
function teamfun() {
  //   $('#addTaskModal').on('hidden.bs.modal', function () {
  //     $(this).find("input,textarea,select").val('').end();

  // });

  $("#addTaskModal").on("hidden.bs.modal", function () {
    $(this).removeData("bs.modal");
  });

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      allusers = JSON.parse(xhttp.responseText);
      _displayItems();
    }
  };
  xhttp.open("GET", uri, true);
  xhttp.send();
}

function _displayItems() {
  removeid = 0;
  updateid = 0;
  $("#profileForm #userDropdown").length = 0;
  const tBody = document.getElementById("teambox");
  tBody.innerHTML = "";
  const button = document.createElement("button");

  allusers.forEach((item) => {
    let currEdit = `edit(${item.id})`;
    let currDelete = `del(${item.id})`;

    let a = document.createElement("a");
    let aa = document.createElement("a");
    console.log(currEdit);
    let tr = tBody.insertRow();
    let td1 = tr.insertCell(0);
    let custid = document.createTextNode(item.id);
    td1.appendChild(custid);
    td1.setAttribute("style", "visibility:hidden;");
    let td2 = tr.insertCell(1);
    let taskname = document.createTextNode(item.name);
    td2.appendChild(taskname);
    let td3 = tr.insertCell(2);
    let description = document.createTextNode(item.password);
    td3.appendChild(description);
    td3.setAttribute("style", "visibility:hidden;");
    let td4 = tr.insertCell(3);
    let assigneto = document.createTextNode(item.role);
    td4.appendChild(assigneto);

    let td5 = tr.insertCell(4);
    a.setAttribute("href", "#editTaskModal");
    a.setAttribute("class", "edit");
    a.setAttribute("data-toggle", "modal");
    a.setAttribute("onclick", currEdit);
    a.setAttribute("class", "material-icons");
    // a.setAttribute('data-toggle', 'tooltip');
    a.setAttribute("title", "Edit");
    a.innerHTML = "&#xE254;";
    td5.appendChild(a);

    let td6 = tr.insertCell(5);
    // td8.appendChild(deleteButton);
    aa.setAttribute("href", "#deleteTaskModal");
    aa.setAttribute("class", "delete");
    aa.setAttribute("data-toggle", "modal");
    aa.setAttribute("onclick", currDelete);
    aa.setAttribute("class", "material-icons");
    // aa.setAttribute("data-toggle", "tooltip");
    aa.setAttribute("title", "Delete");
    aa.innerHTML = "&#xE872;";
    td6.appendChild(aa);
  });
  // teamtask = data;
  // addOptions();
}

function addOptions() {
  document.getElementById("userDropdown").innerHTML = "";
  $("#profileForm #userDropdown").length = 0;
  var jsonArray = JSON.parse(localStorage.getItem("usersList") || "[]");
  var userOnly = jsonArray.filter((person) => person.role === "U");
  var select = document.getElementById("userDropdown");
  var option;
  for (var i = 0; i < userOnly.length; i++) {
    option = document.createElement("option");
    option.text = userOnly[i]["username"];
    select.add(option);
  }
  console.log(addOptions);
}

function pwdMatching() {
  var password = document.getElementById("Password"),
    confirm_password = document.getElementById("CPassword");

  if (password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
    return;
  }
  if ((password.value = confirm_password.value)) {
    confirm_password.setCustomValidity("");
    save();
  }
}
function editpwdMatching() {
  var password = document.getElementById("editPassword"),
    confirm_password = document.getElementById("editCPassword");

  if (password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
    return;
  }
  if ((password.value = confirm_password.value)) {
    confirm_password.setCustomValidity("");
    update();
  }
}
function save() {
  var newallusers = {
    id: 0,
    name: document.getElementById("username").value,
    password: document.getElementById("Password").value,
    role: document.getElementById("userDropdown").value,
    userid: document.getElementById("userid").value,
    email: document.getElementById("email").value,
  };
  allusers.push(newallusers);

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", uri, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(newallusers));

  setallusers();
  teamfun();
}

function del(i) {
  // alert("deleting...." + " " + i);
  removeid = i;
  // allusers.splice(i, 1);
  // var xhttp = new XMLHttpRequest();
  // xhttp.open("DELETE", uri + i, true);
  // xhttp.setRequestHeader("Content-type", "application/json");
  // xhttp.send();
  // teamfun();
  // setallusers();
}
function remove() {
  // alert("deleting...." + " " + i);
  // allusers.splice(i, 1);
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", uri + removeid, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  // teamfun();
  // setallusers();
}

function edit(i) {
  // alert("EDITING" + " " + i);
  // $("#profileForm #userDropdown").length = 0;
  // $("#profileForm #userDropdown").empty();
  // var selectElem = document.getElementById("userDropdown");
  var selectElem = $("#profileForm").find('[id="userDropdown"]');
  console.log(selectElem);

  const item = allusers.find((item) => item.id === i);
  $("#profileForm").find('[id="username"]').val(item.name);
  $("#profileForm").find('[id="editPassword"]').val(item.password);
  $("#profileForm").find('[id="userDropdown"]').val(item.role);
  $("#profileForm").find('[id="userid"]').val(item.userid);
  $("#profileForm").find('[id="email"]').val(item.email);
  // $("#profileForm #userDropdown option:selected").text(),

  updateid = item.id;

  console.log(item);
  $.each(userOnly, function (index, value) {
    $("<option/>", {
      value: index,
      text: userOnly[index].name,
    }).appendTo(selectElem);
    console.log(userOnly);

    if (userOnly[index].name === item.assigneto) {
      console.log(userOnly[index].name + " = " + item.assigneto);
      $("#userDropdown option")
        .val(userOnly[index].name)
        .prop({ selected: true });
    }
  });
}

function update() {
  console.log("update " + updateid);

  var newallusers = {
    id: updateid,
    name: $("#profileForm").find('[id="username"]').val(),
    password: $("#profileForm").find('[id="editPassword"]').val(),
    role: $("#profileForm #userDropdown option:selected").val(),
    userid: $("#profileForm").find('[id="userid"]').val(),
    email: $("#profileForm").find('[id="email"]').val(),
  };

  console.log(newallusers);

  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", uri + updateid, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(newallusers));

  updateid = 0;
  teamfun();
}

teamfun();
// password.onchange = pwdMatching;
// confirm_password.onkeyup = pwdMatching;
