var form = document.querySelector('.registration_form')
var validateBtn = form.querySelector('.RegBtn')
var login = form.querySelector('.loginReg')
var email = form.querySelector('.emailReg')
var password = form.querySelector('.passwordReg')
var passwordConf = form.querySelector('.passwordConf')
var fname = form.querySelector('.name')
var sname = form.querySelector('.surname')
var fields = form.querySelectorAll('.field')
var f1;var f2;var f3;var f4;var f5;var f6;
var fs;

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
      f1 = 1
    }
  }
}

var checkPasswordMatch = function() {
  if (password.value !== passwordConf.value) {
    var error = generateError('Пароли не совпадают')
    passwordConf.parentElement.insertBefore(error, passwordConf)
    passwordConf.style.border = "2px solid"
    passwordConf.style.borderColor = "red"
    password.style.border = "2px solid"
    password.style.borderColor = "red"
    f2 = 1
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
    var error = generateError('Введите корректный почтовый адрес')
    email.parentElement.insertBefore(error, email)
    email.style.border = "2px solid"
    email.style.borderColor = "red"
    f3 = 1
  } else {
    email.style.border = "2px solid"
    email.style.borderColor = "green"
  }
}

var validateFName = function() {
  var re = /^[A-ZЁА-Я][a-zёа-я]{1,9}$/;
  var error = generateError('Имя должно начинаться с заглавной буквы, не содержать цифр и иметь от 2 до 10 букв')
  if ((!fname.value.match(re)) && (fname.value !== "")) {
    fname.parentElement.insertBefore(error, fname)
    fname.style.border = "2px solid"
    fname.style.borderColor = "red"
    f4 = 1
  } else {
    fname.style.border = "2px solid"
    fname.style.borderColor = "green"
  }
}

var validateSName = function() {
  var re = /^[A-ZЁА-Я][a-zёа-я]{1,9}$/;
  var error = generateError('Фамилия должна начинаться с заглавной буквы, не содержать цифр и иметь от 2 до 10 букв')
  if ((!sname.value.match(re)) && (sname.value !== "")) {
    sname.parentElement.insertBefore(error, sname)
    sname.style.border = "2px solid"
    sname.style.borderColor = "red"
    f5 = 1
  } else {
    sname.style.border = "2px solid"
    sname.style.borderColor = "green"
  }
}

var validateLogin = function() {
  var r = /^[A-zЁёА-я0-9]{3,10}$/;
  var error = generateError('Логин должен содержать от 3 до 10 символов и содержать только буквы и цифры')
  if ((!login.value.match(r)) && (login.value !== "")) {
    login.parentElement.insertBefore(error, login)
    login.style.border = "2px solid"
    login.style.borderColor = "red"
    f6 = 1
  } else {
    login.style.border = "2px solid"
    login.style.borderColor = "green"
  }
}

form.addEventListener('submit', function(event) {
  event.preventDefault()
  f1=0;f2=0;f3=0;f4=0;f5=0;f6=0;fs=0;

  checkFieldsPresence()
  removeValidation()
  validateLogin()
  validateEmail()
  validateFName()
  validateSName()
  checkPasswordMatch()
  checkFieldsPresence()
  fs = f1+f2+f3+f4+f5+f6;
  if (fs==0)
  {
    form.submit()
  }

})
