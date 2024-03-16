const renderSingleBlog = async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const blogId = urlParams.get('id');
        const response = await fetch(`https://mukamabrand202.onrender.com/blogs/${blogId}`);
        const blog = await response.json();

        const titleElement = document.querySelector('.title-blog h1');
        const authorElement = document.querySelector('.title-blog .author-date p');
        const dateElement = document.querySelector('.title-blog .calendar p');
        const imageElement = document.querySelector('.read-full-blog .image-of-blog');
        const contentElement = document.querySelector('.read-full-blog .blog-content');
        const commentElement = document.querySelector('.read-full-blog .statistics .stat:nth-child(2) p');
        const likeCountElement = document.querySelector('.read-full-blog #likeCount');
        const dislikeCountElement = document.querySelector('.read-full-blog #dislikeCount');

        titleElement.textContent = blog.title;
        authorElement.textContent = `By: ${blog.author.username}`;
        dateElement.textContent = new Date(blog.createdAt).toDateString();
        imageElement.src = blog.imageURL;
        contentElement.textContent = blog.content;
        commentElement.textContent = blog.comments.length;
        likeCountElement.textContent = blog.likes;
        dislikeCountElement.textContent = blog.dislikes;

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
            <a  href="./single-blog/readblog.html/?id=${blog._id}"  class="single-blog-summary">
            <img src="${blog.imageURL}" alt="">
            <div class="summary">
                <h2>${blog.title}</h2>
                <div class="author-date">
                    <p>${blog.author.username}</p>
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

const showSimilarBlogs = async() =>{
    try {
        const response = await fetch(blogs_url);
        const blogs = await response.json();
        const currentAuthor = document.querySelector('.left-section-blog .author-date p').textContent.split(':')[1].trim();
        const similarBlogs= blogs.blogs.filter(blog=>blog.author.username===currentAuthor);
        similarBlogs.forEach(blog => {
            similarBlog_card += `
            <a href="./single-blog/readblog.html?id=${blog._id}" class="card">
            <img src="${blog.imageURL}" alt="">
            <div class="card-content">
            <h2>${blog.title}</h2>
                <div class="time-author">
                <p>${blog.author.username}</p>
                    <div class="time">
                        <img src="./images/icons/time-icon.svg" alt="">
                        <p>${new Date(blog.updatedAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </a>
            `;
        });
        document.querySelector('.card-container').innerHTML = similarBlog_card;
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderSingleBlog();
});
document.addEventListener('DOMContentLoaded', showSimilarBlogs);
document.addEventListener('DOMContentLoaded', renderBlogs);




