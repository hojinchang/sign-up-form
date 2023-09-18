const form = document.querySelector(".sign-up-form");
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
        return "";
    }
}

function checkPhoneNumber(number, errorField) {
    const regex = /^\d{10}$|^\d{3}-\d{3}-\d{4}$/;

    if (regex.test(number) || number === "") {
        displayErrorMessage(errorField, "");
        return number;
    } else {
        displayErrorMessage(errorField, "*Please enter a valid phone number");
        return "";
    }
}

function checkPassword(password, errorField) {
    if (password.length < 8 && password.length !== 0) {
        displayErrorMessage(errorField, "*Password must be minimum 8 characters long");
        return "";
    } else if (password.length === 0) {
        displayErrorMessage(errorField, "");
        return password;
    } else {
        displayErrorMessage(errorField, "");
        return password;
    }
}

function comparePasswords(password, passwordConfirm) {
    if (password === passwordConfirm) {
        return true;
    } else {
        return false;
    }
}

function checkPasswords(password, errorFieldPass, passwordConfirm, errorFieldPassConfirm) {
    if (comparePasswords(password, passwordConfirm)) {
        displayErrorMessage(errorFieldPass, "");
        displayErrorMessage(errorFieldPassConfirm, "");
        return true;
    } else {
        displayErrorMessage(errorFieldPass, "*Password does not match");
        displayErrorMessage(errorFieldPassConfirm, "*Password does not match");
        return false;
    }
}


function checkErrors(completeForm) {
    let errorCount = 0;
    let i = 0;
    for (let [inputField, value] of completeForm) {
        let errorField = errorFields[i];
        let errorMessage;
        if (!value) {
            switch (inputField) {
                case "email":
                    errorMessage = "*Please enter a valid Email";
                    break;
                case "phoneNumber":
                    errorMessage = "*Please enter a valid phone number";
                    break;
                default:
                    errorMessage = "*This field is required";
                    break;
            }
            errorCount++;
        } else if (inputField === "password" || inputField === "passwordConfirm") {
            passwordsMatch = comparePasswords(completeForm.get("password"), completeForm.get("passwordConfirm"));
            if (!passwordsMatch) {
                errorMessage="*Password does not match";
                errorCount++;
            } else {
                errorMessage="";
            }
        }

        errorField.textContent = errorMessage;
        i++;
    }
    return errorCount;
}

function updateForm(form, inputField, validInput) {
    form.set(inputField, validInput);
}

function resetForm() {
    newMap = createMap();
    form.reset();

    return newMap
}

function createMap() {
    let newMap = new Map([
        ["firstName", ""],
        ["lastName", ""],
        ["email", ""],
        ["phoneNumber", ""],
        ["password", ""],
        ["passwordConfirm", ""],
    ]) 
    return newMap
}


let completeForm = createMap();

inputFirstName.addEventListener("blur", (e) => {
    updateForm(completeForm, "firstName", e.target.value);
    displayErrorMessage(errorFields[0], "");
})

inputLastName.addEventListener("blur", (e) => {
    updateForm(completeForm, "lastName", e.target.value);
    displayErrorMessage(errorFields[1], "");
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
        passwordsMatch = checkPasswords(validPassword, errorFields[4], passwordConfirm, errorFields[5]);
        completeForm.set("passwordConfirm", passwordConfirm);
    }
})

let passwordConfirm;
inputPasswordConfirm.addEventListener("blur", (e) => {
    let errorFieldPass = errorFields[4];
    let errorFieldPassConfirm = errorFields[5];

    passwordConfirm = e.target.value;
    passwordsMatch = checkPasswords(validPassword, errorFieldPass, passwordConfirm, errorFieldPassConfirm);
    completeForm.set("passwordConfirm", passwordConfirm);
})


submitButton.addEventListener("click", () => {
    let errorCount = checkErrors(completeForm);

    if (errorCount === 0) {
        alert("Sign up with P L V N T S successful!");
        completeForm = resetForm();
    }
})