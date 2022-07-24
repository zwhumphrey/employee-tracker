const mysql = require("mysql2");
const inquirer = require("inquirer");
const db = require("./db/db.js");
require("console.table");

const asciify = require("asciify");
asciify("Employee Manager", function (err, res) {
  console.log(res);
  startTracker();
});

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
        case "QUIT":
          db.end();
          break;
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
  console.log("Viewing all Employees!");
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

// add department

// add role
// enter the name, salary, and department

// add employee
// enter the employee’s first name, last name, role, and manager

function addEmployees() {
  console.log("Add new employee!");

  var query = `SELECT r.id, r.title, r.salary 
        FROM role r`;

  db.query(query, function (err, res) {
    if (err) throw err;

    const empRole = res.map(({ id, title, salary }) => ({
      value: id,
      title: `${title}`,
      salary: `${salary}`,
    }));

    console.table(res);

    insert(empRole);
  });
}

function insert(empRole) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "roleId",
        message: "What is the employee's role?",
        choices: empRole,
      },
    ])
    .then(function (answer) {
      console.log(answer);

      var query = `INSERT INTO employee SET ?`;
      // when finished prompting, insert a new item into the db with that info
      db.query(
        query,
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.roleId,
          manager_id: answer.managerId,
        },
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log("Inserted successfully!\n");

          startTracker();
        }
      );
    });
}

// Update employee
// select an employee to update and their new role
