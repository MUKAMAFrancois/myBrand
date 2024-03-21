


// protect signup and login pages when user is logged in

document.addEventListener('DOMContentLoaded', () => {
        protect_signup();

    function protect_signup(){
        const adminToken = sessionStorage.getItem('adminToken');
        const userToken = sessionStorage.getItem('token');
        
        if (adminToken || userToken) {
            window.location.href = '../../index.html';
        }
    }
});