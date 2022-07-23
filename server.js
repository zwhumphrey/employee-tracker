const mysql = require("mysql2");
const inquirer = require("inquirer");
const db = require("./db/db.js");
require("console.table");

// const asciify = require("asciify");
// asciify("Employee Manager", function (err, res) {
//   console.log(res);
// });
// console.table();

// import inquirer from "inquirer";
// import Choices from "inquirer/lib/objects/choices";

startTracker();

function startTracker() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "Select a task to begin",
        choices: [
          {
            name: "View Departments",
            value: "VIEW_DEPARTMENTS",
          },
          {
            name: "View Roles",
            value: "VIEW_ROLES",
          },
          {
            name: "View Employees",
            value: "VIEW_EMPLOYEES",
          },
          {
            name: "Add Departments",
            value: "ADD_DEPARTMENTS",
          },
          {
            name: "Add Roles",
            value: "ADD_ROLES",
          },
          {
            name: "Add Employees",
            value: "ADD_EMPLOYEES",
          },
          {
            name: "Update Employee Role",
            value: "UPDATE_EMPLOYEE_ROLE",
          },
          {
            name: "Quit",
            value: "QUIT",
          },
        ],
      },
    ])
    .then((answer) => {
      switch (answer.choice) {
        case "VIEW_DEPARTMENTS":
          viewDepartments();
          break;

        case "VIEW_ROLES":
          viewRoles();
          break;

        case "VIEW_EMPLOYEES":
          viewEmployees();
          break;

        case "ADD_DEPARTMENTS":
          addDeparments();
          break;

        case "ADD_ROLES":
          addRoles();
          break;

        case "ADD_EMPLOYEES":
          addEmployees();
          break;

        case "UPDATE_EMPLOYEE_ROLE":
          updateEmployeeRole();
          break;
        // create function
        default:
          end();
      }
    });
}

//View Departments
function viewDepartments() {
  console.log("Viewing all Departments!");

  var query = `SELECT * FROM department`;

  db.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);

    startTracker();
  });
}
// add a join to change department id to department
//View Roles
function viewRoles() {
  console.log("Viewing all Roles!");

  var query = `SELECT * FROM role`;

  db.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);

    startTracker();
  });
}
// add join to view job/department/salary/manager
//View Employees
function viewEmployees() {
  console.log("Viewing all Employees!");

  var query = `SELECT * FROM employee`;

  db.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);

    startTracker();
  });
}
