
function login(event) {
    console.log("Button clicked");
    event.preventDefault();

    let login_email = document.querySelector('.login-email').value;
    let data = JSON.parse(localStorage.getItem('formData')) || [];
    
    if (!data.length) {
        alert("Please create your account. It's your first time here.");
    } 
    
    else {
        let exist = data.some(existdata => existdata.reg_email === login_email);
        
        if (!exist) {
            alert("User does not exist. Please sign up.");
        } else {
            alert("Login successful!");
            window.location.href = "/index.html"; 
        }
    }


}
document.querySelector('#logging-in').addEventListener('click', login);






























// // COMMENT SECTION OF A BLOG

// // ---------


// function postComment() {
//     // Check if the user is signed in
//     if (!isSignedIn) {
//         alert("Please sign in to post a comment.");
//         return;
//     }

//     if (!userCommnetInput.value) return;
//     user.name = userInputName.value;
//     user.message = userCommnetInput.value;
//     user.date = new Date().toLocaleString();
//     let published =
//         `<div class="single-commented">
//         <img src="./images/comment_imgs/user1.png" alt="">
//         <div class="written-comment">
//             <h4>${user.name}</h4>
//             <p>${user.message}  <br> <span id="comment-date">${user.date}</span></p>
//             <div class="comment-actions">
//                 <div class="likes">Likes <span>0</span></div>
//                 <div class="dislikes">Dislikes <span>0</span></div>
//             </div>
//         </div>
//     </div>`;

//     comments.innerHTML += published;
//     userCommnetInput.value = '';
//     publishBtn.classList.remove('abled');

//     let allComments = document.querySelectorAll('.single-commented').length;
//     document.getElementById("comment").textContent = allComments;
// }

// publishBtn.addEventListener('click',postComment);

