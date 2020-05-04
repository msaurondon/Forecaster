const checkedTimeframe = {
  monthly: false,
  weekly: false,
  daily: false,
  swift: false
};
const masterMessage = { month: "", week: "", day: "" };
var message = masterMessage;

function copyText(clickedID) {
  if (clickedID == "copyTitle") {
    var titleText = document.getElementById("titleBox");
    titleText.select();
    try {
      var success = document.execCommand("copy");
    } catch (err) {
      console.log("Failure to copy title");
    }
  } else if (clickedID == "copyBody") {
    var bodyText = document.getElementById("bodyBox");
    bodyText.select();
    try {
      var success = document.execCommand("copy");
    } catch (err) {
      console.log("Failure to copy body");
    }
  }
  //buildJSON('monthly');
}

function generateClicked() {
  var generate = 0;
  if (checkedTimeframe.monthly) {
    masterMessage.month = buildJSON("monthly");
    generate = 1;
  }
  if (checkedTimeframe.weekly) {
    masterMessage.week = buildJSON("weekly");
    generate = 1;
  }
  if (checkedTimeframe.daily) {
    masterMessage.day = buildJSON("daily");
    generate = 1;
  }

  if (generate == 1) {
    document.getElementById("titleBox").value = buildTitle(masterMessage);
    document.getElementById("bodyBox").value = buildMessage(masterMessage);
  }
}

function displayMonthly() {
  var x = document.getElementById("Monthly");
  if (x.style.display === "none") {
    x.style.display = "block";
    checkedTimeframe.monthly = true;
  } else {
    x.style.display = "none";
    checkedTimeframe.monthly = false;
  }

  viewCheckedStates();
}

function displayWeekly() {
  var x = document.getElementById("Weekly");
  if (x.style.display === "none") {
    x.style.display = "block";
    checkedTimeframe.weekly = true;
  } else {
    x.style.display = "none";
    checkedTimeframe.weekly = false;
  }

  viewCheckedStates();
}

function displayDaily() {
  var x = document.getElementById("Daily");
  if (x.style.display === "none") {
    x.style.display = "block";
    checkedTimeframe.daily = true;
  } else {
    x.style.display = "none";
    checkedTimeframe.daily = false;
  }

  viewCheckedStates();
}

function displaySwift() {
  var x = document.getElementById("Swift");
  if (x.style.display === "none") {
    x.style.display = "block";
    checkedTimeframe.swift = true;
  } else {
    x.style.display = "none";
    checkedTimeframe.swift = false;
  }

  viewCheckedStates();
}

function viewCheckedStates() {
  console.table(checkedTimeframe);
}
