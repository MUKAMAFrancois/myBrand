
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




