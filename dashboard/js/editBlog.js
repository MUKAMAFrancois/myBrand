//editBlog.js


import { blog_data,readBlogs } from "./blogList.js";
//  EDIT BLOG.


 export function editBlog(id){
    // alert(id);
    document.querySelector('.update-blog-form').style.display="block";
    document.querySelector('.filter-add').style.display="none";
    let existingData=blog_data.find(record=>record.id===id);
    document.getElementById('update_title').value=existingData.title;
    document.getElementById('update_content').value=existingData.content;
    document.getElementById('update_type').value=existingData.type;
    document.getElementById('update_datepicker').value=existingData.date;
    document.getElementById('update_image').value=existingData.image;
    document.getElementById('id').value=existingData.id;
    
}

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

export function deleteRecord(id) {
    if (confirm("Are you sure you want to delete this record?")) {
        DeleteBlog(id);
    }
}


