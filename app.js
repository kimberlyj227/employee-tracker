// ------ Require --------
const mysql = require("mysql");
const inquirer = require("inquirer");


// ------ Connection to DB --------
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "kimberly123",
    database: "employeeDB"
});

// connection to db
connection.connect(err => {
    if (err) throw err;
    start();
});

// ------ FUNCTIONS AND INQUIRER PROMPTS --------
// * START -------
const start = async () => {
    const {
        action
    } = await inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees", "View all Employees By Department", "View All Employees by Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View All Roles", "Add Role", "Remove Role", "View All Departments", "Add Department", "Remove Department", "Quit"]
    });

    switch (action) {
        case "View All Employees": //*done
            return viewAll();
        case "View all Employees By Department": //*done
            return viewEmployeeDept();
        case "View All Employees by Manager":
            return viewAllManager();
        case "Add Employee":
            return addEmployee();
        case "Remove Employee":
            return removeEmployee();
        case "Update Employee role":
            return updateEmployee();
        case "Update Employee Manager":
            return updateEmployeeManager();
        case "View All Roles":
            return viewAllRoles();
        case "Add Roles":
            return addRoles();
        case "Remove Roles":
            return removeRoles();
        case "View All Departments":
            return viewAllDepartments();
        case "Add Department":
            return addDepartment();
        case "Remove Department":
            return removeDepartment();
        default:
            connection.end();
    }
};

// * ADD DEPARTMENTS/ROLES/EMPLOYEES

// * VIEW DEPARTMENTS/ROLES/EMPLOYEES

const viewAll = () => {
    connection.query("SELECT * FROM employee", (err, data) => {
        if (err) throw err;
        console.table(data);
        start();
    })
};

const viewEmployeeDept = async () => {
    const {department} = await 
    inquirer.prompt({
        type: "list",
        name: "department",
        message: "Choose Department",
        choices: ["Sales", "Warehouse", "Customer Service", "Accounting", "Reception", "Human Resources", "Management", "Office Staff"]
    });

    connection.query("SELECT first_name, last_name, name FROM employee INNER JOIN department ON employee.department_id = department.id WHERE department.name =?", [department], (err, data) => {
        if (err) throw err;
        console.table(data);
        start();
    });


};

const viewAllRoles = async () =>{
    
};

// * UPDATE EMPLOYEE ROLES
// ? VIEW TOTAL BUDGET (COMBINED SALARIES OF EMPLOYEES IN A DEPARTMENT)
// ? UPDATE EMPLOYEE MANAGERS
// ? VIEW EMPLOYEES BY MANAGER
// ? DELETE DEPARTMENTS/ROLES/EMPLOYEES