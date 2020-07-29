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
        case "Add Employee": //*done
            return addEmployee();
        case "Remove Employee": //*done
            return removeEmployee();
        case "Update Employee Role":
            return updateEmployee();
        case "Update Employee Manager":
            return updateEmployeeManager();
        case "View All Roles":  //*done
            return viewAllRoles();
        case "Add Role": //TODO not working.
            return addRoles();
        case "Remove Role":
            return removeRoles();
        case "View All Departments":  //*done
            return viewAllDepartments();
        case "Add Department": //*done
            return addDepartment();
        case "Remove Department": //* done
            return removeDepartment();
        default:
            connection.end();
    };
};

// * COMPILE EMPLOYEE LIST 
const readEmployees = () => {
    connection.query("SELECT first_name, last_name FROM employee", (err, data) => {
        if (err) throw err;
        console.table(data);
    })
}

// * ADD DEPARTMENTS/ROLES/EMPLOYEES

const addEmployee = async () => {
    const {first_name, last_name, role_id, department_id} = await inquirer.prompt([
        {
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
            type: "input",
            name: "role_id",
            message: "Enter Employee's role id.",
            validate: (val) => isNaN(val) ? `'${val}' is not a valid role id.` :true
        },
        {
            type: "input",
            name: "department_id",
            message: "Enter Employee's department id.",
            validate: (val) => isNaN(val) ? `'${val}' is not a valid department id.` :true
        }
    ]);

    connection.query(
        "INSERT INTO employee SET ?",
        {
            first_name,
            last_name,
            role_id,
            department_id
        }, 
        (err) => {
            if (err) throw err;
            console.log(`You successfully added ${first_name} ${last_name}!`);
            start();
        }
    )
};

const addRoles = async () => {
    const {title, salary, department_id} = await inquirer.prompt([
        {
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
            type: "input",
            name: "department_id",
            message: "Enter the department id.",
            validate: (val) => isNaN(val) ? `'${val}' is not a valid department id.` :true
        }
    ]);

    connection.query(
        "INSERT INTO role SET ?",
        {
            title,
            salary,
            department_id
        }, 
        (err) => {
            if (err) throw err;
            console.log(`You successfully added ${title}!`);
            start();
        }
    )
};

const addDepartment = async () => {
    const {name} = await inquirer.prompt(
        {
            type: "input",
            message: "Enter the department you would like to add.",
            name: "name"
        });

    connection.query(
        "INSERT INTO department SET ?", 
        {
            name
        }, 
        (err) => {
            if (err) throw err;
            console.log(`You successfully added ${name}!`);
            start();
        }
    )    
};

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

const viewAllRoles = async () => {
    connection.query("SELECT title, salary, department_id, name FROM role LEFT JOIN department ON role.department_id=department.id", (err, data) => {
        if (err) throw err;
        console.table(data);
        start();
    });
};

const viewAllDepartments = async () => {
     connection.query("SELECT name FROM department", (err,data) => {
        if (err) throw err;
        console.table(data);
        start();
     });
};

// * UPDATE EMPLOYEE ROLES

const updateEmployee = async () => {
    readEmployees();
    // connection.query("SELECT * FROM employee", async (err, employees) =>{
        
    //     if (err) throw err;
    //     const {choice, role_id} = await inquirer.prompt([
    //         {
    //         type: "rawlist",
    //         message: "Which employee's role would you like to update?",
    //         name: "choice",
    //         choices: employees
    //     },
    //     {
    //         type: "input",
    //         message: "Enter employee's new role id.",
    //         name: "role_id"
    //     }
    // ]);

    //     const chosenEmployee = employees.find(employee => employee.last_name === choice);

    //     connection.query(
    //         "UPDATE employee SET ? WHERE ?", 
    //         [
    //             {
    //                 role_id: role_id
    //             },
    //             {
    //                 id: chosenEmployee.id
    //             }
    //         ], (err) => {
    //             if (err) throw err;
    //             console.log(`You updated ${choice}'s role!`);
    //             start();
    //         }
    //     )
    // })
}
// * REMOVE EMPLOYEE/DEPARTMENT/ROLES

const removeEmployee = async () => {
    const {last_name} = await inquirer.prompt({
        type: "input",
        message: "Enter the last name of the employee you would like to remove.",
        name: "last_name"
    });

    connection.query(
        "DELETE FROM employee WHERE ?", {last_name: last_name}, (err, data) => {
            if (err) throw err;
            console.log(data.affectedRows + " employee deleted!");
            start();
        }
    )
};

const removeRoles = async () => {
    const {title} = await inquirer.prompt({
        type: "input",
        name: "title",
        message: "Enter the role you would like to remove."
    });

    connection.query(
        "DELETE FROM role WHERE ?", {title: title}, (err, data) => {
            if (err) throw err;
            if (data.length) {
                console.log(`${title} successfully deleted`)
            } else {
                console.log("Enter a valid role.");
                
            }
            start();
        }
    );
};

const removeDepartment = async () => {
    const {name} = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "Enter the department you would like to remove."
    });

    connection.query(
        "DELETE FROM department WHERE ?", {name: name}, (err, data) => {
            if (err) throw err;
        
            console.log(`${name} successfully removed!`)
            
            start();
        }
    )
};
// ? VIEW TOTAL BUDGET (COMBINED SALARIES OF EMPLOYEES IN A DEPARTMENT)
// ? UPDATE EMPLOYEE MANAGERS
// ? VIEW EMPLOYEES BY MANAGER
// ? DELETE DEPARTMENTS/ROLES/EMPLOYEES