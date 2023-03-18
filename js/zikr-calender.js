// (A) PROPERTIES
// (A1) COMMON CALENDAR
var sMon = false, // Week start on Monday?
mName = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
// Month Names

// (A2) CALENDAR DATA
data = null,
// Events for the selected period
sDay = 0, sMth = 0, sYear = 0, // Current selected day, month, year

// (A3) COMMON HTML ELEMENTS

hMth = null, hYear = null;
// month/year selector

var hForm = null, hfHead = null,
hSave = null,
hfDate = null,
hfTxt = null,
hfDel = null;
var calWrap = null;

//Themes

var Theme = null;

// control
var next = null,
prev = null;
// event form



// (B) INIT CALENDAR


const init = () => {
    // (B1) GET + SET COMMON HTML ELEMENTS
    calWrap = document.getElementById("cal-wrap");

    hMth = document.getElementById("cal-mth");
    hYear = document.getElementById("cal-yr");
    hForm = document.getElementById("cal-event");
    hSave = document.querySelector('#evt-save');
    hfHead = document.getElementById("evt-head");
    hfDate = document.getElementById("evt-date");
    hfTxt = document.getElementById("evt-details");
    hfDel = document.getElementById("evt-del");
    next = document.querySelector('#next');
    prev = document.querySelector('#prev');

    document.getElementById("evt-close").onclick = close;
    hfDel.onclick = del;
    hSave.onclick = save;
    next.onclick = function() {
        Timetravel(sMth + 1);
    }
    prev.onclick = function() {
        Timetravel(sMth - 1);
    }

    Themebtn = document.querySelectorAll('.colors span');

    Themebtn.forEach((e, index) => {
var Bg = window.getComputedStyle(e).backgroundColor;

    if(e.className == "active"){
decorate(index, Bg)
    }
        var n = index;
        e.onclick = function(e) {
var Bg = window.getComputedStyle(this).backgroundColor;
            for (var i = 0; i < Themebtn.length; i++) {
                Themebtn[i].className = "";
            }
            
            Themebtn[n].className = "active";
decorate(n, Bg)
};
    })

function decorate(n, Bg){
            if (n === 1) {
                theme1(Bg);
            } else if (n === Themebtn.length-1) {
                theme2(Bg);

            } else {
                DefaultTheme();
            }
}
    // (B2) DATE NOW
    let now = new Date(),
    nowMth = now.getMonth(),
    nowYear = parseInt(now.getFullYear());

    // (B3) APPEND MONTHS SELECTOR
    for (let i = 0; i < 12; i++) {
        let opt = document.createElement("option");
        opt.value = i;
        opt.innerHTML = mName[i];
        if (i == nowMth) {
            opt.selected = true;
        }
        hMth.appendChild(opt);
    }
    hMth.onchange = list;

    // (B4) APPEND YEARS SELECTOR
    // Set to 10 years range. Change this as you like.//

    for (let i = nowYear-10; i <= nowYear+10; i++) {
        let opt = document.createElement("option");
        opt.value = i;
        opt.innerHTML = i;
        if (i == nowYear) {
            opt.selected = true;
        }

        hYear.appendChild(opt);
    }
    hYear.onchange = list;

    // (B5) START - DRAW CALENDAR
    list();
};








//DRAW CALENDAR FOR SELECTED MONTH


const list = () => {
    // (C1) BASIC CALCULATIONS - DAYS IN MONTH, START + END DAY
    // Note - Jan is 0 & Dec is 11
    // Note - Sun is 0 & Sat is 6

    sMth = parseInt(hMth.value);
    // selected month
    sYear = parseInt(hYear.value);
    // selected year
    let daysInMth = new Date(sYear, sMth+1, 0).getDate(),
    // number of days in selected month
    startDay = new Date(sYear, sMth, 1).getDay(),
    // first day of the month
    endDay = new Date(sYear, sMth, daysInMth).getDay(),
    // last day of the month
    now = new Date(),
    // current date
    nowMth = now.getMonth(),
    // current month
    nowYear = parseInt(now.getFullYear()),
    // current year


    nowDay = sMth == nowMth && sYear == nowYear ? now.getDate(): null;


    console.log(startDay, endDay)

    // LOAD DATA FROM LOCALSTORAGE
    data = localStorage.getItem("cal-" + sMth + "-" + sYear);
    if (data == null) {
        localStorage.setItem("cal-" + sMth + "-" + sYear, "{}");
        data = {};
    } else {
        data = JSON.parse(data);
    }


    // (C3) DRAWING CALCULATIONS
    // Blank squares before start of month//

    let squares = [];

    if ((sMon && startDay) !== -1) {
        let blanks = (startDay == 0) ? 0: startDay+1;

        for (let i = 1; i < blanks; i++) {
            squares.push("b");
        }
    }


    // Days of the month
    for (let i = 1; i <= daysInMth; i++) {
        squares.push(i);
    }

    // Blank squares after end of month
    if (sMon && endDay != 0) {
        let blanks = (endDay == 6) ? 1: 7-endDay;
        for (let i = 0; i < blanks; i++) {
            squares.push("b");
        }
    }
    if (!sMon && endDay != 6) {
        let blanks = (endDay == 0) ? 6: 6-endDay;
        for (let i = 0; i < blanks; i++) {
            squares.push("b");
        }
    }


    // DRAW HTML CALENDAR
    // Get container
    let container = document.getElementById("cal-container"),
    cTable = document.createElement("table");
    cTable.id = "calendar";
    container.innerHTML = "";
    container.appendChild(cTable);

    // First row - Day names
    let cRow = document.createElement("tr"),
    days = ["Su",
        "M",
        "Tu",
        "W",
        "Th",
        "Fr",
        "Sa"];
    if (sMon) {
        days.push(days.shift());
    }
    for (let d of days) {
        let cCell = document.createElement("td");
        cCell.innerHTML = d;
        cRow.appendChild(cCell);
    }
    cRow.classList.add("head");
    cTable.appendChild(cRow);

    // Days in Month
    let total = squares.length;
    cRow = document.createElement("tr");
    cRow.classList.add("day");
    for (let i = 0; i < total; i++) {
        let cCell = document.createElement("td");
        if (squares[i] == "b") {
            cCell.classList.add("blank");
            cCell.innerHTML = `<div class="db">${squares[i]}</div>`;
        } else {
            if (nowDay == squares[i]) {
                cCell.classList.add("today");

            }
            cCell.innerHTML = `<div class="dd">${squares[i]}</div>`;
            if (data[squares[i]]) {
                cCell.classList.add('active');
                cCell.innerHTML += "<div class='evt'>" + data[squares[i]] + "</div>";
            }
            cCell.onclick = () => {
                show(cCell);
            };
        }
        cRow.appendChild(cCell);
        if (i != 0 && (i+1)%7 == 0) {
            cTable.appendChild(cRow);
            cRow = document.createElement("tr");
            cRow.classList.add("day");
        }
    }

    // (C5) REMOVE ANY PREVIOUS ADD/EDIT EVENT DOCKET
    close();
}

// SHOW EDIT EVENT DOCKET FOR SELECTED DAY

const show = (el) => {
    // (D1) FETCH EXISTING DATA
    sDay = el.getElementsByClassName("dd")[0].innerHTML;
    let isEdit = ((data[sDay]) !== undefined) && ((data[sDay]) !== "");

    // (D2) UPDATE EVENT FORM
    hfTxt.value = isEdit ? data[sDay]: "";
    hfHead.innerHTML = isEdit ? "EDIT EVENT": "ADD EVENT";
    (hfDate.innerHTML) = `${sDay} ${mName[sMth]} ${sYear}`;
    if (isEdit) {
        hfDel.classList.add("ninja");

    } else {
        hfDel.classList.remove("ninja");
    }

    hForm.classList.remove("ninja");
};

// control

const Timetravel = (n)=> {
    var indexMth = hMth.querySelectorAll('option');
    var indexYr = hYear.querySelectorAll('option');
    console.log(n)
    y = parseInt(Number(hYear.selectedIndex));

    if (n === indexMth.length) {
        n = 0;

        indexMth[n].selected = true;

        indexYr[y + 1].selected = true;

    } else if (n === -1) {

        n = indexMth.length-1;
        indexMth[n].selected = true;
        indexYr[y - 1].selected = true;

    } else {
        indexMth[n].selected = true;
    }
    list();
};
// SAVE EVENT
const save = () => {
    hfTxt.focus();
    data[sDay] = hfTxt.value;

    localStorage.setItem(`cal-${sMth}-${sYear}`, JSON.stringify(data));
    list();
    return false;
};


// (G) DELETE EVENT FOR SELECTED DATE

const del = () => {
    if (confirm("Delete event?")) {
        delete data[sDay];
        localStorage.setItem(`cal-${sMth}-${sYear}`, JSON.stringify(data));
        list();
        hfTxt.value = "";
    }
}


// (E) CLOSE EVENT DOCKET
const close = () => {
    hForm.classList.add("ninja");
};



// Theme templates


function theme1(B) {
    var r = document.querySelector(':root');
    r.style.setProperty('--cal-white', '#444');
    r.style.setProperty('--cal-black', 'white');

    r.style.setProperty('--cal-bg', "#002");

    r.style.setProperty('--cal-lightgrey', '#111');

    r.style.setProperty('--cal-transparentwhite', 'rgba(20, 20, 20, .7)');
    r.style.setProperty('--cal-transparentblack', 'rgba(255,255,255,.6)');

    r.style.setProperty('--cal-event', 'white');
    r.style.setProperty('--cal-ninja', '');

}

function theme2(R) {
    var r = document.querySelector(':root');



    r.style.setProperty('--cal-white', '#100');
    r.style.setProperty('--cal-black', 'white');

    r.style.setProperty('--cal-bg', R);

    r.style.setProperty('--cal-lightgrey', '#f00');

    r.style.setProperty('--cal-transparentwhite', 'rgba(20,0,0,.7)');
    r.style.setProperty('--cal-transparentblack', '');


    r.style.setProperty('--cal-event', '#090');
    r.style.setProperty('--cal-ninja', '#123456');
}


function DefaultTheme() {
    var r = document.querySelector(':root');
    r.style.setProperty('--cal-white', '');
    r.style.setProperty('--cal-black', '');

    r.style.setProperty('--cal-bg', '');
    r.style.setProperty('--cal-lightblack', '');
    r.style.setProperty('--cal-lightgrey', '');
    r.style.setProperty('--cal-transparentwhite', '');
    r.style.setProperty('--cal-transparentblack', '');

    r.style.setProperty('--cal-event', '');
    r.style.setProperty('--cal-ninja', '');

}





window.addEventListener("DOMContentLoaded", function() {
    init();

});
