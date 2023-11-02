function validateForm(){

	const nameInput = document.getElementById('Name');
	const surnameInput = document.getElementById('Surname');
	const adresInput = document.getElementById('Adres');
	const emailInput = document.getElementById('email');
	const phoneNumberInput = document.getElementById('PhoneNumber');
	const passwordInput = document.getElementById('password');
	const roleInput = document.getElementById('Role');
  
	const errorName = document.getElementById('errorName');
	const errorSurname = document.getElementById('errorSurname');
	const errorAdres = document.getElementById('errorAdres');
	const errorEmail = document.getElementById('errorEmail');
	const errorPhoneNumber = document.getElementById('errorPhoneNumber');
	const errorPassword = document.getElementById('errorPassword');
	const errorsSummary = document.getElementById('errorsSummary');

	const reqMessage = document.getElementById('errorMessage-required').innerText;
    const summaryError = document.getElementById('errorMessage-summary').innerText;
    const errorLength = document.getElementById('errorMessage-length').innerText;
    const emailError = document.getElementById('errorMessage-email').innerText;
    const phoneError = document.getElementById('errorMessage-phone').innerText;
    const phoneErrorLength = document.getElementById('errorMessage-phonelength').innerText;
  
	resetErrors([nameInput, surnameInput, adresInput, emailInput, phoneNumberInput, passwordInput], [errorName, errorSurname, errorAdres, errorEmail, errorPhoneNumber, errorPassword], errorsSummary);
  
	let valid = true;
  
	if (!checkRequired(nameInput.value)) {
	  valid = false;
	  nameInput.classList.add("error-input");
	  errorName.innerText = reqMessage;
	}else if(!checkTextLengthRange(nameInput.value, 2, 30)){
	  valid = false;
	  nameInput.classList.add("error-input");
	  errorName.innerText = errorLength;
	}
  
	if (!checkRequired(surnameInput.value)) {
	  valid = false;
	  surnameInput.classList.add("error-input");
	  errorSurname.innerText = reqMessage;
	}else if(!checkTextLengthRange(surnameInput.value, 2, 30)){
	  valid = false;
	  surnameInput.classList.add("error-input");
	  errorSurname.innerText = errorLength;
	}
  
	if (!checkRequired(adresInput.value)) {
	  valid = false;
	  adresInput.classList.add("error-input");
	  errorAdres.innerText = reqMessage;
	}
	else if(!checkTextLengthRange(adresInput.value, 2, 30)){
	  valid = false;
	  adresInput.classList.add("error-input");
	  errorAdres.innerText = errorLength;
	}
  
	if (!checkRequired(emailInput.value)) {
	  valid = false;
	  emailInput.classList.add("error-input");
	  errorEmail.innerText = reqMessage;
	}else if(!checkTextLengthRange(emailInput.value, 2, 30)){
	  valid = false;
	  emailInput.classList.add("error-input");
	  errorEmail.innerText = errorLength;
	}else if (!checkEmail(emailInput.value)) {
	  valid = false;
	  emailInput.classList.add("error-input");
	  errorEmail.innerText = emailError;
	}
  
	if(phoneNumberInput.value !== "") {
	  if(!checkTextLengthRange(phoneNumberInput.value, 0, 10)){
		valid = false;
		phoneNumberInput.classList.add("error-input");
		errorPhoneNumber.innerText = phoneErrorLength;
	  }else if(!checkNumber(phoneNumberInput.value)){
		valid = false;
		phoneNumberInput.classList.add("error-input");
		errorPhoneNumber.innerText = phoneError;
	  }
	}

	if (!checkRequired(passwordInput.value)) {
		valid = false;
		passwordInput.classList.add("error-input");
		errorPassword.innerText = reqMessage;
	}
  
  
	if (!valid) {
	  errorsSummary.innerText = summaryError;
	  errorsSummary.classList.add("errors-text");
	}
  
	return valid;
  }