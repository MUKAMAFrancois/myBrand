/* =======ADD BLLOG====== */
// blogList.js

let blog_data=[
    {id:1,
        title:"Why You must Love JS?", 
        type:"Technology",
        image:"images/increment.jpeg",
        // author:"John Doe",
        date:"12th May 2021",
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. "
    },

    {id:2,
        title:"The Hero of the 21st Century", 
        type:"Politics",
        image:"images/increment.jpeg",
        // author:"James Millina",
        date:"19th June 2021",
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. "
    }

];

function readBlogs(){
    document.querySelector('.update-blog-form').style.display="none";
    const blogListContainer = document.querySelector('.written-blogs-list');
    // if (!blogListContainer) {
    //     console.error("Error: Blog list container not found.");
    //     return;
    // }

    localStorage.setItem("blog_data",JSON.stringify(blog_data));
    let deserialized_data=JSON.parse(localStorage.getItem('blog_data'));
    let elements="";
    deserialized_data.map(record=>{
        elements+=`  
        <div class="single-edit-blog">
            <div class="single-blog">
                <a class="blog-title-link" href="">${record.title}</a>
                <div class="crud-edit-or-blog">
                    <div><button type="button" class="edit-single-blog" onclick="editBlog(${record.id})"><img src="./images/icons/edit.svg" alt=""></button></div>
                    <div><button type="button" class="delete-single-blog"  onclick="deleteRecord(${record.id})"><img src="./images/icons/delete.svg" alt=""></button></div>
                </div>
                  
            </div>
            <div class="date-of-publication">${record.date}</div>
        </div>
        `;

    });

    blogListContainer.innerHTML=elements;
}





// createBlog.js

function createBlog(){
    const title=document.querySelector('#title').value;
    const content=document.querySelector('#content').value;
    const type=document.querySelector('#type').value;
    const date=document.querySelector('#datepicker').value;
    const image=document.querySelector('#image').value;
    const id =blog_data.length+1;

    // console.log("Title:", title);
    // console.log("Content:", content);
    // console.log("Type:", type);
    // console.log("Date:", date);
    // console.log("Image:", image);



    let newBlog={title:title, content:content, type:type, date:date, image:image,id:id};
    
    if (title==="" || content ===""|| type ==""|| date==""){
        alert("Please fill all the fields");
        return false;
}
else{
    blog_data.push(newBlog);
    readBlogs();
    document.querySelector('#title').value="";
    document.querySelector('#content').value="";
    document.querySelector('#type').value="";
    document.querySelector('#datepicker').value="";
    document.querySelector('#image').value="";
    console.log(blog_data);
    return true;

}
}


// function redirectToEditBlogPage() {
//     window.location.href = "./bloglist.html";
// }

document.querySelector('.post-btn').addEventListener('click', createBlog);
    // if(createBlog()){
    //     redirectToEditBlogPage();
    // }




//editBlog.js

//  EDIT BLOG.


function editBlog(id) {
    const updateBlogForm = document.querySelector('.update-blog-form');
    if (updateBlogForm) {
        updateBlogForm.style.display = "block";
        document.querySelector('.filter-add').style.display = "none";
        let existingData = blog_data.find(record => record.id === id);
        document.getElementById('update_title').value = existingData.title;
        document.getElementById('update_content').value = existingData.content;
        document.getElementById('update_type').value = existingData.type;
        document.getElementById('update_datepicker').value = existingData.date;
        document.getElementById('update_image').value = existingData.image;
        document.getElementById('id').value = existingData.id;
    } else {
        console.error("Error: Update blog form not found.");
    }
}

document.querySelector('.edit-single-blog').addEventListener('click',editBlog);


function updateBlog(){
    let id = parseInt(document.getElementById('id').value);
    let title=document.querySelector('#update_title').value;
    let content=document.querySelector('#update_content').value;
    let type=document.querySelector('#update_type').value;
    let date=document.querySelector('#update_datepicker').value;
    let image=document.querySelector('#update_image').value;
    let index = blog_data.findIndex(record => record.id === id);
    document.querySelector('.update-blog-form').style.display = "none";
    blog_data[index].title = title; 
    blog_data[index].content = content; 
    blog_data[index].type = type; 
    blog_data[index].date = date; 
    blog_data[index].image = image; 
    readBlogs();

}

document.querySelector('.save_updates_btn').addEventListener('click',updateBlog);


function DeleteBlog(id){
    let index = blog_data.findIndex(record => record.id === id);
    if (index !== -1) {
        blog_data.splice(index, 1);
        readBlogs();
    }
}

function deleteRecord(id) {
    if (confirm("Are you sure you want to delete this record?")) {
        DeleteBlog(id);
    }
}






