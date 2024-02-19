function login(event){
    let login_email = document.querySelector('.login-email').value;
    let login_password = document.querySelector('.login-password').value;
    let data = JSON.parse(localStorage.getItem('formData')) || [];
    let exist = data.length && data.some(existdata => existdata.reg_email === login_email && existdata.reg_password === login_password);

    if (!exist){
        alert("Please Create your account. It's Your first time here.");
    } else {
        alert("Login successful!");
        window.location.href = "/index.html"; 
    }

    event.preventDefault();
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.login-button').addEventListener('click', login);
});
