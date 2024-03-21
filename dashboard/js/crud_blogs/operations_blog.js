let blog_card="";
const blogs_url = 'https://mukamadeployts.onrender.com/blogs';

const list_blogs_dashboard = async () => {
    document.querySelector('.update-blog-form').style.display="none";
    document.querySelector('.add-new-blog-form').style.display="none";
    const backNextBtns=document.querySelector('.back-next-btns');
    try{
        const response = await fetch(blogs_url);
        const blogs = await response.json();

        blogs.blogs.forEach(blog=>{
            blog_card+=`  <div class="single-edit-blog">
            <div class="single-blog">
                <a href="" class="blog-title-link" href="">${blog.title}</a>
                <div class="crud-edit-or-blog">
                    <button class="edit-single-blog" onclick="update_blog('${blog._id}')"><img src="./images/icons/edit.svg" alt=""></button>
                    <button  class="delete-single-blog" onclick="delete_blog('${blog._id}')"><img src="./images/icons/delete.svg" alt=""></button>
                </div>      
            </div>
            <div class="date-of-publication">${new Date(blog.updatedAt).toLocaleDateString()}</div>
        </div>`
        });

    }catch(error){
        console.log(error);
    }
    backNextBtns.insertAdjacentHTML('beforebegin',blog_card);
}

document.addEventListener('DOMContentLoaded', list_blogs_dashboard);


// delete_blog.js

const delete_blog = async (blogId) => {

    try{
        document.getElementById('preloader').style.display = 'block';
        const adminToken = sessionStorage.getItem('adminToken');
        console.log(blogId);
        console.log(adminToken);
         if (confirm("Are you sure you want to delete this blog?") && adminToken) {
            try {
                const response = await fetch(`https://mukamadeployts.onrender.com/blogs/${blogId}`, {
                    method: 'DELETE',
                    headers: {
                        authorization: adminToken
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Success:', data);
                document.getElementById('preloader').style.display = 'none';
               // window.location.reload();
            } catch (error) {
                console.error('Error:', error);
                document.getElementById('preloader').style.display = 'none';
            }
         }

    } catch(error){
        console.error('Error:', error);
    }
}




// show_create_blog_form.js

function show_create_blog_form(){
    document.querySelector('.written-blogs-list').style.display="none";
    document.querySelector('.add-new-blog-form').style.display="block";
    document.querySelector('.filter-add h1').style.display="none";
    document.querySelector('.add-blog-button').style.display="none";
}
document.querySelector('.add-blog-button').addEventListener('click',show_create_blog_form);


document.querySelector('.back_').addEventListener('click',()=>{
    document.querySelector('.add-new-blog-form').style.display="none";
    document.querySelector('.written-blogs-list').style.display="block";
    document.querySelector('.filter-add h1').style.display="block";
    document.querySelector('.add-blog-button').style.display="block";
})

// post a blog

function post_blog() {
    const title = document.querySelector('#title').value,
          content = document.querySelector('#content').value,
          imageURL = document.querySelector('#image').value;
          
    const adminToken = sessionStorage.getItem('adminToken');
    let newBlog = { title, content, imageURL };

    if (title === "" || content === "" || imageURL === "") {
        document.querySelector('.warning-message').innerHTML = "Please fill all the fields";
        return false;
    } else {
        document.getElementById('preloader').style.display = 'block';
        fetch(blogs_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': adminToken 
            },
            body: JSON.stringify(newBlog)
        })
        .then(response => {
            if (!response.ok) {
                const message = `An error has occurred: ${response.status}`;
                throw new Error(message);
            }
            return response.json(); 
        })
        .then(data => {
            document.getElementById('preloader').style.display = 'none';
            console.log('Success:', data);
            window.location.href = "http://127.0.0.1:5503/dashboard/bloglist.html";
        })
        .catch((error) => {
            console.error('Error:', error);
            document.getElementById('preloader').style.display = 'none';
        });
    }
}

document.querySelector('.post-btn').addEventListener('click', post_blog);





// update a blog by PUT

const update_form = document.querySelector('.update-blog-form'),
      update_title = document.querySelector('#update_title'), 
      update_content = document.querySelector('#update_content'),
      update_image = document.querySelector('#update_image'),
      saveBtn = document.querySelector('.save_updates_btn');


let currentBlogId = null;
const update_blog = async (blogId) => {
    currentBlogId = blogId;
   
    document.querySelector('.written-blogs-list').style.display="none";
    console.log(blogId);
    const blogUrl = `https://mukamadeployts.onrender.com/blogs/${blogId}`;
    const adminToken = sessionStorage.getItem('adminToken');
    update_form.style.display = "block";
    
    if(adminToken){
        try{
           
           // document.getElementById('preloader').style.display = 'block';
            const response = await fetch(blogUrl);
            const blogData = await response.json();
            console.log(blogData);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            // Set the values of the input fields in the update form
            update_title.value = blogData.blog.title;
            update_content.value = blogData.blog.content;
            update_image.value = blogData.blog.imageURL;
           

           // document.getElementById('preloader').style.display = 'none';
            const updateResponse = await fetch(blogUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: adminToken
                },
                body: JSON.stringify({ title: update_title.value, content: update_content.value, imageURL: update_image.value })
            });
            if (!updateResponse.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await updateResponse.json();
            console.log('Success:', data);
           // document.getElementById('preloader').style.display = 'none';
            window.location.href = "http://127.0.0.1:5503/dashboard/bloglist.html";
           
        } catch(error){
           // document.getElementById('preloader').style.display = 'none';
            console.error('Error:', error);
        }
    } else{
        console.log('You are not authorized to perform this operation');
    
    }
}

saveBtn.addEventListener('click', () => {
    if (currentBlogId) {
        update_blog(currentBlogId);
    } else {
        console.log('No blogId is set');
    }
});




document.querySelector('.back_update').addEventListener('click',()=>{
    document.querySelector('.update-blog-form').style.display="none";
    document.querySelector('.written-blogs-list').style.display="block";
    document.querySelector('.filter-add h1').style.display="block";
    document.querySelector('.add-blog-button').style.display="block";
})




/* 

{
  "message": "Blog created successfully",
  "blog": {
    "title": "Martin Luther King",
    "content": "Martin Luther King Jr. (born Michael King Jr.; January 15, 1929 – April 4, 1968) was an American Christian minister, activist, and political philosopher who was one of the most prominent leaders in the civil rights movement from 1955 until his assassination in 1968. A Black church leader and a son of early civil rights activist and minister Martin Luther King Sr., King advanced civil rights for people of color in the United States through the use of nonviolent resistance and nonviolent civil disobedience against Jim Crow laws and other forms of legalized discrimination.",
    "imageURL": "https://th.bing.com/th/id/R.b3c63a1c548f768160cfe2ee26ea2ed5?rik=lt24OIqawhM4GQ&pid=ImgRaw&r=0",
    "comments": [],
    "author": [
      "65f9a918030614e1d572a354"
    ],
    "likes": [],
    "dislikes": [],
    "_id": "65fb4ece09517ed2b3e3a630",
    "updatedAt": "2024-03-20T21:02:07.007Z",
    "createdAt": "2024-03-20T21:02:07.007Z",
    "__v": 0
  }
}
*/