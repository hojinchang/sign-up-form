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

    const regex = /[\d\-]{10,13}/;
    regex.test(input) ? displayErrorMessage(errorField, "") : displayErrorMessage(errorField, "*Please enter a valid phone number");
})