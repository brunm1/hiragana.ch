$(function () {

  $('.js-register-form > button[type="submit"]').attr('disabled', 'disabled');

  $('.js-register-form').change(function () {
    validateAll();
  });

  function resetValidation() {
    $('.form-group').removeClass('has-error');
    $('.form-group').removeClass('has-warning');
    $('.form-group').removeClass('has-success');
    $('.help-block').remove();
  }

  // Parameters
  //   selector:   String, jQuery selector for bootstrap form-group
  //   value:      Object, form input value
  //   validator:  Function, validate function
  function setState(selector, validator) {
    var arr = validator();
    $(selector).append(arr[0]);
    $(selector).addClass(arr[1]);
  }

  function validateName(name) {
    return /^\w+$/.test(name);
  }

  function validateNameLength(name) {
    return /^\w{3,20}$/.test(name);
  }

  function validateEmail(email) {
    return /^\S+@\S+\.\S+$/.test(email);
  }

  function validatePW(pw, pwRepeat) {
    if (pw !== pwRepeat) return false;
    return /^[\S]{6,}$/.test(pw) &&
      /[a-z]+/.test(pw) &&
      /[A-Z]+/.test(pw) &&
      /\W+/.test(pw);
  }

  function validateAll() {
    var name = $('#nickname').val();
    var pw = $('#pwd').val();
    var pwRepeat = $('#pwd-repeat').val();
    var email = $('#email').val();

    if(validateName(name) &&
       validateEmail(email) &&
       validatePW(pw, pwRepeat)) {
      // activate submit button
      $('.js-register-form > button[type="submit"]').removeAttr('disabled');
    }

    resetValidation();

    setState('.form-group.nickname', function() {
      var msg, css = '';

      if(name === '') return [msg, css];

      if(!validateName(name)) {
        msg = '<span id="helpNickname" class="help-block">'+err_nicknamenotvalid+'</span>';
        css = 'has-error';
      }
      else if (validateNameLength(name)) {
        msg = '';
        css = 'has-success';
      }
      else {
        msg = '<span id="helpNickname" class="help-block">'+err_nicknamelength+'</span>';
        css = 'has-error';
      }

      return [msg, css];
    });

    setState('.form-group.email', function() {
      var msg, css = '';

      if(email === '') return [msg, css];

      if(validateEmail(email)) {
        msg = '';
        css = 'has-success';
      }
      else {
        msg = '<span id="helpEmail" class="help-block">'+err_emailnotvalid+'</span>';
        css = 'has-error';
      }

      return [msg, css];
    });

    setState('.form-group.pw', function() {
      var msg, css = '';

      if(pw === '' || pwRepeat === '') return [msg, css];

      if(pw !== pwRepeat) {
        msg = '<span id="helpPW" class="help-block">'+err_passwordmatch+'</span>';
        css = 'has-error';
      }
      else if(validatePW(pw, pwRepeat)) {
        msg = '';
        css = 'has-success';
      }
      else {
        msg = '<span id="helpPW" class="help-block">'+err_passwordcomplexity+'</span>';
        css = 'has-error';
      }

      return [msg, css];
    });
  }
});
