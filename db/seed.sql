INSERT INTO department (name)
VALUES ("SALES"), 
("WAREHOUSE"), 
("CUSTOMER SERVICE"), 
("ACCOUNTING"), 
("RECEPTION"), 
("HUMAN RESOURCES"), 
("MANAGEMENT"), 
("OFFICE STAFF");

-- ROLE TABLE --
INSERT INTO role (title, salary, department_id)
VALUES ("SR Salesman", 80000, 1), 
("Foreman", 50000, 2), 
("JR Salesman", 60000, 1), 
("Loader", 40000, 2), 
("Customer Service Rep", 65000, 3), 
("SR Accountant", 80000, 4), 
("Accountant", 70000, 4), 
("Receptionist", 40000, 5), 
("HR Manager", 85000, 6), 
("HR Generalist", 55000, 6), 
("Receptionist", 40000, 5), 
("Regional Manager", 90000, 7), 
("Asst. to the Regional Manager", 80000, 7), 
("Coorporate Manager", 100000, 7), 
("Vice President", "150000", 7), 
("Office Staff", 40000, 8);

-- EMPLOYEE TABLE --
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Michael", "Scott", 12, 7), 
("David", "Wallace",15 , 2),
 ("Jan", "Levinson", 14, 2),
("Jim", "Halpert",1, 1), 
("Dwight", "Schrute", 13, 1), 
("Andy", "Bernard", 1, 1),  
("Stanley", "Hudson", 1, 1), 
("Phylis", "Vance", 1, 1), 
("Pam", "Beesly", 8, 1),  
("Ryan", "Howard", 16, 1), 
("Kevin", "Malone", 7, 1), 
("Angela", "Martin", 6, 1), 
("Oscar", "Martinez", 6, 1), 
("Meredith", "Palmer", 17, 1), 
("Creed", "Bratton", 17, 1), 
("Toby", "Flenderson", 10, 2), 
("Holly", "Flax", 9, 2), 
("Kelly", "Kapoor", 5, 18), 
("Darryl", "Philbin", 2, 1), 
("Roy", "Anderson", 4, 19);