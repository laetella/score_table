create database student_score default charset = 'utf-8';
use student_score;

create table student (
  stu_id varchar(20) primary key,
  stu_name varchar(20) not null,
  stu_class int
);

create table course (
  course_id varchar(20) primary key,
  course_name varchar(20) not null
);

create table score (
  score_id varchar(50)  primary key,
  stu_id varchar(20) not null,
  course_id varchar(20) not null,
  score int(4),
  foreign key (stu_id) references student(stu_id) on delete ,
  foreign key (course_id) references course(course_id)
);

insert into student(stu_id, stu_name,stu_class)
            values (0001,   'aa',    01),
                   (0002,   'bb',    01),
                   (0003,   'cc',    01);

insert into course(course_id, course_name)
            values(0001,      'Chinese'),
                  (0002,      'math'),
                  (0003,      'English');

insert into score   (score_id,stu_id,course_id,score)
            values  (0001,    0001,  0001,      90),
                    (0002,    0001,  0002,      82),
                    (0003,    0001,  0003,      76),
                    (0004,    0002,  0001,      92),
                    (0005,    0002,  0002,      88),
                    (0006,    0002,  0003,      96),
                    (0007,    0003,  0001,      95),
                    (0008,    0003,  0002,      85),
                    (0009,    0003,  0003,      79);

drop table if exists student;
create table student (
  stu_id int primary key auto_increment,
  stu_name varchar(20) not null,
  stu_class int
);

drop table if exists course;
create table course (
  course_id int primary key auto_increment,
  course_name int not null
);

drop table if exists score;
create table score (
  score_id int primary key auto_increment,
  stu_id int not null,
  course_id varchar(20) not null,
  score int,
  foreign key (stu_id) references student(stu_id) on delete cascade,
  foreign key (course_id) references course(course_id) on delete cascade
);

drop trigger if exists after_del_on_stu;
delimiter $;
create trigger after_del_on_stu
after delete on student
for each row
begin
  delete from score where this.stu_id=student.stu_id;
end$
delimiter ;

select stu_name, course_name, score from student , course, score
  where student.stu_id = score.stu_id and course.course_id = score.course_id;

drop view if exists stu_cor_score;
create view stu_cor_score as
select stu_name, student.stu_id,course_name, score from student , course, score
  where student.stu_id = score.stu_id and course.course_id = score.course_id;

drop view if exists student_course;
create view student_course as
  select stu_name as stu_name,
        stu_id as stu_id,
   sum(if(course_name = 'Chinese',score,0)) as Chinese,
   sum(if(course_name = 'math',score,0)) as math,
   sum(if(course_name = 'English',score,0)) as English
  from stu_cor_score
  group by stu_name;

select * from student_course;
