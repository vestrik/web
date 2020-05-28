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
      console.log(html);
    }
  });
});

function renderHTML(data) {
  var htmlString = "";
  $('#commentList').prepend('<div class="comment" id="comm' + data[0].pk + '">')
  $('#commentList').prepend('</div>')
  var commentContainer = document.getElementById("comm1")
  //htmlString = "<p>" + data[0].fields.body + data[0].pk + "</p>";
  //commentContainer.insertAdjacentHTML('beforeend', htmlString)
  $('#comm' + data[0].pk).prepend('</div>')
  $('#comm' + data[0].pk).append('<p>' + data[0].fields.body + '</p>')

  var myDate = new Date(data[0].fields.date)
  const month = myDate.toLocaleString('default', {
    month: 'long'
  });
  var output = myDate.getDate() + " " + month + " " + myDate.getFullYear() + " г. " + myDate.getHours() + ":" + myDate.getMinutes();
  $('#comm' + data[0].pk).append('<p>Commented by:<span class="author_post" id="auth"> ' + data[0].fields.author + ' </span> at ' + output + '</p>')

}