var form = document.querySelector('.registration_form')
var validateBtn = form.querySelector('.RegBtn')
var login = form.querySelector('.loginReg')
var email = form.querySelector('.emailReg')
var password = form.querySelector('.passwordReg')
var passwordConf = form.querySelector('.passwordConf')
var fname = form.querySelector('.name')
var sname = form.querySelector('.surname')
var fields = form.querySelectorAll('.field')

var generateError = function(text) {
  var error = document.createElement('div')
  error.className = 'error'
  error.style.color = 'red'
  error.innerHTML = text
  return error
}

var removeValidation = function() {
  var errors = form.querySelectorAll('.error')

  for (var i = 0; i < errors.length; i++) {
    errors[i].remove()
  }
}

var checkFieldsPresence = function() {
  for (var i = 0; i < fields.length; i++) {
    if (!fields[i].value) {
      var error = generateError('Cannot be blank')
      //form[i].parentElement.insertBefore(error, fields[i])
      fields[i].style.border = "2px solid"
      fields[i].style.borderColor = "red"
    }

  }
}

var checkPasswordMatch = function() {
  if (password.value !== passwordConf.value) {
    var error = generateError('Password doesnt match')
    passwordConf.parentElement.insertBefore(error, passwordConf)
    passwordConf.style.border = "2px solid"
    passwordConf.style.borderColor = "red"
    password.style.border = "2px solid"
    password.style.borderColor = "red"
  } else {
    passwordConf.style.border = "2px solid"
    passwordConf.style.borderColor = "green"
    password.style.border = "2px solid"
    password.style.borderColor = "green"
  }
}

var validateEmail = function() {
  var re = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}/;
  if (!re.test(email.value) && (email.value !== "")) {
    var error = generateError('email not match')
    email.parentElement.insertBefore(error, email)
    email.style.border = "2px solid"
    email.style.borderColor = "red"
  } else {
    email.style.border = "2px solid"
    email.style.borderColor = "green"
  }
}

var validateFName = function() {
  var re = /^[A-ZЁА-Я][a-zёа-я]{1,10}$/;
  var error = generateError('name error')
  if ((!fname.value.match(re)) && (fname.value !== "")) {
    fname.parentElement.insertBefore(error, fname)
    fname.style.border = "2px solid"
    fname.style.borderColor = "red"
  } else {
    fname.style.border = "2px solid"
    fname.style.borderColor = "green"
  }
}

var validateSName = function() {
  var re = /^[A-ZЁА-Я][a-zёа-я]{1,10}$/;
  var error = generateError('name error')
  if ((!sname.value.match(re)) && (sname.value !== "")) {
    sname.parentElement.insertBefore(error, sname)
    sname.style.border = "2px solid"
    sname.style.borderColor = "red"
  } else {
    sname.style.border = "2px solid"
    sname.style.borderColor = "green"
  }
}

var validateLogin = function() {
  var r = /^[A-zЁёА-я0-9]{3,10}$/;
  var error = generateError('login error')
  if ((!login.value.match(r)) && (login.value !== "")) {
    login.parentElement.insertBefore(error, login)
    login.style.border = "2px solid"
    login.style.borderColor = "red"
  } else {
    login.style.border = "2px solid"
    login.style.borderColor = "green"
  }
}

form.addEventListener('submit', function(event) {
  event.preventDefault()

  checkFieldsPresence()
  removeValidation()
  validateLogin()
  validateEmail()
  validateFName()
  validateSName()
  checkPasswordMatch()
  checkFieldsPresence()

})