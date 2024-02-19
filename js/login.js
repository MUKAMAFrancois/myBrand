let isSignedIn = false;

function login(event) {
    let login_email = document.querySelector('.login-email').value;
    let login_password = document.querySelector('.login-password').value;
    let data = JSON.parse(localStorage.getItem('formData')) || [];
    let exist = data.length && data.some(existdata => existdata.reg_email === login_email && existdata.reg_password === login_password);

    if (!exist) {
        alert("Please create your account. It's your first time here.");
    } else {
        alert("Login successful!");
        isSignedIn = true;
        updateSignInStatus();
        window.location.href = "./index.html"; 
    }

    event.preventDefault();
}

function updateSignInStatus() {
    let signInLink = document.querySelector('.signIn-link');
    let signOutLink = document.querySelector('.signOut-link');
    
    if (isSignedIn) {
        signInLink.style.display = 'none';
        signOutLink.style.display = 'block';
    } else {
        signInLink.style.display = 'block';
        signOutLink.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateSignInStatus();
    document.querySelector('.login-button').addEventListener('click', login);
});

