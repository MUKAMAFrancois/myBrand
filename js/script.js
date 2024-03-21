let topMenu = document.querySelector('.menu-list-top');
function clickingX_Symbolmenu(){
    topMenu.style.right="-220px";

}


function openMenu(){
    // remember that we have set the right to be -220px (not showing), then here we will show it.
    topMenu.style.right="0";

}

function closeMenu(){
    topMenu.style.right="-220px";
}