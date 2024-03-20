//protect_dashboard.js

function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Function to handle login
async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email_dashboard').value.trim();
    const password = document.getElementById('password_dashboard').value.trim();

    if(email === '' || password === '') {
        // Display error message for empty fields
        document.querySelector('.warning-message').innerText = 'Please fill in all fields.';
        return;
    } else if(password.length < 8) {
        // Display error message for short password
        document.querySelector('.warning-message').innerText = 'Password must be at least 8 characters.';
        return;
    } 
    if (!isValidEmail(email)) {
        // Display error message for invalid email
        document.querySelector('.warning-message').innerText = 'Please enter a valid email address.';
        return;
    }

    try {
        const response = await fetch('https://mukamadeployts.onrender.com/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        const withBearer = 'Bearer ' + data.token;
        const isAdmin = data.user.userRole === 'admin';

        sessionStorage.setItem('isAdmin', isAdmin);
        sessionStorage.setItem('user', JSON.stringify(data.user));
        sessionStorage.setItem('token', withBearer);

        if (data.token && isAdmin) {
            // Redirect to dashboard if login is successful
            window.location.href = 'http://127.0.0.1:5503/dashboard/addNewBlog.html';
          
        } else if (data.token && !isAdmin) {
            // Redirect to index page if user is not an admin
            window.location.href = '../../index.html';
        } else if (!data.token) {
            // Display error message if login fails
            document.querySelector('.warning-message').innerText = 'Invalid email or password.';
        }
 
    } catch (error) {
        console.error('Login error:', error);
    }
}

// Add event listener for login button
document.getElementById('login_to_dashboard').addEventListener('click', handleLogin);
