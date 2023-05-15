const mysql = require('mysql2');
const inquirer = require('inquirer');
const conTable = require('console.table');


const connection = mysql.createConnection({
  host: 'localhost',
 // port: 3001,
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
  connection.query('SELECT * FROM role', function (err, res) {
    if (err) throw err;
    console.table(res);
    questions();
  });
};

const viewEmp = () => {
  connection.query(
    'SELECT employee.id, first_name, last_name, title, salary, manager_id FROM ((department JOIN role ON department.id = role.department_id) JOIN employee ON role.id = employee.id);',
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
        'INSERT INTO department (name) VALUES (?)',
        [answer.department],
        function (err, res) {
          if (err) throw err;
          console.log('Department now in Database!');
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
        message: 'job title?',
      },
      {
        name: 'salary',
        type: 'input',
        message: 'salary for job?',
      },
      {
        name: 'deptId',
        type: 'input',
        message: 'department ID number?',
      },
    ])
    .then(answer => {
      connection.query(
        'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
        [answer.jobTitle, answer.salary, answer.deptId],
        function (err, res) {
          if (err) throw err;
          console.log('Job is now in database!');
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
        message: "employee name?",
      },
      {
        name: 'nameLast',
        type: 'input',
        message: "last name",
      },
      {
        name: 'jobId',
        type: 'input',
        message: "job id?",
      },
      {
        name: 'managerId',
        type: 'input',
        message: ' manager Id?',
      },
    ])
    .then(answer => {
      connection.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
        [answer.nameFirst, answer.nameLast, answer.jobId, answer.managerId],
        function (err, res) {
          if (err) throw err;
          console.log('Employee added to database!');
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
        'UPDATE employee SET role_id=? WHERE id=?',
        [answer.jobId, answer.id],
        function (err, res) {
          if (err) throw err;
          console.log('Employee updated!');
          questions();
        }
      );
    });
};