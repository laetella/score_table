var express = require('express');
var app = new express();
var hbs = require('hbs');
var sort = require('./sort.js');
var entries = require('./info.js');
var delStu = require('./delStu.js');
var updateStu = require('./updateStu.js');

app.set('view engine','html');
app.engine('html', hbs.__express);

app.use(express.static('public'));
app.use(express.static('bower_components'));

app.get('/',function(req,res) {
  res.render('HomePage',{entries:entries});
});

app.get('/scores',function(req,res) {
  var sortKey = req.query.sortKey;
  var sortType = req.query.sortType;
  var result = sort(sortKey,sortType);
  res.send(result);
});

app.post('/scores/delete', function (req, res) {
  var deleteId = req.query.deleteId;
  console.log("I am in app.delete");
  delStu(deleteId);
  console.log(deleteId);
});

app.post('/scores/update', function (req, res) {
  var updateId = req.query.updateId;
  var query = 'select stu_name, course_name, score from student , course, score where student.stu_id = score.stu_id and course.course_id = score.course_id';
  console.log("I am in app.update");
  updateStu(updateId);
  console.log(updateId);
  res.render('updateData',{entries:entries});
});

app.listen(8080);
