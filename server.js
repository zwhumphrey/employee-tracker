const mysql = require("mysql2");
const inquirer = import("inquirer");
const asciify = require("asciify");
asciify("Employee Manager", function (err, res) {
  console.log(res);
});
// console.table();

// import inquirer from "inquirer";
// import Choices from "inquirer/lib/objects/choices";

function startTracker() {
  inquirer
    .prompt({
      type: "list",
      name: "yourCompany",
      message: "Select a task to begin",
      choice: [
        "View Departments",
        "View Roles",
        "View Employees",
        "Add Departments",
        "Add Roles",
        "Add Employees",
        "Update Employee Role",
      ],
    })
    .then(function ({ task }) {
      switch (task) {
        case "View Departments":
          viewDeparments();
          break;

        case "View Roles":
          viewRoles();
          break;

        case "View Employees":
          viewEmployees();
          break;

        case "Add Departments":
          addDeparments();
          break;

        case "Add Roles":
          addRoles();
          break;

        case "Add Employees":
          addEmployees();
          break;

        case "Update Employee role":
          updateEmployeeRole();
          break;
      }
    });
}

startTracker();
