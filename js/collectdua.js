window.onload = ()=> {
    var container = document.querySelector('#dua-collections'),
		dua_list = document.querySelector('.dua-list')

    function createCell(parent, n) {
        var cellContainer = document.createElement('div');
        cellContainer.className = 'link';

        for (var i = 0; i < n; i++) {
            var cell = document.createElement('a');
            cell.className = 'cell';
            cell.textContent=arabicNumeric(i+1)
            cellContainer.appendChild(cell);

        }
        parent.appendChild(cellContainer);

        allCells = parent.querySelectorAll(".cell")


        allCells.forEach((e, index) => {
            if (index === 0) {
                gotoSlide(allCells[index], index);
            }
            e.addEventListener('click', function() {

                gotoSlide(this, index);

            });

        });

    }
    updateCell = function (e, index) {
        let sibling = e.parentElement.parentElement.querySelectorAll('.cell')
        let cousin = e.parentElement.parentElement.querySelectorAll('.dua-sub')

        for (var i = 0; i < sibling.length; i++) {
            sibling[i].classList.remove("active");

        }

		
         sibling[index].classList.add("active");

    };

    function gotoSlide(e, n) {
        let cousin = e.parentElement.parentElement.querySelectorAll('.dua-sub')

        var dua_container = e.parentElement.parentElement.querySelector('.group');
        for (var i = 0; i < cousin.length; i++) {
            cousin[i].style.boxShadow = "";
        }
        var body = document.documentElement || document.body;

	
        if (body.offsetWidth < 900) {
			
            dua_container.scrollLeft = n * (cousin[n].offsetWidth);
            
        } else {
          
            dua_container.scrollLeft = ([n] * (cousin[n].offsetWidth)-250);
           
        }
		cousin[n].style.boxShadow = "0px 0px 10px 10px black";
		

        updateCell(e, n);

    }
	function Slide(e, n) {
		console.log(e.className,n)
        let cousin = e.querySelectorAll('.dua-sub')

       for (var i = 0; i < cousin.length; i++) {
            cousin[i].style.boxShadow = "";
        }
       


       
            for (var i = 0; i < cousin.length; i++) {

                cousin[i].classList.add("center");
            }
            e.scrollLeft = n * (cousin[n].offsetWidth);
            
       

         let sibling = e.parentElement.querySelectorAll('.cell')
      

        for (var i = 0; i < sibling.length; i++) {
            sibling[i].classList.remove("active");

        }

		cousin[n].style.boxShadow = "0px 0px 10px 10px black";
         sibling[n].classList.add("active");

    }
	
	

var animate =function(callback){ 
window.setTimeout(callback, 1000/(60*60))
}; 
function ScrollUpdateActiveDot(e) {
var curr_dua=e.querySelectorAll('.dua-sub');

    var currentScrollLeft = e.scrollLeft;

	pos=curr_dua[0].offsetWidth-50;

    var scrollStepSize = pos;
    var currentSlideIndex = Math.round(currentScrollLeft / scrollStepSize);
	for (var i = 0; i < curr_dua.length; i++) {
            curr_dua[i].style.boxShadow = "";
    }
	

	 
   updateCell(e, currentSlideIndex)
   curr_dua[currentSlideIndex].style.boxShadow = "0px 0px 10px 10px black";
   
	animate(ScrollUpdateActiveDot)



  }
  
function arabicNumeric(n) {



        var NumberSystem = ['٠',
            '١',
            '٢',
            '٣',
            '٤',
            '٥',
            '٦',
            '٧',
            '٨',
            '٩'];

        if (n > 9) {
            var Num = [],
            splitNum;
            var numTotext = String(n)
            for (let j = 0; j < numTotext.length; j++) {
                Num.push(NumberSystem[Number(numTotext[j])])

            }
            return Num.join("")
            //alert(Num.join(""))


        } else {
            return NumberSystem[n]
            //alert(NumberSystem[n])
        }

    }

    Dua.forEach((e, index)=> {

        if (e.name !== (null || undefined) && e.duas !== (null || undefined) && e.duas.length > 1) {
            var subCollection = document.createElement('div')
            subCollection.className = "dua-sub-collections";
            var group = document.createElement('div');

            group.className = "group";
            e.duas.forEach(e=> {

                var divMain = document.createElement('div');
                divMain.className = "d dua-sub";
                
                var divSub = document.createElement('div');
                var heading = document.createElement('h4')
                var p = document.createElement('p')
                heading.innerHTML = e.title;

                divSub.innerHTML = "<h6 class='arabic'>"+ e.arabic +"</h6><cite class='transliteration'>"+ e.transliteration +"</cite><p class='translation'>"+ e.translation +"</p><em>"+e.reference+"</em>";
                divSub.innerHTML = divSub.innerHTML.replace("undefined","");
				divMain.appendChild(heading);
                divMain.appendChild(divSub)

                group.appendChild(divMain);
                subCollection.appendChild(group);
                 

            });
            if (e.duas.length > 1) {
                var mainHeading = document.createElement('h1')
                mainHeading.innerHTML = e.name;
                subCollection.appendChild(mainHeading)
                createCell(subCollection, e.duas.length)
            }
            container.appendChild(subCollection)
           document.querySelectorAll('.group').forEach(e=> {
			   /*
                e.onclick = function() {

                    e.querySelectorAll('.dua-sub').forEach(e=> {
                        e.classList.remove("center");
                    })
					
                }
				
					e.addEventListener('scroll', function(){
					
					ScrollUpdateActiveDot()
				})
				*/
				
            });

        } else if (e.duas !== (null || undefined) && e.duas.length < 2) {
            e.duas.forEach(e=> {
                var divMain = document.createElement('div');
                divMain.className = "d dua";
                var divSub = document.createElement('div');
                var heading = document.createElement('h4')
                var p = document.createElement('p')
                heading.innerHTML = e.title;
                divSub.innerHTML = "<h6 class='arabic'>"+ e.arabic +"</h6><cite class='transliteration'>"+ e.transliteration +"</cite><p class='translation'>"+ e.translation +"</p><em>"+e.reference+"</em>";
                divMain.appendChild(heading);
                divMain.appendChild(divSub)
                container.appendChild(divMain)
                
            })
           
        }
        
    });
    
	
	function enLarge(){
    var group=document.querySelectorAll(".dua-sub-collections .group")
     
    group.forEach((e)=>{
		var g=e.querySelectorAll(".dua-sub")
		 g.forEach((e,index)=>{
		var span=document.createElement('p');
		span.className="icon"
		var svgContent='<svg viewBox="0 0 24 24" width="24" height="20" fill="currentColor" stroke="none"><circle cx="12"cy="4" r="2" /><circle cx="12"cy="12" r="2" /><circle cx="12"cy="20" r="2" /></svg>'
		 span.innerHTML=svgContent;
		 
		 e.appendChild(span);
		 e.addEventListener("mouseover",function(el){
		
		 })
       
		
		
		 var verseInfo = e.querySelector(".icon");
 
       
			

        verseInfo.onclick = function(e) {
			e=this;
			if(e.parentElement.parentElement.parentElement.classList.contains("enlarge")){
					var text="Exit Full screen"
				}else{
					var text = "Full screen";
					
				}
			
		var section = document.createElement('section');
			section.className = "info";
			
			
				var p = document.createElement('p');
				p.textContent = text;
				section.appendChild(p);
				

            var container = e.parentElement;
            if (container.querySelector('.info')) {
                var s = container.querySelector('.info');
                container.removeChild(s);

            } else {
                container.appendChild(section);

            }

            var getP = document.querySelector('.info p');

            getP.onclick = function(e) {
				e=this;
               if(e.parentElement.parentElement.parentElement.parentElement.classList.contains("enlarge")){
					e.parentElement.parentElement.parentElement.parentElement.classList.remove("enlarge")
				}else{
					e.parentElement.parentElement.parentElement.parentElement.classList.add("enlarge")
					Slide(e.parentElement.parentElement.parentElement, index);
					
				}
				
				var s = e.parentElement.parentElement.querySelector('.info');
                e.parentElement.parentElement.removeChild(s);
            }
		  var Info = container.querySelector('.info');
		  
			container.parentElement.onmouseleave = closeInfo;
			function closeInfo() {
				if(container.querySelector('.info')){

					 var s = container.querySelector('.info');
                container.removeChild(s);
				
				}
               
            }
			Info.onmouseleave=closeInfo;
			
		}
		
		 
		 })
    
    })
    
}
        enLarge();
		
		
		
   
    dua_list.innerHTML = "Show <span>"+document.querySelectorAll('#dua-collections .d').length+"</span>";


    function Load() {


        document.getElementById('Dua-loader').className = "active";

    }

    function hideloader() {

        document.getElementById('Dua-loader').classList.remove("active");


    }


    function waitForMs(ms) {

        return new Promise(resolve => setTimeout(resolve, ms))

    }

    var search = document.querySelector('.search input');
    var searchBtn = document.querySelector('.search a');




    var all_duas = document.querySelectorAll('#dua-collections > div')
var all_dua_tag = document.querySelectorAll('.d')
/*
var dropdown = document.createElement('div');
    dropdown.className = "dropdown";
    for (var i = 0; i < all_dua_tag.length; i++) {
        var dropdownContent = document.createElement('p');
        var content = all_dua_tag[i].querySelector('h4').textContent;
        dropdownContent.textContent = content;
dropdownContent.onclick=function(){
        search.value= this.textContent;
FindInPage();
var drop = this.parentElement.parentElement.querySelector(".dropdown")


this.parentElement.parentElement.removeChild(drop)

}
        dropdown.appendChild(dropdownContent);
    }

    
    search.oninput = function() {
        this.parentElement.appendChild(dropdown)
        var dropContent = this.parentElement.querySelectorAll(".dropdown p")
        let inputVal = this.value.toLowerCase();

        var arr = [];
        for (var i = 0; i < dropContent.length; i++) {
            var correlate = dropContent[i].innerText.toLowerCase().indexOf(inputVal)

            arr.push(correlate)

            if (inputVal !== "" && correlate !== -1) {
                dropContent[i].classList.add("predict")
                var predicted = document.querySelectorAll('.predict');
                predicted[0].classList.add('accurate')
            }else {
                dropContent[i].classList.remove("accurate")
                dropContent[i].classList.remove("predict")

            }


        }


        var drop = this.parentElement.querySelector(".dropdown")
        this.parentElement.onmouseleave = function() {
            if (drop) {

                this.removeChild(drop)

            }
        }

    }*/

    search.onchange = async function() {
		
        Load();
		
        let inputVal = search.value.toLowerCase();

        for (var i = 0; i < all_duas.length; i++) {
            var doc = all_duas[i].innerText.toLowerCase().indexOf(inputVal)



            function positive() {
                all_duas[i].style.order = "1";

                all_duas[i].classList.add("result")
                // all[i].scrollIntoView()
                // all_duas[i].innerHTML = all_duas[i].innerHTML.toLowerCase().replace(inputVal, '<a class="result-text">'+inputVal+'</a>');

                dua_list.innerHTML = "Found <span>"+document.querySelectorAll('.result').length+"</span>";
                //Speak(arr.length+' Found')


            }
            function negative() {

                all_duas[i].style.order = "5";
                all_duas[i].classList.remove("result")
                //all_duas[i].innerHTML = all_duas[i].innerHTML.toLowerCase().replace("<a class='result'>", "");

                //all_duas[i].id=""


                dua_list.innerHTML = "Found <span>"+document.querySelectorAll('.result').length+"</span>";



            }
            if (inputVal === "") {
                search.focus();
                hideloader();
                negative();
                dua_list.innerHTML = "Show <span>"+document.querySelectorAll('#dua-collections .d').length+"</span>";
            } else if (doc === -1) {

                await negative();
                waitForMs(1000).then(hideloader)
            } else if (doc !== -1 && inputVal !== "") {
                await positive();

                waitForMs(3000).then(hideloader)


            } else {

                await negative();
                waitForMs(2000).then(hideloader)


            }


        }
    }

    var showAll = document.querySelector('.show-all');

    showAll.onclick = function() {
        

        container.style.maxHeight = "max-content";

        this.style.display = "none";
    }



  var searchInput = document.querySelector('.search input');
var body = document.documentElement || document.body;

 if (body.offsetWidth < 700) {
			searchInput.setAttribute('placeholder','After rainfall...')
           
            
        } else {
          
           searchInput.setAttribute('placeholder','search dua e.g After rainfall...')
           
        }
  
     

}



var lastPos=0;
window.addEventListener("scroll",function(){
    var scrll=document.body.scrollTop || document.documentElement.scrollTop;


    if( scrll > lastPos  ){
 
       document.querySelector('nav').classList.add('slideup')
 document.querySelector('#heading').classList.add('slideup')
       
 document.querySelector('.tags').classList.add('slideup')

    }else{
       
document.querySelector('nav').classList.remove('slideup')
 document.querySelector('#heading').classList.remove('slideup')
        document.querySelector('.tags').classList.remove('slideup')}
window.addEventListener("touchend",function(){
lastPos=scrll
})

})
