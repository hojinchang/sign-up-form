const submitButton = document.querySelector(".submit-button");
const inputFields = document.querySelectorAll("input")
const errorFields = document.querySelectorAll(".input-error");
const inputFirstName = document.querySelector("#first_name");
const inputLastName = document.querySelector("#last_name");
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
        return email;
    } else {
        displayErrorMessage(errorField, "*Please enter a valid Email");
        return false;
    }
}

function checkPhoneNumber(number, errorField) {
    const regex = /^\d{10}$|^\d{3}-\d{3}-\d{4}$/;

    if (regex.test(number) || number === "") {
        displayErrorMessage(errorField, "");
        return number;
    } else {
        displayErrorMessage(errorField, "*Please enter a valid phone number");
        return false;
    }
}

function checkPassword(password, errorField) {
    if (password.length < 8 && password.length !== 0) {
        displayErrorMessage(errorField, "*Password must be minimum 8 characters long");
        return false;
    } else if (password.length === 0) {
        displayErrorMessage(errorField, "");
        return password;
    } else {
        displayErrorMessage(errorField, "");
        return password;
    }
}

function comparePasswords(password, errorFieldPass, passwordConfirm, errorFieldPassConfirm) {
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

function updateForm(form, inputField, validInput) {
    form.set(inputField, validInput);
}


let completeForm = new Map([
    ["firstName", false],
    ["lastName", false],
    ["email", false],
    ["phoneNumber", false],
    ["password", false],
    ["passwordConfirm", false],
]) 

inputFirstName.addEventListener("blur", (e) => {
    updateForm(completeForm, "firstName", e.target.value);
})

inputLastName.addEventListener("blur", (e) => {
    updateForm(completeForm, "lastName", e.target.value);
})

inputEmail.addEventListener("blur", (e) => {
    let errorField = errorFields[2];
    
    let validEmail = checkEmail(e.target.value, errorField);
    updateForm(completeForm, "email", validEmail);
})

inputPhoneNumber.addEventListener("blur", (e) => {
    let errorField = errorFields[3];

    let validPhoneNumber = checkPhoneNumber(e.target.value, errorField);
    updateForm(completeForm, "phoneNumber", validPhoneNumber);
})

let validPassword;
let passwordsMatch
inputPassword.addEventListener("blur", (e) => {
    let errorField = errorFields[4];

    validPassword = checkPassword(e.target.value, errorField);
    updateForm(completeForm, "password", validPassword);

    if (passwordConfirm !== undefined && validPassword) {
        passwordsMatch = comparePasswords(validPassword, errorFields[4], passwordConfirm, errorFields[5]);
        if (passwordsMatch) {
            completeForm["passwordConfirm"] = passwordConfirm;
        } else {
            completeForm["passwordConfirm"] = false;
        }
    }
})

let passwordConfirm;
inputPasswordConfirm.addEventListener("blur", (e) => {
    let errorFieldPass = errorFields[4];
    let errorFieldPassConfirm = errorFields[5];

    passwordConfirm = e.target.value;
    passwordsMatch = comparePasswords(validPassword, errorFieldPass, passwordConfirm, errorFieldPassConfirm);
    if (passwordsMatch) {
        completeForm["passwordConfirm"] = passwordConfirm;
    } else {
        completeForm["passwordConfirm"] = false;
    }
})

submitButton.addEventListener("click", (e) => {
    let i = 0;

    console.log(completeForm)
    for (let [inputField, valid] of completeForm) {
        let errorField = errorFields[i];
        if (!valid) {
            console.log(inputField, valid);
            errorField.textContent = "*This field is required";
        } else {
            errorField.textContent = "";
        }

        i++;
    }
})