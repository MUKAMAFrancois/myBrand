// Post a comment
const post_comment = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');

    const comment_url=`https://mukamadeployts.onrender.com/comments/${blogId}`;

    const comment = document.getElementById('comment-input').value;
    const token = sessionStorage.getItem('token');

    if(token){
        try {
            document.getElementById('preloader').style.display = 'block';
    
            const response = await fetch(comment_url,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token
                },
                body: JSON.stringify({content: comment})
            });
    
            if(!response.ok){
                throw new Error(response.statusText);
            }
    
            // Clear comment input
            document.getElementById('comment-input').value = '';
    
            const data = await response.json();
            console.log(data);
            document.getElementById('preloader').style.display = 'none';
        } catch (error) {
            console.log(error);
            document.getElementById('preloader').style.display = 'none';
        }
    } else {
        console.log("User not logged in"); 
        document.querySelector('.error').innerHTML = "You need to be logged in to comment";
    }

    list_comments_per_blog();
}

document.getElementById('publish').addEventListener('click', post_comment);

// List comments for a blog
const list_comments_per_blog = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');
    const comment_url=`https://mukamadeployts.onrender.com/comments/${blogId}`;
    const token = sessionStorage.getItem('token');

    try {
        document.getElementById('preloader').style.display = 'block';
        const response = await fetch(comment_url,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: token
            }
        });

        if(!response.ok){
            throw new Error(response.statusText);
        }

        const data = await response.json();
        console.log(data);

        let comment_template = ""; // Reset comment template
        data.comments.forEach(comment => {
            comment_template += `
            <div class="single-commented">
                <img src="./images/comment_imgs/user1.png" alt="">
                <div class="written-comment">
                    <h4>${comment.commentor.username}</h4>
                    <p>${comment.content}<br> <span id="comment-date">Commented on: ${new Date(comment.date_of_comment).toLocaleDateString()}</span></p>
                </div>
            </div>
            `;
        });

        document.querySelector('.comments').innerHTML = comment_template;
        document.getElementById('preloader').style.display = 'none';
    } catch (error) {
        console.log(error);
        document.getElementById('preloader').style.display = 'none';
    }
}

    


