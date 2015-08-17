var express = require('express');
var app = new express();
var hbs = require('hbs');
var sort = require('./sort.js');
var delStu = require('./delStu.js');
var updateStu = require('./updateStu.js');
var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended : true
}));
app.set('view engine','html');
app.engine('html', hbs.__express);

app.use(express.static('public'));
app.use(express.static('bower_components'));

var conn;
var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'itge9282',
  database : 'student_score'
});

app.all('*', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    conn = connection;
    next();
  });
});

app.get('/',function(req,res) {
  var querySql = 'select * from student_course;';
  var entries = [];
  conn.query(querySql, function(err, rows, fields) {
    if (err) throw err;
    entries = rows;
    res.render('HomePage',{entries:entries});
  });
});

app.get('/scores',function(req,res) {
  var sortKey = req.query.sortKey;
  var sortType = req.query.sortType;
  var result = sort(sortKey,sortType);
  res.send(result);
});

app.delete('/scores/delete', function (req, res) {
  var deleteId = req.query.deleteId;
  //console.log("aa"+ deleteId+"I am in app.delete");
  var deleteSql = 'delete from student where stu_id =' + deleteId;
  conn.query('delete from student where stu_id =' + deleteId , function(err, rows, fields) {
    if (err) throw err;
    var querySql = 'select * from student_course;';
    var entries = [];
    conn.query(querySql, function(err, rows, fields) {
      if (err) throw err;
      entries = rows;
        res.send({
          status : 200,
          data : rows,
          message : "delete successfully."
        });
    });
  });
});

app.post('/scores/add', function (req, res) {
  var stu_name = req.body.addName;
  var Chinese = req.body.addChinese;
  var math = req.body.addMath;
  var English = req.body.addEnglish;

  conn.query("insert into student(stu_name) values('"+stu_name+"');", function(err, rows, fields) {
    if (err) throw err;
    var stu_id = rows.insertId;
    conn.query("insert into score(stu_id,course_id, score) values("+stu_id+",1,'"+ Chinese+"'), ("+stu_id+",2,'" +math+"'),("+stu_id+",3,'"+ English+"');", function(err, rows, fields) {
      if (err) throw err;
      res.end();
    });
    conn.end();
  });
});

app.listen(8080, function () {
  console.log('http://localhost:8080');
});
