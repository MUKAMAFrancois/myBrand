const renderSingleBlog = async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const blogId = urlParams.get('id');
        const response = await fetch(`https://mukamabrand202.onrender.com/blogs/${blogId}`);
        const blog = await response.json();
        console.log(response, blog);

        const blogContainer = document.querySelector('.render-single-blog');
        const commentLength = blog.comments ? blog.comments.length : 0;
        const likesLength = blog.likes ? blog.likes.length : 0;
        const dislikesLength = blog.dislikes ? blog.dislikes.length : 0;

        const blogHTML = `
        <div class="title-blog">
        <h1>${blog.title}</h1>
        <div class="author-date">
            <p>By: ${blog.author}</p>
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
                <p id="comment">${commentLength}</p>
            </div>
            <div class="stat">
                <div class="box_of_likes">
                    <div class="icons">
                        <i  id="likeBtn" class="fa-regular fa-heart"></i>
                        <span class="like" id="likeCount">${likesLength}</span>
                    </div>
                    <div class="icons">
                        <i  id="dislikeBtn" class="fa-regular fa-thumbs-down"></i>
                        <span class="dislike" id="dislikeCount">${dislikesLength}</span>
                    </div>
                </div>
            </div>
        </div>
        `;

        blogContainer.innerHTML = blogHTML;

    } catch (error) {
        console.log(error);
    }
};


//single-blog-render-rest.js
let blog_card = "";
const blogs_url = 'https://mukamabrand202.onrender.com/blogs';

const renderBlogs = async () => {
    try {
        const response = await fetch(blogs_url);
        const blogs = await response.json();
        blogs.blogs.slice(0,6).forEach(blog => {
            blog_card += `
            <a  href="./single-blog/readblog.html?id=${blog._id}"  class="single-blog-summary">
            <img src="${blog.imageURL}" alt="">
            <div class="summary">
                <h2>${blog.title}</h2>
                <div class="author-date">
                    <p>${blog.author}</p>
                    <div class="calendar">
                        <img src="./images/icons/time-icon.svg" alt="">
                        <p>${new Date(blog.updatedAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </a>
            `;
        });
        document.querySelector('.list-of-blogs').innerHTML = blog_card;
    } catch (error) {
        console.log(error);
    }
}


let similarBlog_card="";

// const showSimilarBlogs = async() =>{
//     try {
//         const response = await fetch(blogs_url);
//         const blogs = await response.json();
//         const currentAuthor = document.querySelector('.left-section-blog .author-date p').textContent.split(':')[1].trim();
//         const similarBlogs= blogs.blogs.filter(blog=>blog.author.username===currentAuthor);
//         similarBlogs.forEach(blog => {
//             similarBlog_card += `
//             <a href="./single-blog/readblog.html?id=${blog._id}" class="card">
//             <img src="${blog.imageURL}" alt="">
//             <div class="card-content">
//             <h2>${blog.title}</h2>
//                 <div class="time-author">
//                 <p>${blog.author.username}</p>
//                     <div class="time">
//                         <img src="./images/icons/time-icon.svg" alt="">
//                         <p>${new Date(blog.updatedAt).toLocaleDateString()}</p>
//                     </div>
//                 </div>
//             </div>
//         </a>
//             `;
//         });
//         document.querySelector('.card-container').innerHTML = similarBlog_card;
//     } catch (error) {
//         console.log(error);
//     }
// }

document.addEventListener('DOMContentLoaded', async () => {
    await renderSingleBlog();
    // showSimilarBlogs();
    renderBlogs();
});




