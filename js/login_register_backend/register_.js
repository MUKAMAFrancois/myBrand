import config from "../../config/config";
const reg_form=document.querySelector('.signup_form_container');

const registerUser = async (e) => {
    e.preventDefault();
    const email = document.querySelector('.registration-email').value.trim();
    const password = document.querySelector('.registration-password').value.trim();
    const password2 = document.querySelector('#confirm-password-registration').value.trim();
    // if (password !== password2) {
    //     alert('Passwords do not match');
    //     return;
    // }
    const user = {
        email,
        password,
        password2
    }
    try {
        const response = await fetch(`${config.link_api}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        }).then((res) => {
            console.log(res.status);
            if(res.status===201){
                alert('User registered successfully');
                window.location.href = '../../login.html';
            } else{
                alert('User already exists');

            }
        });
        const data = await response.json();
        if (data.errors) {
            alert(data.errors);
        } else {
            alert(data.message);
            window.location.href = '../../login.html';
        }
    } catch (error) {
        console.log(error);
    }
}

reg_form.addEventListener('submit', registerUser);