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
// job title, role id, the department that role belongs to, and the salary
//View Roles
function viewRoles() {
  console.log("Viewing all Roles!");

  var query = `SELECT r.title, r.id, d.name AS department, r.salary
  FROM role r
  LEFT JOIN department d
	ON r.department_id = r.id`;

  db.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);

    startTracker();
  });
}
// view job/department/salary/manager
//View Employees
function viewEmployees() {
  var query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employee e
  LEFT JOIN role r
	ON e.role_id = r.id
  LEFT JOIN department d
  ON d.id = r.department_id
  LEFT JOIN employee m
	ON m.id = e.manager_id`;

  db.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);

    startTracker();
  });
}
