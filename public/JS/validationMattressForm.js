



function validateForm(){

	const nameInput = document.getElementById('Name');
	const typeInput = document.getElementById('Type');
	const sizeInput = document.getElementById('Size');
	const descriptionInput = document.getElementById('Description');
	const priceInput = document.getElementById('Price');

	const errorName = document.getElementById('errorName');
	const errorType = document.getElementById('errorType');
	const errorSize = document.getElementById('errorSize');
	const errorDescription = document.getElementById('errorDescrition');
	const errorPrice = document.getElementById('errorPrice');
	const errorsSummary = document.getElementById('errorsSummary');

	const reqMessage = document.getElementById('errorMessage-required').innerText;
    const summaryError = document.getElementById('errorMessage-summary').innerText;
    const errorLength = document.getElementById('errorMessage-length').innerText;
	const errorLength2 = document.getElementById('errorMessage-length2').innerText;
	const errorLength4 = document.getElementById('errorMessage-length4').innerText;
    const errorNumber = document.getElementById('errorMessage-number').innerText;
    const errorPriceLength = document.getElementById('errorMessage-price').innerText;

	resetErrors([nameInput, typeInput, sizeInput, descriptionInput, priceInput], [errorName, errorType, errorSize, errorDescription, errorPrice], errorsSummary);

	let valid = true;

	if (!checkRequired(nameInput.value)) {
		valid = false;
		nameInput.classList.add("error-input");
		errorName.innerText = reqMessage;
	}else if(!checkTextLengthRange(nameInput.value, 2, 40)){
		valid = false;
		nameInput.classList.add("error-input");
		errorName.innerText = errorLength2;
	}

	if (!checkRequired(typeInput.value)) {
		valid = false;
		typeInput.classList.add("error-input");
		errorType.innerText = reqMessage;
	}else if(!checkTextLengthRange(typeInput.value, 2, 30)){
		valid = false;
		typeInput.classList.add("error-input");
		errorType.innerText = errorLength;
	}

	if (!checkRequired(sizeInput.value)) {
		valid = false;
		sizeInput.classList.add("error-input");
		errorSize.innerText = reqMessage;
	}else if(!checkNumber(sizeInput.value)){
		valid = false;
		sizeInput.classList.add("error-input");
		errorSize.innerText = errorNumber;
	}

	if (!checkRequired(descriptionInput.value)) {
		valid = false;
		descriptionInput.classList.add("error-input");
		errorDescription.innerText = reqMessage;
	}else if(!checkTextLengthRange(descriptionInput.value, 2, 150)){
		valid = false;
		descriptionInput.classList.add("error-input");
		errorDescription.innerText = errorLength4;
	}

	if (!checkRequired(priceInput.value)) {
		valid = false;
		priceInput.classList.add("error-input");
		errorPrice.innerText = reqMessage;
	}else if(!checkNumber(priceInput.value)){
		valid = false;
		priceInput.classList.add("error-input");
		errorPrice.innerText = errorNumber;
	}else if(!checkNumberRange(priceInput.value, 500, 1_000_000)) {
		valid = false;
		priceInput.classList.add("error-input");
		errorPrice.innerText = errorPriceLength;
	}


	if (!valid) {
		errorsSummary.innerText = summaryError;
	  	errorsSummary.classList.add("errors-text");
	}

	return valid;
}