const uri = "http://localhost:8080/api/alltasks/";
var allTasks=[];
var colors=[];

function getData() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // _displayItems(JSON.parse(xhttp.responseText));
      allTasks = JSON.parse(xhttp.responseText);
      console.log("xhttp.responseText count " + xhttp.responseText.length);
      console.log("allWorklogs count " + allTasks.length);
      console.log(Object.values(allTasks));
    }
  };
  xhttp.open("GET", uri, true);
  xhttp.send();
}
function drawChart() {
  var counts = allTasks.reduce((p, c) => {
    var name = c.status;
    if (name === null) {
      name = "Not yet started";
    }
    if (!p.hasOwnProperty(name)) {
      p[name] = 0;
    }
    p[name]++;
    return p;
  }, {});

  console.log(counts);

  groups = ["status", "assigneto"];
  grouped = {};

  allTasks.forEach(function (a) {
    groups
      .reduce(function (o, g, i) {
        // take existing object,
        o[a[g]] = o[a[g]] || (i + 1 === groups.length ? [] : {}); // or generate new obj, or
        return o[a[g]]; // at last, then an array
      }, grouped)
      .push(a);
  });

  console.log(grouped);

  // Bar chart
  new Chart(document.getElementById("bar-chart"), {
    type: "bar",
    data: {
      labels: Object.keys(counts),
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2"],
          data: Object.values(counts),
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Predicted world population (millions) in 2050",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              min: 0,
              max: 10,
              stepSize: 1,
            },
          },
        ],
      },
    },
  });
}
