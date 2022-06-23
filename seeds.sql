USE employee_tracker;
INSERT INTO department (id, name)
VALUES ('1', 'field'), ('2', 'human resources'), ('3', 'accounting');

INSERT INTO roles (id, title, salary, department_id)
VALUES ('1', 'technitian', '50000', '1'), ('2', 'technitian manager', '75000', '1'), ('3', 'HR manager', '60000', '2'), ('4', 'accountant', '70000', '3');

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ('20', 'Frank', 'Wilson', '1', '5'), ('21', 'Emily', 'Tulip', '2', NULL), ('22', 'Francis', 'Fancisco', '3', '7');

