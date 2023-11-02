



function validateForm(){

	const clientInput = document.getElementById('Client');
	const mattressInput = document.getElementById('Mattress');
	const amountInput = document.getElementById('Amount');
	const statusInput = document.getElementById('Status');
	const shippingCostsInput = document.getElementById('ShippingCosts');
	const departureDateInput = document.getElementById('DepartureDate');
	const orderDateInput = document.getElementById('OrderDate');
	

	const errorClient = document.getElementById('errorClient');
	const errorMattress = document.getElementById('errorMattress');
	const errorAmount = document.getElementById('errorAmount');
	const errorStatus = document.getElementById('errorStatus');
	const errorShippingCosts = document.getElementById('errorShippingCosts');
	const errorDepartureDate = document.getElementById('errorDepartureDate');
	const errorOrderDate = document.getElementById('errorOrderDate');
	const errorsSummary = document.getElementById('errorsSummary');

	const reqMessage = document.getElementById('errorMessage-required').innerText;
    const summaryError = document.getElementById('errorMessage-summary').innerText;
    const errorLength = document.getElementById('errorMessage-length').innerText;
	const errorLength3 = document.getElementById('errorMessage-length3').innerText;
    const errorDate = document.getElementById('errorMessage-date').innerText;
    const errorLate = document.getElementById('errorMessage-late').innerText;
	const errorDateMax = document.getElementById('errorMessage-datemax').innerText;
    const errorNumberRange = document.getElementById('errorMessage-numberRange').innerText;
	const errorNumber = document.getElementById('errorMessage-number').innerText;
  

	resetErrors([clientInput, mattressInput, amountInput, statusInput, shippingCostsInput, departureDateInput, orderDateInput], [errorClient, errorMattress, errorAmount, errorStatus, errorShippingCosts, errorDepartureDate, errorOrderDate], errorsSummary);

	let valid = true;


	if (!checkRequired(clientInput.value)) {
		valid = false;
		clientInput.classList.add("error-input");
		errorClient.innerText = reqMessage;
	}

	if (!checkRequired(mattressInput.value)) {
		valid = false;
		mattressInput.classList.add("error-input");
		errorMattress.innerText = reqMessage;
	}

	if (!checkRequired(shippingCostsInput.value)) {
		valid = false;
		shippingCostsInput.classList.add("error-input");
		errorShippingCosts.innerText = reqMessage;
	}else if(!checkNumber(shippingCostsInput.value)){
		valid = false;
		shippingCostsInput.classList.add("error-input");
		errorShippingCosts.innerText = errorNumber;
	}else if(!checkNumberRange(shippingCostsInput.value, 10, 1_000_000)) {
		valid = false;
		shippingCostsInput.classList.add("error-input");
		errorShippingCosts.innerText = errorNumberRange;
	}


	let nowDate = new Date(),
	month = '' + (nowDate.getMonth() + 1),
	day = '' + nowDate.getDate(),
	year = nowDate.getFullYear();


	if (month.length < 2) {
		month = '0' + month;
	}
	if (day.length < 2) {
		day = '0' + day;
	}
	const nowStrong = [year, month, day].join('-');


	if (!checkRequired(departureDateInput.value)) {
		valid = false;
		departureDateInput.classList.add("error-input");
		errorDepartureDate.innerText = reqMessage;
	}else if(!checkDate(departureDateInput.value)){
		valid = false;
		departureDateInput.classList.add("error-input");
		errorDepartureDate.innerText = errorDate;
	}


	if (!checkRequired(orderDateInput.value)) {
		valid = false;
		orderDateInput.classList.add("error-input");
		errorOrderDate.innerText = reqMessage;
	}else if(!checkDate(orderDateInput.value)){
		valid = false;
		orderDateInput.classList.add("error-input");
		errorOrderDate.innerText = errorDate;
	}else if (checkDateIfAfter(orderDateInput.value, nowStrong)) {
		valid = false;
		orderDateInput.classList.add("error-input");
		errorOrderDate.innerText = errorDateMax;	
	}else if (checkRequired(orderDateInput.value) && checkDate(orderDateInput.value) && !checkDateIfAfter(departureDateInput.value, orderDateInput.value)) {
		valid = false;
		departureDateInput.classList.add("error-input");
		errorDepartureDate.innerText = errorLate;
	}





	if (!checkRequired(amountInput.value)) {
		valid = false;
		amountInput.classList.add("error-input");
		errorAmount.innerText = reqMessage;
	}else if(!checkNumber(amountInput.value)){
		valid = false;
		amountInput.classList.add("error-input");
		errorAmount.innerText = errorNumber;
	}

	if (!checkRequired(statusInput.value)) {
		valid = false;
		statusInput.classList.add("error-input");
		errorStatus.innerText = reqMessage;
	}else if(!checkTextLengthRange(statusInput.value, 2, 20)){
		valid = false;
		statusInput.classList.add("error-input");
		errorStatus.innerText = errorLength3;
	}


	if (!valid) {
		errorsSummary.innerText = summaryError;
	  	errorsSummary.classList.add("errors-text");
	}

	return valid;
}