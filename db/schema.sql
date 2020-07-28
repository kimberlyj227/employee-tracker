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


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;