let topMenu = document.querySelector('.menu-list-top');
function clickingX_Symbolmenu(){
    topMenu.style.right="-220px";

}


function openMenu(){
    // remember that we have set the right to be -220px (not showing), then here we will show it.
    topMenu.style.right="0";

}



       // Form Validation

       console.log('JS Running');

    const emailEl = document.querySelector('#email');
    const passwordEl = document.querySelector('#password');
    const confirmPasswordEl = document.querySelector('#confirm-password');
    const form = document.querySelector('#signup');

    const checkEmail = () => {
        let valid = false;
        const email = emailEl.value.trim();
        if (!isRequired(email)) {
            showError(emailEl, 'Email cannot be blank.');
        } else if (!isEmailValid(email)) {
            showError(emailEl, 'Email is not valid.')
        } else {
            showSuccess(emailEl);
            valid = true;
        }
        return valid;
    };

    const checkPassword = () => {
        let valid = false;
        const password = passwordEl.value.trim();

        if (!isRequired(password)) {
            showError(passwordEl, 'Password cannot be blank.');
        } else if (!isPasswordSecure(password)) {
            showError(passwordEl, 'Password must have at least 8 characters that include at least 1 lowercase character, 1 uppercase character, 1 number, and 1 special character in (!@#$%^&*)');
        } else {
            showSuccess(passwordEl);
            valid = true;
        }

        return valid;
    };

    const checkConfirmPassword = () => {
        let valid = false;
        const confirmPassword = confirmPasswordEl.value.trim();
        const password = passwordEl.value.trim();
        if (!isRequired(confirmPassword)) {
            showError(confirmPasswordEl, 'Please enter the password again');
        } else if (password !== confirmPassword) {
            showError(confirmPasswordEl, 'The password does not match');
        } else {
            showSuccess(confirmPasswordEl);
            valid = true;
        }

        return valid;
    };

    const isEmailValid = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const isPasswordSecure = (password) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        return re.test(password);
    };

    const isRequired = value => value === '' ? false : true;

    const showError = (input, message) => {
        const formField = input.parentElement;
        formField.classList.remove('success');
        formField.classList.add('error');
        const error = formField.querySelector('small');
        error.textContent = message;
        // Add this line to log the error message to the console
        console.log('Error message:', message);
    };
    

    const showSuccess = (input) => {
        const formField = input.parentElement;
        formField.classList.remove('error');
        formField.classList.add('success');
        const error = formField.querySelector('small');
        error.textContent = '';
    };

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        console.log('Form submitted');
        let isEmailValid = checkEmail();
        let isPasswordValid = checkPassword();
        let isConfirmPasswordValid = checkConfirmPassword();
        if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            // Form is valid, submit to the server
            console.log('Form is valid');
            form.submit();
        } else {
            console.log('Form has validation errors');
        }
    });
    




    
