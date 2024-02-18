/* =======ADD BLLOG====== */
// blogList.js
import { deleteRecord,editBlog } from "./editBlog.js";
export let blog_data=[
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
    },
    {id:3,
        title:"Stay Healthy, Stay Happy", 
        type:"Politics",
        image:"images/increment.jpeg",
        // author:"James Millina",
        date:"19th June 2021",
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. "
    }

];

export function readBlogs(){
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



window.readBlogs=readBlogs;