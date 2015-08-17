var express = require('express');
var mysql = require('mysql');
var dbconfig = require('./config/db.json');

var app = express();
var env = process.env.NODE_ENV || 'development';
console.log(env);
var connConfig = dbconfig[env];

function queryExec(sql, func) {
  var connection = mysql.createConnection(connConfig);
  connection.connect(function(err) {
    connection.query(sql, function(err, rows) {
      func(err, rows);
      connection.end();
    })
  })
}

app.get('/', function(req, res) {
  queryExec('SELECT * FROM todos', function(err, rows) {
    res.send(rows);
  })
})

app.listen(3000, function() {
  console.log("http://localhost:3000");
})
