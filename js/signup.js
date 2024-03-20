// register User.

const handleSignUp =  async (event) =>{
    event.preventDefault();
    const email = document.querySelector('.registration-email').value.trim();
    const username = document.querySelector('.registration-username').value.trim();
    const password = document.querySelector('.registration-password').value.trim();
    // const password2 = document.querySelector('#confirm-password-registration').value.trim();

    const user = {

        email,
        username,
        password
    }


    try {
        const response = await fetch('https://mukamadeployts.onrender.com/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json, text/plain, */*",

            },
            body: JSON.stringify(user),
        });

        if(response.status===201){
            console.log(user);
            alert('User registered successfully');
            window.location.href = '../login.html';
        } 
        }catch (error) { 
        console.log(error);
    } finally {
        document.getElementById('preloader').style.display = 'none';
    }
}

// sign up form validation.
const signup_form = document.querySelector('#signup'),
    signup_email = document.querySelector('.registration-email'),
    username = document.querySelector('.registration-username'),
    signup_password = document.querySelector('.registration-password'),
    password2 = document.querySelector('#confirm-password-registration');

function setError(element, message) {
    const inputField = element.parentElement;
    const errorDisplay = inputField.querySelector('small'); // Corrected selector
    errorDisplay.innerText = message;
    errorDisplay.classList.add('error');
    errorDisplay.classList.remove('success');
}

function setSuccess(element) {
    const inputField = element.parentElement;
    const errorDisplay = inputField.querySelector('small'); // Corrected selector
    errorDisplay.innerText = '';
    errorDisplay.classList.add('success');
    errorDisplay.classList.remove('error');
}

function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function signup_validation() {
    const signupEmail = signup_email.value.trim(),
        signupPassword = signup_password.value.trim(),
        usernameValue = username.value.trim(),
        signupPassword2 = password2.value.trim();

    if (usernameValue === '') {
        setError(username, "Username can not be blank"); // Corrected argument passed to setError
    } else if (usernameValue.length < 3) {
        setError(username, 'Username must be at least 3 characters'); // Corrected argument passed to setError
    } else {
        setSuccess(username);
    }

    if (signupEmail === '') {
        setError(signup_email, "email can not be blank");
    } else if (!isValidEmail(signupEmail)) {
        setError(signup_email, "Provide valid Email");
    } else {
        setSuccess(signup_email);
    }

    if (signupPassword === '') {
        setError(signup_password, "password can not be blank");
    } else if (signupPassword.length < 8) {
        setError(signup_password, 'Password must be at least 8 characters');
    } else {
        setSuccess(signup_password);
    }

    if (signupPassword2 === '') {
        setError(password2, 'Confirm password is required');
    } else if (signupPassword2 !== signupPassword) {
        setError(password2, 'Passwords do not match');
    } else {
        setSuccess(password2);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#signup').addEventListener('submit', e => {
        e.preventDefault();
        signup_validation();
        document.getElementById('preloader').style.display = 'block';

        // Check if all fields are valid before sending the registration request
        const allFieldsValid = [
            signup_email,
            username,
            signup_password,
            password2
        ].every(field => field.parentElement.querySelector('small').classList.contains('success'));

        if (allFieldsValid) {
            handleSignUp(e);
            
        }
    });
});
