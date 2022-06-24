
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
      case 'add a department':
        return console.log('success'),
          addDepartment()

        break;
      case 'add a role':
        return console.log('success'),
          addRole()

        break;
      default:
        break;
    }
  })
}






function viewRoles() {
  db.query('SELECT role.title, role.id, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id;',
    function (err, result) {
      if (err) throw err;
      console.table(result);
      init();
    })

}

function viewEmployees() {
  db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, name AS department, salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;',
    function (err, result) {
      if (err) throw err;
      console.table(result);
      init();
    })

}


function addDepartment() {


  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the new department?',

    }

  ]).then((data) => {
    let departmentName = JSON.stringify(data.name)
    db.query(`INSERT INTO department (name) VALUES('${departmentName}'); `,
      function (err, result) {
        if (err) throw err;
        console.table(result);
        init();
      })
  }
  )
}

function addRole() {

  db.query('SELECT * FROM department;',
    function (err, result) {



      const currentDepartments = []
      for (let i = 0; i < result.length; i++) {
        currentDepartments.push({ name: result[i].name, value: result[i].id })
      }

      inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'What is the title of the role?',

        },
        {
          type: 'input',
          name: 'salary',
          message: 'What is the salary of the role?',
        },
        {
          type: 'list',
          name: 'department',
          message: 'what department is this role a part of?',
          choices: currentDepartments,
        }

      ]).then((data) => {
        console.log(data.department)





        let roleDepartment = JSON.stringify(data.department)
        db.query(`INSERT INTO role (title, salary, department_id) VALUES('${data.title}', '${data.salary}', '${data.department}'); `,
          function (err, result) {
            if (err) throw err;
            console.table(result);
            init();
          })
      }
      )
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

function getRoleId() {
  db.query('SELECT * FROM role;',
    function (err, result) {
      if (err) throw err;
      console.log(result.legnth);

    })

}



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});