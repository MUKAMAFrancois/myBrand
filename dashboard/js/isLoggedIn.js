// At the start of each dashboard page
// document.addEventListener('DOMContentLoaded', () => {
//     const user = JSON.parse(sessionStorage.getItem('user'));
//     const token = sessionStorage.getItem('token');

//     if (!token || (user && user.userRole !== 'admin')) {
//         window.location.href = '../../index.html'; // Redirect to login page
//     }
// });
document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const adminToken = sessionStorage.getItem('adminToken');

    if (!adminToken || (user && user.userRole !== 'admin')) {
        window.location.href = '../../index.html';// Redirect to home page
    }
});