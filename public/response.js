
$('thead').on('click', 'th', function() {
  var sortKey = $(this).data('name');
  var sortType = $(this).data('flag');

  $.get('/scores', {sortKey : sortKey, sortType : sortType}, function (resp) {
    updateData(resp);
  });

  if(sortType === 'true') {
    $(this).data('flag','false');
  } else {
    $(this).data('flag','true');
  }
});
function updateData(result) {
  $('tbody').empty();
  result.forEach(function(index) {
    $('tbody').append("<tr>" +
      "<td>" + index.name + "</td>" +
      "<td>" + index.number + "</td>" +
      "<td>" + index.Chinese + "</td>" +
      "<td>" + index.math + "</td>" +
      "<td>" + index.English + "</td>" +
      +"</tr>");
  });
}

$('.delete').on('click',function() {
  if(confirm("Are you sure to delete this student and his scores?")) {
    var deleteId = $(this).parent().siblings('.number').html();
    $.ajax({
      type : 'delete',
      url : '/scores/delete?deleteId='+deleteId,
      success : function (resp) {
        $(this).remove();
      },
      error : function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(deleteId+'failed.');
      }
    });

  }
});

// $('.update').on('click', function () {
//   var updateId = $(this).parent().siblings('.number').html();
//   console.log(updateId);
//   $.ajax({
//     type : 'post',
//     url : '/scores/update?updateId='+updateId,
//     success : function (resp) {
//       console.log(resp + 'I am successful.');
//     },
//     error : function (XMLHttpRequest, textStatus, errorThrown) {
//       console.log('failed.');
//     }
//   });
//   window.open('updateData.html');
// });

$('.add').on('click', function () {
  // console.log($('#name').val());
  $.ajax({
    type : 'post',
    url : '/scores/add',
    data : {
      addName : $('#name').val(),
      addChinese : $('#Chinese').val(),
      addMath : $('#math').val(),
      addEnglish : $('#English').val()
    },
    success : function (resp) {
      console.log(resp + 'I am successful.');
    },
    error : function (XMLHttpRequest, textStatus, errorThrown) {
      console.log('failed.');
    }
  });
});
