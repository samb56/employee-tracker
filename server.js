
const inquirer = require("inquirer");
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const mysql = require('mysql2');
require('console.table');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',

    user: 'root',

    password: 'Brokencasedoorfloor99',
    database: 'employee_tracker'
  },
  console.log(`Connected to the employee_tracker database.`)
);

init()

function init() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'task',
      message: 'What would you like to do?',
      choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
    }
  ]).then(function (data) {
    switch (data.task) {
      case 'view all departments':
        return console.log('success'),
          viewDepartments()


        break;
      case 'view all roles':
        return console.log('success'),
          viewRoles()

        break;
      case 'view all employees':
        return console.log('success'),
          viewEmployees()

        break;
      default:
        break;
    }
  })
}






function viewRoles() {
  db.query('SELECT * FROM role;',
    function (err, result) {
      if (err) throw err;
      console.table(result);
      init();
    })

}

function viewEmployees() {
  db.query('SELECT * FROM employee;',
    function (err, result) {
      if (err) throw err;
      console.table(result);
      init();
    })

}



function viewDepartments() {
  db.query('SELECT * FROM department;',
    function (err, result) {
      if (err) throw err;
      console.table(result);
      init();
    })

}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});