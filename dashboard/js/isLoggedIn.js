// At the start of each dashboard page
document.addEventListener('DOMContentLoaded', () => {
    const isAdmin = sessionStorage.getItem('isAdmin');
    const token = sessionStorage.getItem('token');

    if (!isAdmin || !token) {
        window.location.href = '../../index.html'; // Redirect to login page
    }
});