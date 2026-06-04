-- Employees & Departments Dataset
-- Sample dataset for practice

CREATE TABLE departments_ed (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL,
    location VARCHAR(50),
    manager_id INT
);

CREATE TABLE employees_ed (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    job_title VARCHAR(50),
    salary DECIMAL(10, 2),
    department_id INT,
    manager_id INT,
    hire_date DATE,
    FOREIGN KEY (department_id) REFERENCES departments_ed(department_id),
    FOREIGN KEY (manager_id) REFERENCES employees_ed(employee_id)
);

CREATE TABLE salaries_ed (
    salary_id INT PRIMARY KEY,
    employee_id INT NOT NULL,
    salary_amount DECIMAL(10, 2),
    from_date DATE,
    to_date DATE,
    FOREIGN KEY (employee_id) REFERENCES employees_ed(employee_id)
);

-- Sample Data
INSERT INTO departments_ed VALUES
(1, 'Sales', 'New York', NULL),
(2, 'Engineering', 'San Francisco', NULL),
(3, 'HR', 'New York', NULL),
(4, 'Finance', 'Boston', NULL);

INSERT INTO employees_ed VALUES
(101, 'John Smith', 'Manager', 80000, 1, NULL, '2018-01-15'),
(102, 'Jane Doe', 'Sales Rep', 50000, 1, 101, '2019-02-20'),
(103, 'Bob Johnson', 'Sales Rep', 52000, 1, 101, '2019-03-10'),
(104, 'Alice Williams', 'Engineer', 95000, 2, 105, '2020-01-10'),
(105, 'Charlie Brown', 'Senior Engineer', 120000, 2, NULL, '2017-05-15'),
(106, 'Diana Prince', 'HR Specialist', 60000, 3, NULL, '2019-07-01'),
(107, 'Eve Wilson', 'Accountant', 65000, 4, NULL, '2018-09-15');

INSERT INTO salaries_ed VALUES
(1, 101, 75000, '2018-01-15', '2020-01-01'),
(2, 101, 80000, '2020-01-01', NULL),
(3, 102, 45000, '2019-02-20', '2021-01-01'),
(4, 102, 50000, '2021-01-01', NULL),
(5, 104, 90000, '2020-01-10', '2022-01-01'),
(6, 104, 95000, '2022-01-01', NULL),
(7, 105, 110000, '2017-05-15', '2021-01-01'),
(8, 105, 120000, '2021-01-01', NULL);
