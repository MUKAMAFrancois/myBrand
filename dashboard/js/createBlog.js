// createBlog.js

import { blog_data } from "./blogList.js";


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



