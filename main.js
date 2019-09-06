"use strict";

var form = document.getElementById("issueInputForm");

function fetchIssues() {
  var issues = JSON.parse(localStorage.getItem("issues"));
  var issuesList = document.getElementById("issuesList");

  issuesList.innerHTML = "";

  if (issues.length > 0) {
    for (var i = 0; i < issues.length; i++) {
      var id = issues[i].id;
      var desc = issues[i].description;
      var severity = issues[i].severity;
      var assignedTo = issues[i].assignedTo;
      var status = issues[i].status;

      issuesList.innerHTML +=
        '<div class="well">' +
        "<h6>Issue ID: " +
        id +
        "</h6>" +
        '<p><span class="label label-info">' +
        status +
        "</span></p>" +
        "<h3>" +
        desc +
        "</h3>" +
        '<p><span class="glyphicon glyphicon-time"></span> ' +
        severity +
        " " +
        '<span class="glyphicon glyphicon-user"></span> ' +
        assignedTo +
        "</p>" +
        // Close btn
        '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\'' +
        id +
        "')\">Close</a> " +
        // Delete btn
        '<a href="#" class="btn btn-danger" onclick="deleteIssue(\'' +
        id +
        "')\">Delete</a>" +
        "</div>";
    }
  }
}

form.addEventListener("submit", saveIssue);

function saveIssue(e) {
  var issueId = chance.guid();
  var issueDesc = document.getElementById("issueDescInput").value;
  var issueSeverity = document.getElementById("issueSeverityInput").value;
  var issueAssignedTo = document.getElementById("issueAssignedToInput").value;
  var issueStatus = "Open";

  var issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus
  };

  if (localStorage.getItem("issues") === null) {
    var issues = [];
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));
  } else {
    var issues = JSON.parse(localStorage.getItem("issues"));
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));
  }

  // reset the form
  form.reset();
  e.preventDefault();

  fetchIssues();
}

// Close Issue
function setStatusClosed(id) {
  var issues = JSON.parse(localStorage.getItem("issues"));

  issues.forEach(function(issue) {
    if (issue.id == id) {
      issue.status = "Closed";
    }
  });

  localStorage.setItem("issues", JSON.stringify(issues));

  fetchIssues();
}

// Delete Issue
function deleteIssue(id) {
  var issues = JSON.parse(localStorage.getItem("issues"));

  issues.forEach(function(issue, i) {
    if (issue.id == id) {
      issues.splice(i, 1);
    }
  });

  localStorage.setItem("issues", JSON.stringify(issues));

  fetchIssues();
}
