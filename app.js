// ------ Require --------
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');


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
//  -------- VARIABLES -----------
let employees = [];
let roles = [];
let departments = [];
const mainQuery = "SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON d.id = r.department_id LEFT JOIN employee m ON m.id = e.manager_id"

// ------ FUNCTIONS AND INQUIRER PROMPTS --------
// * START -------
const start = async () => {
    readEmployees();
    readRoles();
    readDepartments();
    const {
        action
    } = await inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees", "View all Employees By Department", "View All Employees by Manager", "View All Roles", "View All Departments", "View Department Budget", "Add Employee", "Add Role", "Add Department", "Update Employee Role", "Update Employee Manager", "Remove Employee", "Remove Role", "Remove Department", "Quit"]
    });

    switch (action) {
        case "View All Employees":
            return viewAll();
        case "View all Employees By Department":
            return viewEmployeeDept();
        case "View All Employees by Manager":
            return viewAllManager();
        case "Add Employee":
            return addEmployee();
        case "Remove Employee":
            return removeEmployee();
        case "Update Employee Role":
            return updateEmployee();
        case "Update Employee Manager":
            return updateEmployeeManager();
        case "View All Roles":
            return viewAllRoles();
        case "Add Role":
            return addRoles();
        case "Remove Role":
            return removeRoles();
        case "View All Departments":
            return viewAllDepartments();
        case "Add Department":
            return addDepartment();
        case "Remove Department":
            return removeDepartment();
        case "View Department Budget":
            return viewDeptBudget();
        default:
            connection.end();
    };
};

// * COMPILE EMPLOYEE/ROLE LIST 
const readEmployees = () => {

    connection.query("SELECT * FROM employee", (err, data) => {
        if (err) throw err;
        // console.log(data);
        employees = data.map(({
            id,
            first_name,
            last_name
        }) => ({
            value: id,
            name: `${first_name} ${last_name}`
        }));
    })
};

const readRoles = () => {
    const query = "SELECT * FROM role"
    connection.query(query, (err, data) => {
        if (err) throw err;
        roles = data.map(({
            id,
            title,
            salary
        }) => ({
            value: id,
            name: title,
            salary: salary
        }));
    })
};

const readDepartments = () => {
    const query = "SELECT * FROM department"
    connection.query(query, (err, data) => {
        if (err) throw err;
        departments = data.map(({
            id,
            name
        }) => ({
            value: id,
            name: name
        }));
    })
}

// * ADD DEPARTMENTS/ROLES/EMPLOYEES

const addEmployee = async () => {
    const {
        first_name,
        last_name,
        role_id,
        manager_id
    } = await inquirer.prompt([{
            type: "input",
            name: "first_name",
            message: "Enter Employee's first name."
        },
        {
            type: "input",
            name: "last_name",
            message: "Enter Employee's last name."
        },
        {
            type: "list",
            name: "role_id",
            message: "Enter Employee's role.",
            choices: roles
        },
        {
            type: "list",
            name: "manager_id",
            message: "Choose the employee's manager.",
            choices: employees
        }
    ]);

    connection.query(
        "INSERT INTO employee SET ?", {
            first_name,
            last_name,
            role_id,
            manager_id
        },
        (err) => {
            if (err) throw err;
            console.log(`You successfully added ${first_name} ${last_name}! \n`);
            start();
        }
    )
};

const addRoles = async () => {
    const {
        title,
        salary,
        department_id
    } = await inquirer.prompt([{
            type: "input",
            name: "title",
            message: "Enter job title."
        },
        {
            type: "input",
            name: "salary",
            message: "Enter salary",
            validate: (val) => isNaN(val) ? `'${val}' is not a valid role id.` : true
        },
        {
            type: "list",
            name: "department_id",
            message: "Choose the department.",
            choices: departments
        }
    ]);

    connection.query(
        "INSERT INTO role SET ?", {
            title,
            salary,
            department_id
        },
        (err) => {
            if (err) throw err;
            console.log(`You successfully added ${title}! \n`);
            start();
        }
    )
};

const addDepartment = async () => {
    const {
        name
    } = await inquirer.prompt({
        type: "input",
        message: "Enter the name of the department you would like to add.",
        name: "name"
    });

    connection.query(
        "INSERT INTO department SET ?", {
            name
        },
        (err) => {
            if (err) throw err;
            console.log(`You successfully added ${name}! \n`);
            start();
        }
    )
};

// * VIEW DEPARTMENTS/ROLES/EMPLOYEES

const viewAll = () => {
    connection.query(mainQuery, (err, data) => {
        if (err) throw err;
        console.table(data);
        start();
    })
};

const viewEmployeeDept = async () => {
    const {
        department
    } = await
    inquirer.prompt({
        type: "list",
        name: "department",
        message: "Choose Department",
        choices: departments
    });

    connection.query(`${mainQuery} WHERE d.id =?`, [department], (err, data) => {
        if (err) throw err;
        console.table(data);
        start();
    });


};

const viewAllRoles = async () => {
    connection.query("SELECT title, salary, department_id, name FROM role LEFT JOIN department ON role.department_id=department.id", (err, data) => {
        if (err) throw err;
        console.table(data);
        start();
    });
};

const viewAllDepartments = async () => {
    connection.query("SELECT name FROM department", (err, data) => {
        if (err) throw err;
        console.table(data);
        start();
    });
};

// * UPDATE EMPLOYEE ROLES

const updateEmployee = async () => {


    const {
        choice,
        role_id,
    } = await inquirer.prompt([{
            type: "list",
            message: "Which employee's role would you like to update?",
            name: "choice",
            choices: employees
        },
        {
            type: "list",
            message: "Choose the employee's new role.",
            name: "role_id",
            choices: roles

        },

    ]);

    connection.query(
        "UPDATE employee SET ? WHERE ?",
        [{
                role_id: role_id,
            },
            {
                id: choice
            }
        ], (err) => {
            if (err) throw err;
            console.log(`You updated ${choice}'s role! \n`);
            start();
        }
    )
}

// TODO--------- BONUS -----------
// ? DELETE DEPARTMENTS/ROLES/EMPLOYEES
const removeEmployee = async () => {
    const {
        employeeID
    } = await inquirer.prompt({
        type: "list",
        message: "Choose the employee you would like to remove.",
        name: "employeeID",
        choices: employees
    });

    connection.query(
        "DELETE FROM employee WHERE ?", {
            id: employeeID
        }, (err, data) => {
            if (err) throw err;
            console.log(data.affectedRows + " employee deleted! \n");
            start();
        }
    )
};

const removeRoles = async () => {
    const {
        title
    } = await inquirer.prompt({
        type: "list",
        name: "title",
        message: "Enter the role you would like to remove.",
        choices: roles
    });

    connection.query(
        "DELETE FROM role WHERE ?", {
            id: title
        }, (err, data) => {
            if (err) throw err;

            console.log(data.affectedRows + " successfully deleted \n")
            start();
        }
    );
};

const removeDepartment = async () => {
    const {
        name
    } = await inquirer.prompt({
        type: "list",
        name: "name",
        message: "Choose the department you would like to remove.",
        choices: departments
    });

    connection.query(
        "DELETE FROM department WHERE ?", {
            id: name
        }, (err, data) => {
            if (err) throw err;

            console.log(data.affectedRows + " successfully deleted \n")

            start();
        }
    )
};
// ? VIEW TOTAL BUDGET (COMBINED SALARIES OF EMPLOYEES IN A DEPARTMENT)
const viewDeptBudget = async () => {
    const {
        budget
    } = await inquirer.prompt({
        type: "list",
        name: "budget",
        message: "Choose department to view budget",
        choices: departments
    });

    connection.query("SELECT department_id, department.name AS department, SUM(salary) totalSalary FROM role INNER JOIN department ON role.department_id=department.id WHERE department_id = ?", [budget], (err, data) => {
        if (err) throw err;
        console.table(data);
        start();
    });
}

// ? UPDATE EMPLOYEE MANAGERS

const updateEmployeeManager = async () => {


    const {
        choice,
        manager_id,
    } = await inquirer.prompt([{
            type: "list",
            message: "Which employee's role would you like to update?",
            name: "choice",
            choices: employees
        },
        {
            type: "list",
            message: "Choose the employee's new role.",
            name: "manager_id",
            choices: employees

        },

    ]);

    connection.query(
        "UPDATE employee SET ? WHERE ?",
        [{
                manager_id: manager_id,
            },
            {
                id: choice
            }
        ], (err) => {
            if (err) throw err;
            console.log(`You updated ${choice}'s manager! \n`);
            start();
        }
    )
}

// ? VIEW EMPLOYEES BY MANAGER

const viewAllManager = async () => {
    const {
        manager
    } = await
    inquirer.prompt({
        type: "list",
        name: "manager",
        message: "Choose Manager",
        choices: employees
    });

    connection.query(`${mainQuery} WHERE e.manager_id =?`, [manager], (err, data) => {
        if (err) throw err;
        if (data) {
            console.table(data);
        } else {
            console.log("This employee is not a manager");
        }
        start();
    });
}