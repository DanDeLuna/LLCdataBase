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
          updateJob();
          break;
        case "Exit":
          connection.end();
          break;
        default:
          connection.end();
      }
    });
};
