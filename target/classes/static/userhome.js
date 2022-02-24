const uri = "http://localhost:8080/api/worklogs/";
const usersTasksuri = "http://localhost:8080/api/alltasks/";
var updateid = 0 ;
var AllWorklogs ;
var allLogs=[];
// = JSON.parse(localStorage.getItem("workLogList") || "[]");
let loginuser = sessionStorage.getItem("loginuser");
let allTasks;
let mytasks;

// var worklogs = AllWorklogs.filter(person => person.empname === loginuser);
updateindex = 0;
// localStorage.setItem("teamtaskList", JSON.stringify(teamtask));

$(document).ready(function () {
  //   });
  // Activate tooltip
  $('[data-toggle="tooltip"]').tooltip();
  // Select/Deselect checkboxes
  var checkbox = $('table tbody input[type="checkbox"]');
  $("#selectAll").click(function () {
    if (this.checked) {
      checkbox.each(function () {
        this.checked = true;
      });
    } else {
      checkbox.each(function () {
        this.checked = false;
      });
    }
  });
  checkbox.click(function () {
    if (!this.checked) {
      $("#selectAll").prop("checked", false);
    }
  });
});

function setteamtask() {
  if (localStorage) {
    localStorage.setItem("workLogList", JSON.stringify(AllWorklogs));
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
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      
      allLogs=(JSON.parse(xhttp.responseText).filter(person => person.empname === loginuser));
      let mylogs=allLogs.map(o => ({duration: "", ...o}))
      // _displayItems(JSON.parse(xhttp.responseText).filter(person => person.empname === loginuser));
      _displayItems(mylogs);
      console.log(JSON.parse(xhttp.responseText));
    }
  };
  xhttp.open("GET", uri, true);
  xhttp.send();
}

function _displayItems(data) {
  console.log(data);
  $("#profileForm #taskDropdown").length = 0;
  const tBody = document.getElementById("teambox");
  tBody.innerHTML = "";
  const button = document.createElement("button");

  data.forEach((item) => {
    let currEdit = `edititem(${item.id})`;
    let currDelete = `del(${item.id})`;

    let a = document.createElement("a");
    let aa = document.createElement("a");
    console.log(currEdit);
    let tr = tBody.insertRow();
    let td1 = tr.insertCell(0);
    let custid = document.createTextNode(item.empname);
    td1.appendChild(custid);
    let td2 = tr.insertCell(1);
    let taskname = document.createTextNode(item.taskname);
    td2.appendChild(taskname);
    let td3 = tr.insertCell(2);
    let description = document.createTextNode(item.date);
    td3.appendChild(description);
    let td4 = tr.insertCell(3);
    let assigneto = document.createTextNode(item.stime);
    td4.appendChild(assigneto);
    let td5 = tr.insertCell(4);
    let assignedate = document.createTextNode(item.etime);
    td5.appendChild(assignedate);
    let td6 = tr.insertCell(5);
    var cDate=new Date().toISOString().slice(0, 10);
    var rDate =new Date(item.date).toISOString().slice(0, 10);
    let status = document.createTextNode(parseInt(item.etime)-parseInt(item.stime));
    td6.appendChild(status);
    let td7 = tr.insertCell(6);
    let duedate = document.createTextNode(item.status);
    td7.appendChild(duedate);
    let td8 = tr.insertCell(7);
    a.setAttribute("href", "#editTaskModal");
    a.setAttribute("class", "edit");
    a.setAttribute("data-toggle", "modal");
    a.setAttribute("onclick", currEdit);
    a.setAttribute("class", "material-icons");
    // a.setAttribute('data-toggle', 'tooltip');
    a.setAttribute("title", "Edit");
    a.innerHTML = "&#xE254;";
    td8.appendChild(a);

    let td9 = tr.insertCell(8);
    // td8.appendChild(deleteButton);
    aa.setAttribute("href", "#deleteTaskModal");
    aa.setAttribute("class", "delete");
    aa.setAttribute("data-toggle", "modal");
    aa.setAttribute('onclick', currDelete);
    aa.setAttribute("class", "material-icons");
    // aa.setAttribute("data-toggle", "tooltip");
    aa.setAttribute("title", "Delete");
    aa.innerHTML = "&#xE872;";
    td9.appendChild(aa);
  });
  teamtask = data;
  // $("#profileForm").find('[id="name"]').val(loginuser);
  document.getElementById("name").value=loginuser;
  addOptions();
}

function addOptions() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      allTasks = JSON.parse(xhttp.responseText);
      // mytasks = allTasks.filter(person => person.assigneto === loginuser && person.status!="Completed");
      mytasks = allTasks.filter(person => person.assigneto === loginuser);

      // console.log(JSON.parse(xhttp.responseText));
      console.log(mytasks);
      document.getElementById("taskDropdown").innerHTML = "";
      console.log(mytasks.length);
      var select = document.getElementById("taskDropdown");
      var option;
      for (var i = 0; i < mytasks.length; i++) {
        option = document.createElement("option");
        console.log(mytasks[i]["taskname"]);
        option.text = mytasks[i]["taskname"];
        select.add(option);
      }
    }
  };
  xhttp.open("GET", usersTasksuri, true);
  xhttp.send();
}

function edititem(id) {
  //   alert(id);
  updateid = id;

  $("#profileForm #taskDropdown").length = 0;
  $("#profileForm #taskDropdown").empty();
  const item = teamtask.find((item) => item.id === id);
  $("#profileForm").find('[id="name"]').val(item.empname);
  $("#profileForm").find('[id="date"]').val(item.date);
  $("#profileForm").find('[id="startingtime"]').val(item.stime);
  $("#profileForm").find('[id="endingtime"]').val(item.etime);
  // $("select[id$='profileForm #userDropdown']").val(item.assignedto);
  // $("#profileForm")
  //   .find('[id="assignedate"]')
  //   .val(new Date(item.date).toISOString().slice(0, 10));
  // $("#profileForm")
  //   .find('[id="duedate"]')
  //   .val(new Date(item.duedate).toISOString().slice(0, 10));

  var selectElem = $("#profileForm").find('[id="taskDropdown"]');
  // Iterate over object and add options to select
  console.log(selectElem);

  $.each(mytasks, function (index, value) {
    $("<option/>", {
      value: index,
      text: mytasks[index].taskname,
    }).appendTo(selectElem);

    if (mytasks[index].taskname === item.taskname) {
      console.log(mytasks[index].taskname + " = " + item.taskname);
      $("#taskDropdown option")
        .val(mytasks[index].taskname)
        .prop({ selected: true });
    }
  });
}

function save() {
  console.log("save function called");
  var newlog = {
    id: 0,
    empname: document.getElementById("name").value,
    taskname: document.getElementById("taskDropdown").value,
    date: document.getElementById("date").value,
    stime: document.getElementById("startingtime").value,
    etime: document.getElementById("endingtime").value,
    status: document.getElementById("status").value
  };  

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", uri, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(newlog));

  // setteamtask();
  teamfun();
  // var newtime = {
  //   Employee_name: document.getElementById("name").value,
  //   taskname: document.getElementById("taskDropdown").value,
  //   date: document.getElementById("date").value,
  //   starttime: document.getElementById("startingtime").value,
  //   endtime: document.getElementById("endingtime").value,
  //   status: document.getElementById("status").value,
  // };
  // // console.log(index);
  // worklogs.push(newtime);
  // AllWorklogs.push(newtime);
  // setteamtask();
  // taskfun();
}

function edit(i) {
  updateid = i;
  // console.log("edit is called")
  // addOptions();
  //   $(
  //     "#profileForm #userDropdown"
  //   ).length = 0;
// console.log(  $('#profileForm #taskDropdown')[0].options.length)
  $('#profileForm #taskDropdown')[0].options.length = 0;
  var jsonArray = JSON.parse(localStorage.getItem("teamtaskList") || "[]");
  // var mytasks = jsonArray.filter(person => person.assignedto === loginuser);
  // console.log(jsonArray)
  var userOnly = jsonArray.filter(person => person.assignedto === loginuser);
  // console.log(userOnly)
  var selectElem = $("#profileForm").find('[id="taskDropdown"]');
  console.log(selectElem)
  // Iterate over object and add options to select
  $.each(userOnly, function (index, value) {
    $("<option/>", {
      value: index,
      text: userOnly[index].taskname,
    }).appendTo(selectElem);
    // console.log(selectElem);
    if (userOnly[index].taskname === jsonArray[i].taskname) {
      console.log(userOnly[index].taskname + " = " + jsonArray[i].taskname);
      // $("#profileForm #userDropdown").text(teamtask[i].assignedto).prop({selected: true});
      // $('#userDropdown option').val("Vishnu")
      $('#taskDropdown option').val(jsonArray[i].taskname).prop({
        selected: true
      });
      // .removeAttr('selected')
      // .filter('[value='+teamtask[i].assignedto+']')
      // .attr('selected', true);
    }
  });
  // // Iterate over object and add options to select
  // $.each(userOnly, function (index, value) {
  //   $("<option/>", {
  //   value: index,
  //   text: userOnly[index].username,
  //   }).appendTo(selectElem);
  // });
  // alert("edit");
  $("#profileForm").find('[id="name"]').val(worklogs[i].empname);
  $("select[id$='profileForm #taskDropdown']").val(worklogs[i].taskname);
 console.log(worklogs[i].starttime);
  $("#profileForm").find('[id="date"]').val(worklogs[i].date);
  $("#profileForm").find('[id="startingtime"]').val(worklogs[i].starttime);
  $("#profileForm").find('[id="endingtime"]').val(worklogs[i].endtime);
  // $("#profileForm").find('[id="status"]').val(worklogs[i].status);
  console.log(  $("#profileForm").find('[id="status"]').val(worklogs[i].status)
  )
  // document.getElementById("description").value = teamtask[i].description;
  // document.getElementById("userDropdown").value = teamtask[i].assignedto;
  // document.getElementById("assignedate").value = teamtask[i].assignedate;
  // document.getElementById("duedate").value = teamtask[i].duedate;
  // document.getElementById('button').innerHTML = "Update";
  // updateindex = i;
  //console.log(updateindex);
}
function update() {
  console.log("update " + updateid);
  var newlog = {
    id: updateid,
    empname: $("#profileForm").find('[id="name"]').val(),
    taskname: $("#profileForm #taskDropdown option:selected").text(),
    date: $("#profileForm").find('[id="date"]').val(),
    stime: $("#profileForm").find('[id="startingtime"]').val(),
    etime: $("#profileForm").find('[id="endingtime"]').val(),
    status: $("#profileForm #status option:selected").text()
  };

  console.log(newlog);

  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", uri +updateid , true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(newlog));

  updateid=0;
}
function del(i) {
  console.log(i);
  // AllWorklogs.splice(i, 1);
  // worklogs.splice(i, 1);
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", uri +i , true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  teamfun();
  setteamtask();
}
function utest() {
  $(".htoggler").prop("checked", false);
}


function myFunction1(curDiv) {

 var x = document.getElementById(curDiv);
  if (curDiv === "1") {
    // alert("er")
    
    document.getElementById("inprocessboxTable").style.display = "none";
    // document.getElementById("taskSummary").style.display = "none";
    document.getElementById("worklogSummary").style.display = "block";
  }
  
  if (curDiv === "inprocessboxTable") {
   
    document.getElementById("inprocessboxTable").style.display = "block";
    // document.getElementById("taskSummary").style.display = "none";
    document.getElementById("worklogSummary").style.display = "block";
  }
  // if (curDiv === "taskSummary") {
    
  //   document.getElementById("searchBox").style.display = "none";
  //   document.getElementById("taskSummary").style.display = "block";
  //   document.getElementById("statusTable").style.display = "block";
  // }
  
  utest();
}