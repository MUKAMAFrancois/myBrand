document.addEventListener('DOMContentLoaded', get_all_messages);

let single_notification = "";

async function get_all_messages() {
    const get_url = 'https://mukamadeployts.onrender.com/messages';
    const adminToken = sessionStorage.getItem('adminToken');

    if (adminToken) {
        try {
            const response = await fetch(get_url,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': adminToken
                    }
                }
                );
            const data = await response.json();
            if (!response.ok) throw new Error('An error occurred while fetching the messages');

            data.messages.slice(0, 5).forEach(message => {
                single_notification += `
                    <div class="single-notification">
                        <div class="message-notification">
                            <p>${message.content}.</p>
                            <div class="date-of-notification">${new Date(message.createdAt).toLocaleDateString()}</div>
                        </div>
                        <div class="respond-or-delete">
                            <a class="email-notif" href="mailto:recipient@example.com"><img src="./images/icons/email-icon.svg" alt=""></a>
                            <a class="delete-notif" href="#" onclick="deleteFunction()"><img src="./images/icons/delete.svg" alt=""></a>
                        </div>
                    </div>`;
            });
            document.querySelector('.notifications-container').innerHTML = single_notification;
            document.querySelector('.total-subs').innerHTML = `All Messages (${data.messages.length})`;
        } catch (error) {
            console.log(error);
        }
    } else {
        console.log('You are not authorized to view this page');
    }
}





/* 

{
  "messages": [
    {
      "_id": "65eac31f9ac3f22e8de5fe11",
      "content": "This is a test message.",
      "date": "2024-03-08T07:49:51.686Z",
      "createdAt": "2024-03-08T07:49:51.694Z",
      "updatedAt": "2024-03-08T07:49:51.694Z",
      "__v": 0
    }
  ]
}
*/