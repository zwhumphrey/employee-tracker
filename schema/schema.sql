DROP DATABASE IF EXISTS tracker;

CREATE DATABASE tracker;



USE tracker;

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(30) NULL
);

CREATE TABLE role (
    id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NULL,
    salary DECIMAL(10.2) NULL,
    department_id INT NULL
);

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT NULL,
    manager_id INT NULL
);
