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
