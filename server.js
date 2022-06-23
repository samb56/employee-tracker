
const inquirer = require("inquirer");
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const mysql = require('mysql2');
const cTable = require('console.table');

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
    },
    {
      when: data => data.task === 'view all departments' {


      const sql = `SELECT * FROM departments`;

      db.query(sql, (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json(
          console.log('success'),
          cTable([rows])
        );
      });
    }

    }
])}








app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});