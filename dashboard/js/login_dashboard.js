function login_dashboard(event){
    let login_email = document.querySelector('#email_dashboard').value;
    let login_password = document.querySelector('#password_dashboard').value;
    
    // Check if the email and password match the admin credentials
    if (login_email === 'admin@gmail.com' && login_password === '1234') {
        alert("Login successful!");
        window.location.href = "./addNewBlog.html";
    } else {
        alert("Invalid email or password. Please try again.");
    }

    event.preventDefault();
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#login_to_dashboard').addEventListener('click', login_dashboard);
});
