// login form validation.
const login_user_form = document.querySelector('#login-user-form'),
    login_email = document.querySelector('.login-email'),
    login_password = document.querySelector('.login-password');

function setError(element, message) {
    const inputField = element.parentElement;
    const errorDisplay = inputField.querySelector('small');
    errorDisplay.innerText = message;
    errorDisplay.classList.add('error');
    errorDisplay.classList.remove('success');
}

function setSuccess(element) {
    const inputField = element.parentElement;
    const errorDisplay = inputField.querySelector('small');
    errorDisplay.innerText = '';
    errorDisplay.classList.add('success');
    errorDisplay.classList.remove('error');
}

function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function login_validation() {
    const loginEmail = login_email.value.trim(),
        loginPassword = login_password.value.trim();

    if (loginEmail === '') {
        setError(login_email, "email can not be blank");
    } else if (!isValidEmail(loginEmail)) {
        setError(login_email, "Provide valid Email");
    } else {
        setSuccess(login_email);
    }

    if (loginPassword === '') {
        setError(login_password, "password can not be blank");
    }  else if (loginPassword.length < 8) {
        setError(login_password, 'Password must be at least 8 characters');
    }
    else {
        setSuccess(login_password);
    }
}

const handleLogin = async (e) => {
    e.preventDefault();

    const loginEmail = login_email.value.trim(),
        loginPassword = login_password.value.trim();

    if (loginEmail && loginPassword) {
        try {
            const login_url='https://mukamadeployts.onrender.com/users/login';
            const response = await fetch(login_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: loginEmail, password: loginPassword })
            });
            const data = await response.json();
            const withBearer = 'Bearer ' + data.token;
            const isAdmin = data.user.userRole === 'admin';

            sessionStorage.setItem('isAdmin', isAdmin);
            sessionStorage.setItem('user', JSON.stringify(data.user));
            sessionStorage.setItem('token', withBearer);
            if (data.token) { // Check if token exists
                alert('Login successful');
                window.location.href = '../index.html';
            }
        
        } catch (error) {
            console.log(error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('#login-user-form')
    .addEventListener('submit', e =>{
        e.preventDefault();
        login_validation();
        
        const allFieldsValid =[
            login_email.parentElement.querySelector('small').classList.contains('success'),
            login_password.parentElement.querySelector('small').classList.contains('success')
        ].every(field => field);
        if(allFieldsValid){
            handleLogin(e);
        }
    });
});
