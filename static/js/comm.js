$(document).on('submit', '#comment_form', function(e) {
  e.preventDefault();
  var csrftoken = $("[name=csrfmiddlewaretoken]").val();

  $.ajax({
    type: "POST",
    url: "addcomm/",
    headers: {
      "X-CSRFToken": csrftoken
    },
    contentType: 'application/json',
    dataType: "json",
    data: JSON.stringify({
      "comment": $("#comment_input").val(),
    }),

    cache: false,
    success: function(r) {
      html = JSON.parse(r)
      renderHTML(html)
    }
  });
});

function renderHTML(data) {
  var htmlString = "";
  for (var i = 0; i < data.length; i++) {
    $('#commentList').prepend('<div class="comment" id="comm' + data[i].pk + '">')
    $('#commentList').prepend('</div>')
    var commentContainer = document.getElementById("comm1")
    $('#comm' + data[i].pk).prepend('</div>')
    $('#comm' + data[i].pk).append('<p>' + data[i].fields.body + '</p>')
    var myDate = new Date(data[i].fields.date)
    const month = myDate.toLocaleString('default', {
      month: 'long'
    });
    var output = myDate.getDate() + " " + month + " " + myDate.getFullYear() + " г. " + myDate.getHours() + ":" + myDate.getMinutes();
    $('#comm' + data[i].pk).append('<div class="post_comm_info"><p>Commented by:<span class="user_name" id="auth"> ' + data[i].fields.author + ' </span> at ' + output + '</p></div>')
  }

}
