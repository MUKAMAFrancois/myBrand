document.addEventListener('DOMContentLoaded', () => {
    updateLoginStatus();

    function updateLoginStatus() {
        const token = sessionStorage.getItem('token');
        const adminToken = sessionStorage.getItem('adminToken');
        if (token || adminToken) {
            // If token exists, hide Sign In button and show Sign Out button
            document.querySelector('.signIn-link').style.display = 'none';
            document.querySelector('.signOut-link').style.display = 'block';
        } else {
            // If token does not exist, show Sign In button and hide Sign Out button
            document.querySelector('.signIn-link').style.display = 'block';
            document.querySelector('.signOut-link').style.display = 'none';
        }
    }
});
