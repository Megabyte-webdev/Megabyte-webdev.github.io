function toggleList(e) {

    if (e.innerText !== "HIDE LIST...") {

        e.innerText = "HIDE LIST...";
        document.querySelector('.slide #list').style.display = 'block';


    } else {

        e.innerText = "SHOW THE LIST";
        document.querySelector('.slide #list').style.display = "none";
    }
}


// (A2) CALENDAR DATA

var updateApiUrl = null,

urlContent = null;
// slideshow //
window.addEventListener("load", function() {
    var showAll = document.querySelectorAll('.show-all');

    // Read("welcome back")
    var images = ['Quran.jpg', 'praying.jpg ', 'Quran2.jpg', 'Allah.jpg', 'surah-white.jpg'];

    var slide = document.querySelectorAll('.slide');
    var current = 0,
    confirmIndex = [current - 1],
    Slide;

    var slider = document.querySelector('.slider'),
    next = document.querySelector('.next'),
    prev = document.querySelector('.prev');

    var bar = document.querySelector('.link');

    showAll.forEach((e, index)=> {
        e.onclick = function() {
            var Verses = document.querySelector('#verses');
            var hadiths = document.querySelector('#hadiths');
            if (index === 0) {
                Verses.style.maxHeight = "max-content";
            } else {
                hadiths.style.maxHeight = "max-content";

            }

            this.style.display = "none";
        }

    })
    function autoSlide() {
        var allCells = document.querySelectorAll(".cell");

        //allCells[current].classList.add("stretch");


        slide[current].style.animation = "slide-Left-out 1.3s ease-out forwards";

        slide[current].addEventListener('animationend',
            function(e) {

                e.className = "slide";

            });

        allCells[current].className = 'cell';

        current = [current + 1]%slide.length;

        slide[current].style.animation = "slide-Left-in 1.3s ease-out forwards";

        slide[current].addEventListener('animationend',
            function(e) {

                e.className = "slide active";

            });
        updateCell();

    }








    // control functions. //

    var playing = true;
    function pauseslide() {

        playing = false;
        clearInterval(Slide);
    }

    function playslide() {

        playing = true;
        Slide = setInterval(autoSlide,
            3000);
    }

    function control() {

        if (playing && Interval) {
            pauseslide();
        } else {
            playslide();
        }
    }


    function gotoSlide(n) {

        pauseslide();
        var allCells = document.querySelectorAll(".cell");



        if (n > current) {

            // allCells[current].classList.add("stretch");
            /* allCells[current].addEventListener("transitionend", function transEnd(e) {
            var allCells = document.querySelectorAll(".cell");
            e = this;

            e.className = 'cell';

            allCells[current].classList.add("active");

        }
        )*/
            allCells[current].className = 'cell';

            slide[current].style.animation = "slide-Left-out 1.3s ease-out forwards";
            slide.className = "slide";

            current = [n + slide.length]%slide.length;

            slide[current].style.animation = "slide-Left-in 1.3s ease-out forwards";

            slide.className = "slide active";


        } else {

            // allCells[current].classList.add("stretch-opposite");
            /* allCells[current].addEventListener("transitionend", function transEnd(e) {
            var allCells = document.querySelectorAll(".cell");
            e = this;

            e.className = 'cell';

            allCells[current].classList.add("active");

        }
        )*/
            allCells[current].className = 'cell';


            slide[current].style.animation = "slide-Right-out 2s ease forwards";
            slide.className = "slide";

            current = [n + slide.length]%slide.length;

            slide[current].style.animation = "slide-Right-in 2s ease forwards";

            slide.className = "slide active";

        }
        updateCell();

    }


    function slideLeft() {

        pauseslide();

        gotoSlide(current - 1);

    }; // end slideLeft//


    function slideRight() {

        pauseslide();

        gotoSlide(current + 1);

    }; // end slideRight//





    function createCell() {


        for (var i = 0; i < slide.length; i++) {
            var anchor = document.createElement('a'); anchor.className = 'cell';
            bar.appendChild(anchor);

        }

        var allCells = document.querySelectorAll(".cell");


        allCells.forEach((e, index) => {
            if (index == 0) {
                e.className = "cell active";
            }
            e.addEventListener('click', () => {

                gotoSlide(index);

            });

        });

    }

    updateCell = function () {
        var allCells = document.querySelectorAll(".cell");

        allCells[current].className = 'cell active';

    }






    function init() {

        var albums = Array.prototype.slice.call(document.querySelectorAll('.image'));
        var createImg;



        for (var i = 0; i < albums.length; i++) {
            var url = images[i];

            createImg = document.createElement('img');

            createImg.src = url;


            albums[i].appendChild(createImg)
        }

        var slider = document.querySelector('.slider');
        document.querySelector('#loader').style.display = "none";
        createCell();
        playslide();

        slider.addEventListener('mouseover',
            pauseslide);
        slider.addEventListener('mouseout',
            playslide);

        next.addEventListener('click',
            slideRight);


        prev.addEventListener('click',
            slideLeft);

        slider.addEventListener('touchstart',
            touchStart);



    }; //end init//

    var id = setTimeout(init, 3000);


    //  Touch function //
    function touchStart(evt) {

        var startTime = (new Date()).getTime(); var startX = evt.changedTouches[0].pageX;

        slider.addEventListener("touchmove", function(evt) {


            var diffX = evt.changedTouches[0].pageX - startX;

            var elapsed = (new Date()).getTime() - startTime;
            /*
console.log( "Swiped " + diffX + " pixels in " + elapsed + " milliseconds" );*/

            if (elapsed < 100 && Math.abs(diffX) > 50) {
                (diffX < 0) ? slideRight(): slideLeft();

            }
        });
    }

    /*
let prayerTimes = document.querySelector('.prayer-time')
let todaysDate = new Date().getDate()
let month = new Date().getMonth() + 1
let year = new Date().getFullYear()
prayerTimes.addEventListener('click', (e) => {
    alert('fetching')
navigator.geolocation.getCurrentPosition(showPosition);
function showPosition(position) {
const latitude = position.coords.latitude;
const longitude = position.coords.longitude
 fetch(`https://api.aladhan.com/timings/${todaysDate}-${month}-${year}?latitude=${latitude}&longitude=${longitude}&method=1`).then(response => response.json()).then(response => {
let dateReadable = document.getElementById('data-readable').innerHTML = response.data.date.readable
let html = ''
for (const [key, value] of Object.entries(response.data.timings)) {
html += ` <li class="list-group-item d-flex justify-content-between align-items-start">
<div class="ms-2 me-auto">
<div class="fw-bold">${key}</div>
${key}
</div>
<span class="badge bg-success p-2 rounded-pill">${value}</span>
</li>`
}
let times = document.querySelector('.prayer-time .solat').innerHTML = html
}).catch(err => {
    alert(err)
let times = document.querySelector('.prayer-time').innerHTML = "<h1 class='mx-auto'> Failed to fetch <a href='/'> Retry</a> </h1>"
})


}
})
*/



    // LOAD DATA FROM LOCALSTORAGE




    ////////// Api Implementation (functions)/////////

    /// Api  error handling ///

    function errorHandle(error) {
        // In case error occurs the errorHandle
        // function will be called
        alert('Error occurred')
        console.log("error occurred",
            error);
    }

    async function getApi(url) {


        try {


            var response = await fetch(url);

            // Storing data in form of JSON

            var data = await response.json()




            if (response) {

                hideloader();

            }



            console.log(data)

            show(data)
            //saveSurah(data);
        }catch(err) {
            errorHandle(err);
            hideloader();
        }




    }

let savedAud=null,
savedSurah=null,
clic
savedVerses=null;

    async function getAudioApi(i, l) {
        var loadSvg = document.querySelector('.modal-foot a svg');
        loadSvg.style.animation = "rotate-loading .3s ease 0s infinite forwards"
        try {
            var response = await fetch(`https://api.alquran.cloud/v1/surah/${i}/editions/ar.alafasy,en.asad,ur.jalandhry?limit=${l}`);




            // Storing data in form of JSON

            var data = await response.json()

            if (response) {
                loadSvg.style.animation = "";
                loadSvg.classList.add("heartBeat");
                loadSvg.addEventListener("animationend", ()=> {
                    this.classList.remove("heartBeat")
                })
                //hideloader();

            }


            let audio_data = data.data[0];
            let en_translation = data.data[1];
            let ur_translation = data.data[2]
          let ay= null
            doc(audio_data, i, l, ay)
            savedAud=audio_data
             savedSurah= i
             savedVerses=l
        }catch(err) {
            alert("eror in parsing audio data");
            hideloader();
            loadSvg.style.animation = "rotate-loading .3s ease 0s infinite forwards";
        }



    }

    function waitForMs(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    // Calling that async function

    function arabicNumeral(n) {



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
    // Function to hide the loader
    function show(data) {


        var surahContent = document.querySelector('.modal .modal-content div');
        surahContent.innerHTML = '<span class="surah-start">بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيم</span>';



        var chapterVerse = data.verses;
        for (var i = 0; i < chapterVerse.length; i++) {

            if (data.id === 1 && i === 0) {
                surahContent.innerHTML = surahContent.innerHTML+"&nbsp;&nbsp;<span>("+arabicNumeral(i+1)+")</span>";
            } else {
                surahContent.innerHTML += "<p id="+i+">"+chapterVerse[i].text+ "<span>("+arabicNumeral(i+1)+")</span></p>";
            }
            
        }
            
/*let written_ayahs=document.querySelectorAll(".modal-content div p");
            
            written_ayahs.forEach((e, index)=>{
                e.onlick=()=>{
                alert(e.innerHTML)
                for(let m=0; m<=written_ayahs.length; m++){
                    written_ayahs[m].style.color="black"
                }
                
   e.style.color="blue"
   clickedAyah=index;
doc(savedAud, savedSurah, savedVerses)

}
            })
         */


        modal.className = "modal active";

    }

    function doc(audio_data, surah, verses) {


var ayahsArray = document.querySelectorAll('.modal-content div > *');

        var ayahsAudioArray = audio_data.ayahs;

        var audioTag = document.querySelector('#Mainplayer');

        let i = 0


        
        
        
        console.log(audio_data)

audioTag.src = ayahsAudioArray[i].audio;

ayahsArray[i+1].style.color = 'green';
        audioTag.addEventListener('ended', () => {

            ayahsArray[i+1].style.color = 'black'
            i++;

            if (i < ayahsArray.length) {
                audioTag.src = ayahsAudioArray[i].audio;
                audioTag.play();
                ayahsArray[i+1].style.color = 'green';


                return;
            } else {
                i = 0
                return;
            }
        
        });




    }


    /////// Api end ////////


    var body = document.documentElement || document.body;
    function Load() {


        document.getElementById('Quran-loader').className = "active";

    }

    function hideloader() {

        document.getElementById('Quran-loader').classList.remove("active");


    }





    var verse = document.querySelectorAll('.verse');
    var verse_list = document.querySelector('.verse-list');

    async function countSurahs() {
        for (let i = 1; i <= verse.length; i++) {
            if (i%40 === 0 || i === verse.length-5) {

                verse_list.innerHTML = "Show <span>...</span>";
                await waitForMs(300);
                verse_list.innerHTML = "Show <span>"+i+"</span>";
                await waitForMs(20);
            } else {

                verse_list.innerHTML = "Show <span>"+i+"</span>";
                await waitForMs(20);
            }

        }

    }

    let c = setTimeout(countSurahs, 5000);
    verse.forEach((e, index) => {
        var span = e.querySelector('span');
        var chapterName = e.querySelector('h3');
        // create Tags//
        var icon = document.createElement('i');
        var p1 = document.createElement('p');
        p1.className = "transl";
        var p2 = document.createElement('p');
        p2.className = "verse-count";

        icon.className = 'voice';
        icon.innerHTML = '<svg viewBox="0 0 24 24" stroke="currentColor" width="24" fill="transparent" height="24"><path class="round" fill="none" d="M8 12L8 4A 5 5 0 0 1 16 4L16 12A 5 5 0 0 1 8 12" /><path id="speaker2" d="M4 8A 5 5 0 0 0 20 8M12 16V22M8 22H16" /> </svg>';

        p1.innerHTML = chapter_list[index].transliteration;
        p2.innerHTML = "verse"+'  '+chapter_list[index].total_verses;


        e.appendChild(p1);
        e.appendChild(p2);

        e.appendChild(icon);

        span.innerHTML = arabicNumeral(index+1);



        chapterName.innerText = chapter_list[index].name;
        var Btn = e.querySelector('.voice');


        Btn.onclick = function() {
            var voice = document.querySelectorAll('.voice');
            for (var i = 0; i < voice.length; i++) {
                voice[i].classList.remove('active');
            }
            this.classList.add('active');
            var Title = "Suratul"+e.querySelector('h3').innerText;
            var p = e.querySelectorAll('p');
            var TitleDesc = p1.innerHTML,
            verse = p2.innerHTML;


            Read(Title.toLowerCase());
            Read(TitleDesc);
            Read(verse);

        }


        e.onmouseleave = function() {
            var s = this.querySelector('.info');
            e.removeChild(s);
        }
    });


    var search = document.querySelector('.search input');
    var searchBtn = document.querySelector('.search a');
    var dropdown = document.createElement('div');
    dropdown.className = "dropdown";
    for (var i = 0; i < verse.length; i++) {
        var dropdownContent = document.createElement('p');
        var content = verse[i].querySelector('.transl').textContent;
        dropdownContent.textContent = content;
        dropdownContent.onclick = function() {
            search.value = this.textContent;
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
                for (var p = 0; p < predicted.length; p++) {
                    predicted[p].classList.remove("accurate")
                }
                predicted[0].classList.add('accurate')
            } else {
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

    }
    search.onblur = function() {

        if (this.value === "") {
            hideloader();
            for (var i = 0; i < verse.length; i++) {
                var headText = verse[i].querySelector('.transl');
                verse[i].classList.remove('result')
                verse[i].style.order = "5";
                headText.innerHTML = headText.innerHTML.toLowerCase().replace(/(<([^>]+)>)/gi, "");


            }

            verse_list.innerHTML = "Show <span>"+verse.length+"</span>";
        }
    }
    searchBtn.onclick = FindInPage;

    async function FindInPage() {
        Load();
        let inputVal = search.value.toLowerCase();


        for (var i = 0; i < verse.length; i++) {

            var headText = verse[i].querySelector('.transl');
            var doc = headText.innerText.toLowerCase().indexOf(inputVal)



            function positive() {
                verse[i].classList.add('result')
                verse[i].style.order = "1";

                document.body.scrollTop = 800;
                headText.innerHTML = headText.innerHTML.toLowerCase().replace(inputVal, '<p>'+inputVal+'</p>');


                verse_list.innerHTML = "Found <span>"+document.querySelectorAll('.verse.result').length+"</span>";


            }
            function negative() {

                verse[i].classList.remove('result')
                verse[i].style.order = "5";
                headText.innerHTML = headText.innerHTML.toLowerCase().replace(/(<([^>]+)>)/gi, "");
                verse_list.innerHTML = verse.length;
                verse_list.innerHTML = "Found <span>"+document.querySelectorAll('.verse.result').length+"</span>";
            }
            if (inputVal === "") {
                search.focus();
                hideloader();
                negative();
                verse_list.innerHTML = "Show <span>"+verse.length+"</span>";
            } else if (doc !== -1 && inputVal !== "") {
                await positive();

                waitForMs(3000).then(hideloader)


            } else {

                await negative();
                waitForMs(2000).then(hideloader)
            }


        }
    }




    slide.forEach((e, index) => {
        var Btn = e.querySelectorAll('a');
        var Btn2 = Btn[1];
        for (var i = 0; i < Btn.length; i++) {

            Btn[i].onmousedown = function() {
                var MainText = this.parentElement.parentElement.querySelector('h1').innerText,
                SubText = this.parentElement.parentElement.querySelector('p').innerText;
                for (var i = 0; i < Btn.length; i++) {
                    Btn[i].classList.remove('active');
                }
                this.classList.add('active');
                //Read(MainText);
                //Read(SubText);
            }
        }

    });



    function Read(Text) {

        var msg = new SpeechSynthesisUtterance;

        msg.text = Text;
        msg.rate = 1;
        msg.volume = 100;
        window.speechSynthesis.speak(msg);



    }


    function waitForMs(ms) {

        return new Promise(resolve => setTimeout(resolve, ms))

    }


    var div = document.createElement('div');
    var div2 = document.createElement('div');


    var divs = document.querySelectorAll("#verses .verse");
    var modal = document.querySelector('.modal');



    var section = document.createElement('section');
    section.className = "info";
    var text = ["Read Quran", "Quran Audio"];
    for (var i = 0; i < text.length; i++) {
        var p = document.createElement('p');
        p.textContent = text[i];
        section.appendChild(p);

    }







    var verseInfo = document.querySelectorAll('.verse div i');
    verseInfo.forEach((e, index)=> {
        var count = [index+1];


        e.onclick = function() {


            var container = e.parentElement.parentElement;
            if (container.querySelector('.info')) {
                var s = container.querySelector('.info');
                e.parentElement.parentElement.removeChild(s);

            } else {
                container.appendChild(section);

            }

            var getP = document.querySelectorAll('.info p');

            getP[0].onclick = function() {
                var count = [index+1];
                Load();
                Quran(e, count, index);


            }
            getP[1].onclick = function() {

                var voice = e.parentElement.parentElement.querySelector('.voice');

                voice.classList.add('heartBeat');
                var s = container.querySelector('.info');
                e.parentElement.parentElement.removeChild(s);
                voice.addEventListener("animationend", function(e) {
                    this.classList.remove('heartBeat')
                });


            }





            var Info = container.querySelector('.info');
            Info.onmouseleave = function() {
                var s = this.parentElement.parentElement.querySelector('.info');
                e.parentElement.parentElement.removeChild(s);
            }
        }



    })
    divs.forEach((e, index) => {
        //e.onclick
    });

    function Quran(e, count, index) {

        var surahContent = document.querySelector('.modal .modal-content div');

        var surahTsM = document.querySelector('.modal .surah-name-english');
        var surahNo = document.querySelector('.modal-head .surah-number');

        var surahVerse = document.querySelector('.modal-foot .surah-verse');
        var surahType = document.querySelector('.modal-foot .surah-type');

        surahContent.innerHTML = "";

        //// Api implementation ///
        var surahName = document.querySelectorAll('.modal .surah-name');
        var surahTs = document.querySelector('.modal .surah-translation');

        var player = document.querySelector('.modal-foot');



        for (var i = 0; i < surahName.length; i++) {
            surahName[i].innerText = chapter_list[index].name;
        }
        surahTs.innerText = "( "+chapter_list[index].transliteration+" )";
        surahTsM.innerText = "( "+chapter_list[index].translation+" )";
        surahNo.innerText = "Surah"+' '+count;
        surahVerse.innerHTML = "Verses &nbsp;&nbsp;"+chapter_list[index].total_verses;

        surahType.innerText = chapter_list[index].type;


        var Id = chapter_list[index].id;
        var limit = chapter_list[index].total_verses;

        updateApiUrl = chapter_list[index].link;
        checkSurah = chapter_list[index].name;
        getApi(updateApiUrl, chapter_list[index].name);
        getAudioApi(Id, limit);
        /*
let isAvailable = ((save_data[updateApiUrl]) !== undefined)
isAvailable ?  show(save_data[updateApiUrl]) : getApi(updateApiUrl);
        getAudioApi(Id, limit);

        */
        /// Api end ///

    }
    var Button = document.querySelector('.modal-foot a');
    Button.onclick = function() {
        var audio = document.querySelector('.modal-foot #Mainplayer');

        audio.classList.toggle('active');


    }

    var closeBtn = document.querySelector('.close');

    closeBtn.onclick = collapseModal;

    function collapseModal() {
        modal.className = "modal";
        var audio = document.querySelector('#Mainplayer')

        audio.pause();

    }

});