const submitButton = document.querySelector(".submit-button");
const inputFields = document.querySelectorAll("input")
const errorFields = document.querySelectorAll(".input-error");
const inputEmail = document.querySelector("#email");
const inputPhoneNumber = document.querySelector("#phone_number");
const inputPassword = document.querySelector("#password");
const inputPasswordConfirm = document.querySelector("#password_confirm");


function displayErrorMessage(errorField, message) {
    errorField.textContent = message;
}

function checkEmail(email, errorField) {
    if (email.includes("@") && (email.includes(".com") || email.includes(".org") || email.includes(".net")) || email === "") {
        displayErrorMessage(errorField, "");
    } else {
        displayErrorMessage(errorField, "*Please enter a valid Email");
    }
}

function checkPhoneNumber(number, errorField) {
    const regex = /^\d{10}$|^\d{3}-\d{3}-\d{4}$/;
    regex.test(number) || number === "" ? displayErrorMessage(errorField, "") : 
                                        displayErrorMessage(errorField, "*Please enter a valid phone number");
}

function checkPasswords(password, errorFieldPass, passwordConfirm, errorFieldPassConfirm) {
    if (password === passwordConfirm) {
        displayErrorMessage(errorFieldPass, "");
        displayErrorMessage(errorFieldPassConfirm, "");
        return true;
    } else {
        displayErrorMessage(errorFieldPass, "Password does not match");
        displayErrorMessage(errorFieldPassConfirm, "Password does not match");
        return false;
    }
}



inputEmail.addEventListener("blur", (e) => {
    let input = e.target.value;
    let errorField = errorFields[2];
    
    checkEmail(input, errorField);
})

inputPhoneNumber.addEventListener("blur", (e) => {
    let input = e.target.value;
    let errorField = errorFields[3];

    checkPhoneNumber(input, errorField)
})

let password;
let passwordsMatch
inputPassword.addEventListener("blur", (e) => {
    let input = e.target.value;
    let errorField = errorFields[4];

    if (input.length < 8 & input.length != 0) {
        displayErrorMessage(errorField, "*Password must be minimum 8 characters long");
    } else {
        displayErrorMessage(errorField, "");
        password = input;
    }

    if (passwordConfirm !== undefined) {
        passwordsMatch = checkPasswords(password, errorFields[4], passwordConfirm, errorFields[5]);
    }
})

let passwordConfirm;
inputPasswordConfirm.addEventListener("blur", (e) => {
    let input = e.target.value;
    let errorFieldPass = errorFields[4];
    let errorFieldPassConfirm = errorFields[5];

    passwordsMatch = checkPasswords(password, errorFieldPass, input, errorFieldPassConfirm);
    passwordConfirm = input;
})


submitButton.addEventListener("click", (e) => {
    
})