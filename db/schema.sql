DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10, 2) NULL,
  department_id INTEGER(10) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER(10) NULL,
  department_id INTEGER(10) NULL,
  PRIMARY KEY (id)
);

-- Main Query --
SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, 
CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employee e
  LEFT JOIN role r
	ON e.role_id = r.id
  LEFT JOIN department d
  ON d.id = r.department_id
  LEFT JOIN employee m
	ON m.id = e.manager_id;

  -- view by department --
SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee 
LEFT JOIN role ON employee.role_id = role.id 
LEFT JOIN department ON department.id = role.department_id 
LEFT JOIN employee m ON m.id = employee.manager_id WHERE department.id =1;

-- BUDGET --
SELECT department_id,
    department.name AS department,
    SUM(salary) totalSalary
    FROM
    department 
INNER JOIN role
	ON department.id=role.department_id
    WHERE department.id =?

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;