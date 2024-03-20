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
    
}








const handleSingleBlog = async () => {
    let singleBlogTemplate = ""; 
    try {
        document.getElementById('preloader').style.display = 'block';
        const urlParams = new URLSearchParams(window.location.search);
        const blogId = urlParams.get('id');

        const selectedBlog = await fetch(`https://mukamadeployts.onrender.com/blogs/${blogId}`);
        const blogResponse = await selectedBlog.json();

        if (!selectedBlog.ok) {
            throw new Error(selectedBlog.statusText);
        }

        if (blogResponse.blog) {
            const blog = blogResponse.blog;
           
            singleBlogTemplate += `
            <div class="title-blog">
                <h1>${blog.title}</h1>
                <div class="author-date">
                    <p>By: ${blog.author.username}</p>
                    <div class="calendar">
                        <img src="./images/icons/time-icon.svg" alt="">
                        <p>${new Date(blog.updatedAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
    
            <div class="read-full-blog">
                <img src="${blog.imageURL}" alt="" class="image-of-blog">
                <div class="blog-content">${blog.content}</div>
    
                <div class="statistics">
                    <div class="stat">
                        <img src="./images/icons/views-icon.svg" alt="">
                        <p>123K</p>
                    </div>
                    <div class="stat">
                        <img src="./images/icons/comment-icon.svg" alt="">
                        <p id="comment">${blog.comments.length}</p>
                    </div>
                    <div class="stat">
                        <div class="box_of_likes">
                            <div class="icons">
                                <i  id="likeBtn" class="fa-regular fa-heart"></i>
                                <span class="like" id="likeCount">${blog.likes.length}</span>
                            </div>
                            <div class="icons">
                                <i  id="dislikeBtn" class="fa-regular fa-thumbs-down"></i>
                                <span class="dislike" id="dislikeCount">${blog.dislikes.length}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }

        // Set the content inside the left-section-blog
        document.querySelector('.left-section-blog').innerHTML = singleBlogTemplate;
        document.getElementById('preloader').style.display = 'none';

         // Add event listener for likeBtn
         document.getElementById('likeBtn').addEventListener('click', postLike);
        //document.getElementById('dislikeBtn').addEventListener('click', postDislike);
      
    } catch (error) {
        console.log("Error", error);
        document.getElementById('preloader').style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', handleSingleBlog);

const displayLatestBlogs = async () =>{

}