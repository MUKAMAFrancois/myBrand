/* =======ADD BLLOG====== */
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
                  <div>  <a class="edit-single-blog" href=""><img src="./images/icons/edit.svg" alt=""></a></div>
                   <div> <a class="delete-single-blog" href=""><img src="./images/icons/delete.svg" alt=""></a></div>
                </div>      
            </div>
            <div class="date-of-publication">${record.date}</div>
        </div>`;

    });

    blogListContainer.innerHTML=elements;
}


function createBlog(){
    const title=document.querySelector('#title').value;
    const content=document.querySelector('#content').value;
    const type=document.querySelector('#type').value;
    const date=document.querySelector('#datepicker').value;
    const image=document.querySelector('#image').value;
    const id=blog_data.length+1;

    console.log("Title:", title);
    console.log("Content:", content);
    console.log("Type:", type);
    console.log("Date:", date);
    console.log("Image:", image);



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
}
}


function redirectToEditBlogPage() {
    window.location.href = "./editBlog.html";
}

document.querySelector('.post-btn').addEventListener('click', function() {
    if(createBlog()){
        redirectToEditBlogPage();
    }
});






