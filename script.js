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

function checkPasswords(password, errorFieldPass, passwordConfirm, errorFieldPassConfirm) {
    if (passwordConfirm !== undefined) {
        if (password === passwordConfirm) {
            displayErrorMessage(errorFieldPass, "");
            displayErrorMessage(errorFieldPassConfirm, "");
        } else {
            displayErrorMessage(errorFieldPass, "Password does not match");
            displayErrorMessage(errorFieldPassConfirm, "Password does not match");
        }
    }
}


inputEmail.addEventListener("blur", (e) => {
    let input = e.target.value;
    let errorField = errorFields[2];
    
    if (input.includes("@") && (input.includes(".com") || input.includes(".org") || input.includes(".net")) || input === "") {
        displayErrorMessage(errorField, "");
    } else {
        displayErrorMessage(errorField, "*Please enter a valid Email");
    }
})

inputPhoneNumber.addEventListener("blur", (e) => {
    let input = e.target.value;
    let errorField = errorFields[3];

    const regex = /^\d{10}$|^\d{3}-\d{3}-\d{4}$/;
    regex.test(input) || input === "" ? displayErrorMessage(errorField, "") : displayErrorMessage(errorField, "*Please enter a valid phone number");
})

let password;
inputPassword.addEventListener("blur", (e) => {
    let input = e.target.value;
    let errorField = errorFields[4];

    if (input.length < 8 & input.length != 0) {
        displayErrorMessage(errorField, "*Password must be minimum 8 characters long");
    } else {
        displayErrorMessage(errorField, "");
        password = input;

        checkPasswords(password, errorFields[4], passwordConfirm, errorFields[5]);
    }
})

let passwordConfirm;
inputPasswordConfirm.addEventListener("blur", (e) => {
    let input = e.target.value;
    let errorFieldPass = errorFields[4];
    let errorFieldPassConfirm = errorFields[5];

    if (input === "") {
        displayErrorMessage(errorFieldPass, "");
        displayErrorMessage(errorFieldPassConfirm, "");
    } else if (password !== input) {
        displayErrorMessage(errorFieldPass, "Password does not match");
        displayErrorMessage(errorFieldPassConfirm, "Password does not match");
    } else {
        displayErrorMessage(errorFieldPass, "");
        displayErrorMessage(errorFieldPassConfirm, "");
    }

    passwordConfirm = input;
})