// likes and dislikes

const postLike = async () =>{
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');

    const likeURL=`https://mukamadeployts.onrender.com/blogs/${blogId}/like`;

    const token = sessionStorage.getItem('token');
    if(token){
        try{
            document.getElementById('preloader').style.display = 'block';

            const response = await fetch(likeURL,{
                method: 'POST',
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
            document.querySelector('#likeBtn').style.color = 'red';
            document.getElementById('preloader').style.display = 'none';
        } catch(error){
            console.log(error);
            document.getElementById('preloader').style.display = 'none';
        }
    } else {
        console.log("User not logged in");
        document.querySelector('.error').innerHTML = "You need to be logged in to like";
    }
    number_of_likes_per_blog();
}

document.getElementById('likeBtn').addEventListener('click', postLike);

// get all likes


const number_of_likes_per_blog = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');
    const likeURL = `https://mukamadeployts.onrender.com/blogs/${blogId}/countLikes`;
    try {
        document.getElementById('preloader').style.display = 'block';
        const response = await fetch(likeURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = await response.json();
        console.log(data);
        document.getElementById('likeCount').innerHTML = data.likes.length;
        document.getElementById('preloader').style.display = 'none';
    } catch (error) {
        console.log(error);
        document.getElementById('preloader').style.display = 'none';
    }
}