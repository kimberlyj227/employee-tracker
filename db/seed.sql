INSERT INTO department (name)
VALUES ("SALES"), ("WAREHOUSE"), ("CUSTOMER SERVICE"), ("ACCOUNTING"), ("RECEPTION"), ("HUMAN RESOURCES");

-- '1','SALES'
-- '2','WAREHOUSE'
-- '3','CUSTOMER SERVICE'
-- '4','ACCOUNTING'
-- '5','RECEPTION'
-- '6','HUMAN RESOURCES'
-- '7', 'MANAGEMENT'
-- '8','OFFICE STAFF'



INSERT INTO role (title, salary, department_id)
VALUES ("SR Salesman", 80000, 1), ("Foreman", 50000, 2), ("JR Salesman", 60000, 1), ("Loader", 40000, 2), ("Customer Service Rep", 65000, 3), ("SR Accountant", 80000, 4), ("Accountant", 70000, 4), ("Receptionist", 40000, 5), ("HR Manager", 85000, 6), ("HR Generalist", 55000, 6), ("Receptionist", 40000, 5), ("Regional Manager", 90000, 7), ("Assistant to the Regional Manager", 80000, 7), ("Coorporate Manager", 100000, 7);

-- '1','SR Salesman','80000.00','1'
-- '2','Foreman','50000.00','2'
-- '3','JR Salesman','60000.00','1'
-- '4','Loader','40000.00','2'
-- '5','Customer Service Rep','65000.00','3'
-- '6','SR Accountant','80000.00','4'
-- '7','Accountant','70000.00','4'
-- '8','Receptionist','40000.00','5'
-- '9','HR Manager','85000.00','6'
-- '10','HR Generalist','55000.00','6'
-- '11','Receptionist','40000.00','5'
-- '12','Regional Manager','90000.00','7'
-- '13','AssT. to the Regional Manager','80000.00','7'
-- '14','Coorporate Manager','100000.00','7'
-- '15','CEO','120000.00','7'
-- '16','Temp','40000.00','8'
-- '17','Office Staff','40000.00','8'



INSERT INTO employee (first_name, last_name, role_id, department_id) 
VALUES ("Jim", "Halpert", 1, 1), ("Dwight", "Schrute", 13, 7), ("Andy", "Bernard", 1, 1), ("Stanley", "Hudson", 1, 1), ("Phylis", "Vance", 1, 1), ("Pam", "Beesly", 8, 5),  ("Ryan", "Howard", 16, 8), ("Ryan", "Howard", 16, 8), ("Michael", "Scott", 12, 7), ("Jan", "Levinson", 14, 7), ("Kevin", "Malone", 7, 4), ("Angela", "Martin", 6, 4), ("Oscar", "Martinez", 6, 4), ("Meredith", "Palmer", 17, 8), ("Creed", "Bratton", 17, 8), ("Toby", "Flenderson", 10, 6), ("Holly", "Flax", 9, 8), ("Kelly", "Kapoor", 5, 3), ("Darryl", "Philbin", 2, 2), ("Roy", "Anderson", 4, 2);