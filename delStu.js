var mysql      = require('mysql');
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'itge9282',
    database : 'student_score'
  });

  connection.connect();
  function delStu (deleteId) {
    console.log("I am in delStu");
    var deleteSql = 'delete from student where stu_id =' + deleteId;
    connection.query(deleteSql, function(err, rows, fields) {
      console.log(deleteSql);
      if (err) throw err;
      console.log(rows);
    });
  }
  connection.end();

module.exports = delStu;
