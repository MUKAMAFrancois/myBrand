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
                    <button class="edit-single-blog"><img src="./images/icons/edit.svg" alt=""></button>
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



// delete_blog.js

const delete_blog = async (blogId) => {

    try{
        let token = sessionStorage.getItem('token');
        console.log(blogId);
        console.log(token);
        // if (confirm("Are you sure you want to delete this blog?")) {
            try {
                const response = await fetch(`https://mukamadeployts.onrender.com/blogs/${blogId}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: token
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Success:', data);
               // window.location.reload();
            } catch (error) {
                console.error('Error:', error);
            }
        // }

    } catch(error){
        console.error('Error:', error);
    }
}

// function delete_blog(blogId){
//     let token = sessionStorage.getItem('token');
//     console.log(blogId);
//     console.log(token);
//     if(confirm("Are you sure you want to delete this blog?")){
//         fetch(`https://mukamadeployts.onrender.com/blogs/${blogId}`,{
//             method: 'DELETE',
//             headers:{
//                 Authorization: token
//             }
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Success:', data);
//             window.location.reload();
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });
//     }
// }


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
    const title=document.querySelector('#title').value,
          content=document.querySelector('#content').value,
          imageURL=document.querySelector('#image').value;
          
    let token = sessionStorage.getItem('token');
    let newBlog={title, content,imageURL};

    if (title==="" || content ==="" || image ===""){
        document.querySelector('.warning-message').innerHTML="Please fill all the fields";
        return false;
    }
    else{
        document.getElementById('preloader').style.display = 'block';
        fetch(blogs_url,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify(newBlog)
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('preloader').style.display = 'none';
            console.log('Success:', data);
            window.location.href="http://127.0.0.1:5503/dashboard/bloglist.html";
        })
        .catch((error) => {
            console.error('Error:', error);
            document.getElementById('preloader').style.display = 'none';
        });
    }
}
document.querySelector('.post-btn').addEventListener('click',post_blog);


// edit a blog.js