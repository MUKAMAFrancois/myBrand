function registration(event){
    let reg_email = document.querySelector('.registration-email').value,
        reg_password = document.querySelector('.registration-password').value;
    
    let data = JSON.parse(localStorage.getItem('formData')) || [];
    let doesExist = data.length && data.some(existdata => existdata.reg_email === reg_email);
    
    if(doesExist){
        alert(`User with ${reg_email} Exists. Just Sign In`);
    } else {
        data.push({reg_email, reg_password});
        localStorage.setItem('formData', JSON.stringify(data));
        alert("Registration successful!");
        console.log(data);
        window.location.href = "./login.html"; 
    }

    event.preventDefault();
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.signup-button').addEventListener('click', registration);
});
