const mysql = require('mysql2');
const inquirer = require('inquirer');
const conTable = require('console.table');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3001,
  user: 'root',
  password: 'password',
  database: 'employeellc_db',
});
connection.connect(err => {
  if (err) throw err;
  console.log("Employee DB ");
  questions();
});

const questions = () => {
  inquirer.prompt({
      message: 'Options for DB?',
      name: 'menu',
      type: 'list',
      choices: [ 
        'View all departments',
        'View all jobs',
        'View all employees',
        'Add a department',
        'Add a job',
        'Add an employee',
        'Update an employee job',
        'Exit',
      ],
    })
    .then(response => {
        switch (response.menu) {
        case 'View all departments':
          viewDep();
          break;
        case 'View all jobs':
          viewJob();
          break;
        case 'View all employees':
          viewEmp();
          break;
        case 'Add a department':
          addDep();
          break;
        case 'Add a job':
          addJob();
          break;
        case 'Add an employee':
          addEmp();
          break;
        case 'Update employee job':
          upEmp();
          break;
        case "Exit":
          connection.end();
          break;
        default:
          connection.end();
      }
    });
};
const viewDep = () => {
  connection.query('SELECT * FROM department', function (err, res) {
    if (err) throw err;
    console.table(res);
    questions();
  });
};

const viewJob = () => {
  connection.query('SELECT * FROM job', function (err, res) {
    if (err) throw err;
    console.table(res);
    questions();
  });
};

const viewEmp = () => {
  connection.query(
    'SELECT employee.id, first_name, last_name, title, salary, dept_name, manager_id FROM ((department JOIN job ON department.id = job.department_id) JOIN employee ON job.id = employee.job_id);',
    function (err, res) {
      if (err) throw err;
      console.table(res);
      questions();
    }
  );
};

const addDep = () => {
  inquirer.prompt([
      {
        name: 'department',
        type: 'input',
        message: 'What department?',
      },
    ])
    .then(answer => {
      connection.query(
        'INSERT INTO department (dept_name) VALUES (?)',
        [answer.department],
        function (err, res) {
          if (err) throw err;
          console.log('Department is now in Database!');
          questions();
        }
      );
    });
};

const addJob = () => {
  inquirer.prompt([
      {
        name: 'jobTitle',
        type: 'input',
        message: 'What is the job title?',
      },
      {
        name: 'salary',
        type: 'input',
        message: 'What is the salary for this job?',
      },
      {
        name: 'deptId',
        type: 'input',
        message: 'What is the department ID number?',
      },
    ])
    .then(answer => {
      connection.query(
        'INSERT INTO job (title, salary, department_id) VALUES (?, ?, ?)',
        [answer.jobTitle, answer.salary, answer.deptId],
        function (err, res) {
          if (err) throw err;
          console.log('Job has been added to database!');
          questions();
        }
      );
    });
};

const addEmp = () => {
  inquirer.prompt([
      {
        name: 'nameFirst',
        type: 'input',
        message: "Enter employee name?",
      },
      {
        name: 'nameLast',
        type: 'input',
        message: "Enter last name",
      },
      {
        name: 'jobId',
        type: 'input',
        message: "Enter job id?",
      },
      {
        name: 'managerId',
        type: 'input',
        message: 'Enter  manager Id?',
      },
    ])
    .then(answer => {
      connection.query(
        'INSERT INTO employee (first_name, last_name, job_id, manager_id) VALUES (?, ?, ?, ?)',
        [answer.nameFirst, answer.nameLast, answer.jobId, answer.managerId],
        function (err, res) {
          if (err) throw err;
          console.log('Employee is now added into database!');
          questions();
        }
      );
    });
};

const upEmp = () => {
  inquirer
    .prompt([
      {
        name: 'id',
        type: 'input',
        message: 'employee id',
      },
      {
        name: 'jobId',
        type: 'input',
        message: ' new job id',
      },
    ])
    .then(answer => {
      connection.query(
        'UPDATE employee SET job_id=? WHERE id=?',
        [answer.jobId, answer.id],
        function (err, res) {
          if (err) throw err;
          console.log('Employee updated!');
          questions();
        }
      );
    });
};