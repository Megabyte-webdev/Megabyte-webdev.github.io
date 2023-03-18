var lastPos=0;
window.addEventListener("scroll",function(){
   var scrll=document.body.scrollTop || document.documentElement.scrollTop;


    if( scrll > lastPos  ){
        document.querySelector('#heading').classList.add('slideup')
        document.querySelector('nav').classList.add('slideup')

    }else{
        document.querySelector('#heading').classList.remove('slideup')
        document.querySelector('nav').classList.remove('slideup')}
window.addEventListener("touchend",function(){
lastPos=scrll
})
})

window.onload=()=>{
var search = document.querySelector('.search-bar input');
    var searchBtn = document.querySelector('.search-bar .search-icon');
    
    
    searchBtn.onclick = FindInPage;

async function FindInPage() {
alert('searching')
        
        let inputVal = search.value.toLowerCase();

var htmlText = document.querySelectorAll('body *');
        for (var i = 0; i < htmlText.length; i++) {

            var Text = htmlText[i];
            var doc = Text.innerText.toLowerCase().indexOf(inputVal)



            function positive() {
                
                 

                Text.innerHTML = Text.innerHTML.toLowerCase().replace(inputVal, '<b style="background: red; color: white;">'+inputVal+'</b>');


                


            }
            function negative() {

                Text.innerHTML = Text.innerHTML.toLowerCase().replace(/(<([^>]+)>)/gi, "");
                
                
            }
            if (inputVal === "") {
                search.focus();
                hideloader();
                negative();
                
            } else if (doc !== -1 && inputVal !== "") {
                await positive();

                //waitForMs(3000).then(hideloader)


            } else {

                await negative();
                //waitForMs(2000).then(hideloader)
            }


        }
    }
function waitForMs(ms) {

        return new Promise(resolve => setTimeout(resolve, ms))

    }

}

