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

function checkFirstName() {

}


function checkEmail(email, errorField) {
    if (email.includes("@") && (email.includes(".com") || email.includes(".org") || email.includes(".net")) || email === "") {
        displayErrorMessage(errorField, "");
        return true;
    } else {
        displayErrorMessage(errorField, "*Please enter a valid Email");
        return false;
    }
}

function checkPhoneNumber(number, errorField) {
    const regex = /^\d{10}$|^\d{3}-\d{3}-\d{4}$/;

    if (regex.test(number) || number === "") {
        displayErrorMessage(errorField, "");
        return true;
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
        return false;
    } else {
        displayErrorMessage(errorField, "");
        return true;
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
    form[inputField] = validInput;
}


let completeForm = {
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    password: false,
    passwordConfirm: false,
};

inputFirstName.addEventListener("blur", (e) => {
    updateForm(completeForm, "firstName", true);
})

inputLastName.addEventListener("blur", (e) => {
    updateForm(completeForm, "lastName", true);
})

inputEmail.addEventListener("blur", (e) => {
    let input = e.target.value;
    let errorField = errorFields[2];
    
    let validEmail = checkEmail(input, errorField);
    updateForm(completeForm, "email", validEmail);
})

inputPhoneNumber.addEventListener("blur", (e) => {
    let input = e.target.value;
    let errorField = errorFields[3];

    let validPhoneNumber = checkPhoneNumber(input, errorField);
    updateForm(completeForm, "phoneNumber", validPhoneNumber);
})

let password;
let passwordsMatch
inputPassword.addEventListener("blur", (e) => {
    let input = e.target.value;
    let errorField = errorFields[4];

    let validPassword = checkPassword(input, errorField);
    if (validPassword) {
        password = input;
    }
    updateForm(completeForm, "password", validPassword);

    if (passwordConfirm !== undefined) {
        passwordsMatch = comparePasswords(password, errorFields[4], passwordConfirm, errorFields[5]);
        if (passwordsMatch) {
            completeForm["passwordConfirm"] = true;
        } else {
            completeForm["passwordConfirm"] = false;
        }
    }
})

let passwordConfirm;
inputPasswordConfirm.addEventListener("blur", (e) => {
    let input = e.target.value;
    let errorFieldPass = errorFields[4];
    let errorFieldPassConfirm = errorFields[5];

    passwordsMatch = comparePasswords(password, errorFieldPass, input, errorFieldPassConfirm);
    if (passwordsMatch) {
        passwordConfirm = input;
        completeForm["passwordConfirm"] = true;
    } else {
        completeForm["passwordConfirm"] = false;
    }
})

submitButton.addEventListener("click", (e) => {
    for (let inputField in completeForm) {
        let valid = completeForm[inputField];
    }
})