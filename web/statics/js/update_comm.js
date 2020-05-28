setInterval(function() {
  var csrftoken = $("[name=csrfmiddlewaretoken]").val();
  $.ajax({
    url: "get_comments/",
    headers: {
      "X-CSRFToken": csrftoken
    },
    type: 'POST',
    contentType: 'application/json',
    dataType: "json",
    data: {
      'check': true
    },
    success: function(r) {
      html = JSON.parse(r)
      console.log(html);
      clear_comments()
      renderHTML(html)
    }
  });
}, 15000);

function clear_comments() {
  $('#commentList').empty()
}


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
    $('#comm' + data[i].pk).append('<p>Commented by:<span class="author_post" id="auth"> ' + data[i].fields.author + ' </span> at ' + output + '</p>')
  }

}