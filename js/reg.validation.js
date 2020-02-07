(function() {
  var $form = document.querySelector('#register-form');
  var $emailInput = document.querySelector('#email');
  var $passwordInput = document.querySelector('#password');

  function showErrorMessage($input, message) {
    var $container = $input.parentElement; // The .input wrapper

  // remove an existing console.error;
  var error = $container.querySelector('.error-message');
  if(error) {
    $container.removeChild(error);
  }
  // now add the error, if the message is not empty
  if (message) {
    var error = document.createElement('div');
    error.classList.add('error-message');
    error.innerText = message;
    $container.appendChild(error);
  }
}

  function validateEmail() {
    var value = $emailInput.value;

    if(!value) {
      showErrorMessage($emailInput, 'E-mail is a required field');
      return false;
    }

    if (value.indexOf('@') === -1) {
      showErrorMessage($emailInput,'You must enter a valid e-mail address.');
      return false;
    }

    showErrorMessage($emailInput, null);
    return true;
    }

    function validatePassword() {
      var value = $passwordInput.value;

      if(!value) {
        showErrorMessage($passwordInput, 'Password is a required field');
        return false;
      }
      if(value.length < 8) {
        showErrorMessage($passwordInput, 'The password needs to be at least 8 characters long.');
      return false;
      }

      showErrorMessage($passwordInout, null);
      return true;
      }

    function validateForm() {
      var isValidEmail = validateEmail();
      var isValidPassword = validatePassword();
      return isValidEmail && isValidPassword;
    }

    $form.addEventListener('submit', (e) => {
      e.preventDefault(); //Do not submit to the several
      if (validateForm()) {
        alert('Success!');
      }
    });

    $emailInput.addEventListener('input', validateEmail);
    $passwordInput.addEventListener('input', validatePassword);
  })();
