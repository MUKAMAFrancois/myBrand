// /*=================PAGINATION=================*/


// const cardsPerPage = 2; // Number of cards to show per page 
// const dataContainer = document.getElementById('data-container'); 
// const pagination = document.getElementById('pagination'); 
// const prevButton = document.getElementById('prev'); 
// const nextButton = document.getElementById('next'); 
// const pageNumbers = document.getElementById('page-numbers'); 
// const pageLinks = document.querySelectorAll('.page-link'); 

// const cards = Array.from(dataContainer.getElementsByClassName('card')); 

// // Calculate the total number of pages 
// const totalPages = Math.ceil(cards.length / cardsPerPage); 
// let currentPage = 1; 

// // Function to display cards for a specific page 
// function displayPage(page) { 
// 	const startIndex = (page - 1) * cardsPerPage; 
// 	const endIndex = startIndex + cardsPerPage; 
// 	cards.forEach((card, index) => { 
// 		if (index >= startIndex && index < endIndex) { 
// 			card.style.display = 'block'; 
// 		} else { 
// 			card.style.display = 'none'; 
// 		} 
// 	}); 
// } 

// // Function to update pagination buttons and page numbers 
// function updatePagination() { 
// 	pageNumbers.textContent = 
// 		`Page ${currentPage} of ${totalPages}`; 
// 	prevButton.disabled = currentPage === 1; 
// 	nextButton.disabled = currentPage === totalPages; 
// 	pageLinks.forEach((link) => { 
// 		const page = parseInt(link.getAttribute('data-page')); 
// 		link.classList.toggle('active', page === currentPage); 
// 	}); 
// } 


// // Event listener for "Previous" button 
// prevButton.addEventListener('click', (e) => { 
// 	e.preventDefault(); // Prevent default behavior
// 	if (currentPage > 1) { 
// 		currentPage--; 
// 		displayPage(currentPage); 
// 		updatePagination(); 
// 	} 
// }); 

// // Event listener for "Next" button 
// nextButton.addEventListener('click', (e) => { 
// 	e.preventDefault(); // Prevent default behavior
// 	if (currentPage < totalPages) { 
// 		currentPage++; 
// 		displayPage(currentPage); 
// 		updatePagination(); 
// 	} 
// }); 

// // Event listener for page number buttons 
// pageLinks.forEach((link) => { 
// 	link.addEventListener('click', (e) => { 
// 		e.preventDefault(); // Prevent default behavior
// 		const page = parseInt(link.getAttribute('data-page')); 
// 		if (page !== currentPage) { 
// 			currentPage = page; 
// 			displayPage(currentPage); 
// 			updatePagination(); 
// 		} 
// 	}); 
// }); 


// // Initial page load 
// displayPage(currentPage); 
// updatePagination();



/*======= menu toggle =========*/
const  menuToggle = document.querySelector('.outer-links');
const closeMenu = document.querySelector('.fa-circle-xmark');
const openMenu = document.querySelector('.fa-bars');
function hideMenu(){
	  menuToggle.style.right = '-220px';
}
function showMenu(){
	menuToggle.style.right = '0px';
}







//* =========SEARCH======= */
function searchBlog(){
	const blogSearch=document.getElementById('search-recent-blog');
	let text_being_typed =blogSearch.value.toLowerCase();
	let list_of_blogs=document.querySelectorAll('.summary h2');

	list_of_blogs.forEach(single_blog=>{
		let blog_text =single_blog.textContent.toLowerCase();
		
		if(blog_text.includes(text_being_typed)){
			single_blog.parentElement.parentElement.style.display="block";
		} else{
			single_blog.parentElement.parentElement.style.display="none";
		}
	})

}

document.getElementById('search-recent-blog').addEventListener('input',searchBlog);

