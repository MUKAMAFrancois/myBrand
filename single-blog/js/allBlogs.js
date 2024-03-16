//allBlogs.js
let blog_card = "";
const blogs_url = 'https://mukamabrand202.onrender.com/blogs';

const renderBlogs = async () => {
    try {
        const response = await fetch(blogs_url);
        const blogs = await response.json();
        blogs.blogs.forEach(blog => {
            blog_card += `
            <div class="single-blog">
                <img src="${blog.imageURL}" alt="">
                <div class="blog-details">
                    <h3>${blog.title}</h3>
                    <p>${(blog.content).slice(0,80)}<a href="../readblog.html/?id=${blog._id}">Read More</a>
                    </p>
                    <div class="comments-datePublish">
                        <div> <i class="fa-solid fa-message"></i><span style="font-weight: bold; color:#333;">${blog.comments.length}</span></div>
                        <div><i class="fa-solid fa-calendar-days"></i></span> <span style="font-weight: bold; color:#333;">${new Date(blog.updatedAt).toLocaleDateString()}</span></div>
                    </div>
                </div>
            </div>
            `;
        });
        document.querySelector('._all_blogs').innerHTML = blog_card;
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener('DOMContentLoaded', renderBlogs);



