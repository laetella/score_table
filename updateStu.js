var mysql      = require('mysql');
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'itge9282',
    database : 'student_score'
  });

  connection.connect();
  function updateStu (deleteId) {
    console.log("I am in updateStu");
    var updateSql = 'delete from student where stu_id =' + deleteId;
    connection.query(updateSql, function(err, rows, fields) {
      if (err) throw err;
      console.log(rows);
    });
  }
  connection.end();

module.exports = updateStu;
