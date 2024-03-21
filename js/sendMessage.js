// validate_form.js

const contactForm = document.getElementById('contact-form');
const messageInput = document.getElementById('your_message_contact');
const messageError = document.getElementById('your_message_error');

function displayFlashMessage(message) {
    const flashMessage = document.createElement('div');
    flashMessage.textContent = message;
    flashMessage.classList.add('flash-message');
    document.body.appendChild(flashMessage);

    setTimeout(() => {
        flashMessage.remove();
    }, 3000);
}

const send_message = async () =>{
    const msg_url = `https://mukamadeployts.onrender.com/messages`;
    const message = messageInput.value; 
    const token = sessionStorage.getItem('token');

    if(token){
        try{
            document.getElementById('preloader').style.display = 'block';
            const response = await fetch(msg_url,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token 
                },
                body: JSON.stringify({content: message})
            });

            if(!response.ok){
                throw new Error(response.statusText);
            }

            // Clear message input
            messageInput.value = ''; // Changed the id to match the HTML and corrected the clear method

            const data = await response.json();
            console.log(data);
            document.getElementById('preloader').style.display = 'none';
        }
        catch(error){
            console.log(error);
            document.getElementById('preloader').style.display = 'none';
        }
    } else {
        console.log("User not logged in"); 
        document.querySelector('.error_message').innerHTML = "You need to be logged in to comment";
    }
}

contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    let isValid = true;

    if (messageInput.value.trim() === '') {
        messageError.textContent = 'Please enter your message.';
        isValid = false;
    } else {
        messageError.textContent = '';
    }

    if (isValid) {
        try {
            await send_message(); // Wait for the message to be sent asynchronously
            displayFlashMessage('Your comment has been submitted.');
            window.location.href = "./form_validation.html"; // Redirect after the message is sent
        } catch (error) {
            console.log(error);
        }
    }
});


/* 
{
  "status": "Message sent successfully",
  "message": {
    "content": "I want to reach to you!",
    "_id": "65fb3f6027b8eabb1b094b89",
    "date": "2024-03-20T19:56:16.769Z",
    "createdAt": "2024-03-20T19:56:16.772Z",
    "updatedAt": "2024-03-20T19:56:16.772Z",
    "__v": 0
  }
}
*/