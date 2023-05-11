INSERT INTO department (name)
VALUES  ('Finance'), 
        ('Accounting'), 
        ('Engineering'), 
        ('Human Resources'),
        ('Legal');


INSERT INTO role (title, salary, department_id) 
VALUES  ('Finance Manager', 150000, 1),
        ('Finance Analyst', 55000, 1),
        ('Accounting Manager', 110000, 2),
        ('Accountant', 60000, 2),
        ('QA Lead', 150000, 3),
        ('QA Engineer', 80000, 3),
        ('HR Manager', 85000, 4),
        ('Talent specialist', 50000, 4),
        ('Corporate Lawyer', 130000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Peter', 'Parker', 1, NULL),
        ('Michael', 'Scott', 2, 1),
        ('Danny', 'Duncan', 3, NULL),
        ('Darius', 'Rucker', 4, 3),
        ('John', 'Pardi', 5, NULL),
        ('Alexander', 'TheGreat', 6, 5),
        ('Larry', 'Bird', 7, NULL),
        ('Mary', 'Jane', 8, 7),
        ('Joe', 'Dirt', 9, NULL); 