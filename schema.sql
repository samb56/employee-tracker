DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

USE employee_tracker;
CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30)
);
CREATE TABLE role (
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
title VARCHAR(30),
salary DECIMAL,
department_id INT,
FOREIGN KEY (department_id)
REFERENCES department(id)
ON DELETE SET NULL
);
CREATE TABLE employee (
id INT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT,
FOREIGN KEY (role_id) 
REFERENCES role(id) 
);
USE employee_tracker;
SELECT * FROM role
JOIN department ON role.department_id = department.id;
SELECT * FROM employee;

SELECT role.title, role.id, role.salary, department.name AS department FROM role
JOIN department ON role.department_id = department.id;

USE employee_tracker;

SELECT employee.id, employee.first_name, employee.last_name, role.title, name AS department, salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee
INNER JOIN role ON employee.role_id = role.id 
INNER JOIN department ON role.department_id = department.id
LEFT JOIN employee manager on manager.id = employee.manager_id;

SELECT * FROM role;
SELECT * FROM department;