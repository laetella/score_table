var entries = [
  {name : 'aa', number : '0001', Chinese : 90, math : 87, English : 79},
  {name : 'bb', number : '0002', Chinese : 83, math : 84, English : 96},
  {name : 'cc', number : '0003', Chinese : 86, math : 94, English : 91},
  ];

module.exports = entries;

// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'itge9282',
//   database : 'student_score'
// });
//
// connection.connect();
// var querySql = 'select stu_name, course_name, score from student , course, score where student.stu_id = score.stu_id and course.course_id = score.course_id';
// var entries = [];
// connection.query(querySql, function(err, rows, fields) {
//   if (err) throw err;
//   entries = rows;
//   console.log(entries);
// });
// connection.end();
// module.exports = entries;
