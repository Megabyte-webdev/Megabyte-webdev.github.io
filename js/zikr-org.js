function toggle() {

    var menu = document.querySelector(".menu-toggle");
    var nav = document.querySelector(".nav");
    var icon = document.querySelector(".icon");


    if (!(menu.className === "menu-toggle active" && nav.className === "nav responsive")) {

        menu.className = "menu-toggle active";

        nav.className = "nav responsive";

        icon.className = "icon active";

    } else {

        menu.className = "menu-toggle";

        nav.className = "nav";

        icon.className = "icon";

    }
	nav.onmouseleave=function(){
		 menu.className = "menu-toggle";

        nav.className = "nav";

        icon.className = "icon";
	}

}




//ShowOnScroll//

window.onload=()=>{
var body=document.document || document.body;
var scroll = window.requestAnimationFrame || function(callback){ 
window.setTimeout(callback, 1000)
}; 

var elementsToShow = document.querySelectorAll('.show-on-scroll'); 


var email=document.querySelector('#email');
 
var btn1=document.querySelector('.addbut1');

var validateEmail = function(elementValue) {

    var emailPattern = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);

    return emailPattern.test(elementValue);

}

email.onkeyup=function(e) {
e=this || e;
 

    var value = e.value;

    var valid = validateEmail(value);

 

    if (!valid) {

        e.style.color= 'red';

btn1.setAttribute('disabled', 'disabled');

    } else {

        e.style.color= '#2bb673';


btn1.removeAttribute('disabled');

    }

};

 

function loop() { 
var elementsToShow = document.querySelectorAll('.show-on-scroll'); 
elementsToShow.forEach(function (element) {
 if (isElementInViewport(element)) {
 element.classList.add('is-visible'); 
} else {
 element.classList.remove('is-visible'); 
} 
}); 

 }
 body.onscroll=loop;
loop();

function isElementInViewport(el) {

 var rect = el.getBoundingClientRect(); 
return ( (rect.top <= 0 && rect.bottom >= 0) || (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) && rect.top <= (window.innerHeight || document.documentElement.clientHeight)) || (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) );
 }
}