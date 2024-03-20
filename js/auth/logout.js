// Function to handle logout
function handleLogout() {
    try {
        const logout_url = 'https://mukamadeployts.onrender.com/users/logout';

        // Make a request to logout endpoint to clear the token
        fetch(logout_url, {
            method: 'GET', // or 'POST' if your backend requires it
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            // Check if logout was successful
            if (response.status === 200) {
                // Clear token from sessionStorage
                sessionStorage.removeItem('token');
                window.location.href = './login.html';
            } else {
                console.error('Logout failed');
            }
        })
        .catch(error => {
            console.error('Error during logout:', error);
            // Handle error
        });
    } catch (error) {
        console.error('Error during logout:', error);
        // Handle error
    }
}

// Attach logout functionality to the logout button
document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.querySelector('.signOut-link');
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
});
