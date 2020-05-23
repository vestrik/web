var form = document.querySelector('.reg_form')
var regBtn = form.querySelector('.regBtn')
var login = form.querySelector('.loginReg')
var pass = form.querySelector('.passwordReg')
var passConf = form.querySelector('.passwordConf')
var fields = form.querySelectorAll('.field')


var generateError = function (text) {
  var error = document.createElement('div')
  error.className = 'error'
  error.style.color = 'red'
  error.innerHTML = text
  return error

}

var removeValidation = function () {
  var errors = form.querySelectorAll('.error')
  for (var i=0;i<errors.length;i++) {
    errors[i].remove()
  }
}

var checkFieldsPresence = function () {
  for (var i=0;i<fields.length;i++) {
    if (!fields[i].value)
    {
      var error = generateError('Cannot be blank')
      form[i].parentElement.insertBefore(error, fields[i])
    }
  }
}

var checkPasswordMatch = function () {
  if (pass.value !== passConf.value) {
    var error = generateError('password doesnt match')
    passConf.parentElement.insertBefore(error, passConf)
    passConf.style.border = "1px solid"
    passConf.style.borderColor = "red"


  }
}


form.addEventListener('submit', function (event) {
  event.preventDefault()

  removeValidation()

  checkFieldsPresence()

  checkPasswordMatch()
})
