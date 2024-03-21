//allBlogs.js
let blog_card = "";
const blogs_url = 'https://mukamadeployts.onrender.com/blogs';

const renderBlogs = async () => {
    try {
        document.getElementById('preloader').style.display = 'block';
        const response = await fetch(blogs_url);
        const data = await response.json();
        data.blogs.forEach(blog => {
            blog_card += `
            <div class="single-blog">
                <img src="${blog.imageURL}" alt="">
                <div class="blog-details">
                    <h3>${blog.title}</h3>
                    <p>${(blog.content).slice(0,80)}<a href="https://mybrand2024.netlify.app/single-blog/readblog.html?id=${blog._id}" class="read-full-blog">Read More</a>
                    </p>
                    <div class="comments-datePublish">
                        <div> <i class="fa-solid fa-message"></i><span style="font-weight: bold; color:#333;">${blog.comments.length}</span></div>
                        <div><i class="fa-solid fa-calendar-days"></i></span> <span style="font-weight: bold; color:#333;">${new Date(blog.updatedAt).toLocaleDateString()}</span></div>
                    </div>
                </div>
            </div>
            `;
        });

        if(!response.ok) throw new Error('An error occurred while fetching the blogs');

        document.querySelector('._all_blogs').innerHTML = blog_card;

        // Now that the blog_card string has been added to the DOM, we can add the event listeners
        document.querySelectorAll('.read-full-blog').forEach(link => {
            link.addEventListener('click', function (event){
                event.preventDefault();
                window.location.href = `../readblog.html/?id=${this.getAttribute('href').split('=')[1]}`;
            });
        });

        document.getElementById('preloader').style.display = 'none';
    } catch (error) {
        console.log(error);
    } finally {
        document.getElementById('preloader').style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', renderBlogs);