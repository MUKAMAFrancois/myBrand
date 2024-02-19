let blog_data=[
    // {id:1,
    //     title:"Why You must Love JS?", 
    //     type:"Technology",
    //     image:"images/increment.jpeg",
    //     // author:"John Doe",
    //     date:"12th May 2021",
    //     content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. "
    // },

    // {id:2,
    //     title:"The Hero of the 21st Century", 
    //     type:"Politics",
    //     image:"images/increment.jpeg",
    //     // author:"James Millina",
    //     date:"19th June 2021",
    //     content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. "
    // }
];

function readBlogs(){
    document.querySelector('.update-blog-form').style.display="none";
    document.querySelector('.add-new-blog-form').style.display="none";
    const backNextBtns=document.querySelector('.back-next-btns');

    // Read the data from local storage and parse as JSON
    let deserialized_data = JSON.parse(localStorage.getItem('blog_data')) || [];

    if (!deserialized_data.length) {
        console.warn("Error: Blog data not found.");
        return;
    }

    localStorage.setItem("blog_data",JSON.stringify(deserialized_data));
    let elements="";
    deserialized_data.map(record=>{
        elements+=`  
        <div class="single-edit-blog">
            <div class="single-blog">
                <a class="blog-title-link" href="">${record.title}</a>
                <div class="crud-edit-or-blog">
                    <div><button type="button" class="edit-single-blog"><img src="./images/icons/edit.svg" alt=""></button></div>
                    <div><button type="button" class="delete-single-blog"  onclick="deleteRecord(${record.id})"><img src="./images/icons/delete.svg" alt=""></button></div>
                </div>
                  
            </div>
            <div class="date-of-publication">${record.date}</div>
        </div>
        `;
    });

    backNextBtns.insertAdjacentHTML('beforebegin',elements);
}


function createBlog(){
    document.querySelector('.written-blogs-list').style.display="none";
    document.querySelector('.add-new-blog-form').style.display="block";
    document.querySelector('.filter-add h1').style.display="none";
    document.querySelector('.add-blog-button').style.display="none";

}
document.querySelector('.add-blog-button').addEventListener('click',createBlog);

function postBlog(){
    const title=document.querySelector('#title').value,
          content=document.querySelector('#content').value,
          type=document.querySelector('#type').value,
          date=document.querySelector('#datepicker').value,
          image=document.querySelector('#image').value,
          id =blog_data.length+1;
    let newBlog={title:title, content:content, type:type, date:date, image:image,id:id};

    if (title==="" || content ===""|| type ==""|| date==""){
        alert("Please fill all the fields");
        return false;
    }
    else{
        blog_data.push(newBlog);
        localStorage.setItem("blog_data", JSON.stringify(blog_data)); // Save the updated blog_data array to local storage
    
        document.querySelector('.written-blogs-list').style.display="none";
        document.querySelector('.add-new-blog-form').style.display="block";
        document.querySelector('.filter-add h1').style.display="none";
        document.querySelector('#title').value="";
        document.querySelector('#content').value="";
        document.querySelector('#type').value="";
        document.querySelector('#datepicker').value="";
        document.querySelector('#image').value="";
        console.log(blog_data);
        readBlogs();
        window.location.href="./bloglist.html";
    }
}

document.querySelector('.post-btn').addEventListener('click',postBlog);

