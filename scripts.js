function setHour(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function Hour() {
    addNav();
    let today = new Date();
    let time = setHour(today.getHours()) + ":" + setHour(today.getMinutes()) + ":" + setHour(today.getSeconds());
    let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let day = today.getDate();
    document.getElementById('hours').innerHTML = time;
    document.getElementById('day').innerHTML = weekday[today.getDay()] + " , " + months[today.getMonth()] + " " + day;


}


Hour();


function Navfunction(x) {
    x.classList.toggle("change");

}

function addNav() {

    const html = `
        <a href = "#" onclick="Hour()">Clock</a> <br>
        <a href = "#" onclick="View.content()">Timer</a> <br>
        <a href = "#" onclick="ViewStopWatch.content()">Stopwatch</a>
        

    `

    document.getElementById('menu').innerHTML = html;

}

const View = {

    content() {

        const show = `
        <div id="time">
            
        <input type="text" value="00" id="minutes" maxlength="2">
        <span>:</span>
        <input type="text" value="00" id="seconds" maxlength="2">            
        
        </div>
    
       
       `
        const settings = `
            <div id="buttons">
                <input type="button" value="Start" id="button-start" onclick="View.init()">
                <input type="button" value="Reset" id="button-reset" onclick="View.Refresh()">
                
            </div>
       `

        document.getElementById('hours').innerHTML = show + settings;
        document.getElementById('day').innerHTML = "";
        View.Refresh() 
    },

    timeToMinutes: time => Math.floor(time / 60),
    timeToSeconds: time => time % 60,
    formatTime: time => String(time).padStart(2, '0'),

    currentTime: 0,

    init() {
        let minutes = parseInt(document.getElementById('minutes').value)
        let seconds = parseInt(document.getElementById('seconds').value)
        minutes = minutes * 60
        View.currentTime = minutes + seconds
        if (minutes > 0 || seconds > 0) {
            View.interval = setInterval(View.CountDown, 1000);
            let start = document.getElementById("button-start");
            start.value = "Pause";
            start.removeAttribute("onclick");
            start.setAttribute("onclick", "View.Pause()")

        }
    },

    CountDown() {

        View.currentTime = View.currentTime - 1

        const minutes = View.formatTime(View.timeToMinutes(View.currentTime));
        const seconds = View.formatTime(View.timeToSeconds(View.currentTime));
        if (View.currentTime === 0 || View.currentTime < 0) {
            View.Pause();

            return
        }
        document.getElementById('minutes').value = minutes;
        document.getElementById('seconds').value = seconds;



    },

    Pause() {
        clearInterval(View.interval);
        let start = document.getElementById("button-start")
        start.value = "Start";
        start.removeAttribute("onclick");
        start.setAttribute("onclick", "View.init()");
        
        return;
    },

    Refresh() {
        document.getElementById('minutes').value = "00";
        document.getElementById('seconds').value = "00";
        View.init();
    }

}

const ViewStopWatch = {
    content() {

        const show = `
        <div id="time">
            
        <input type="text" value="00" id="minutes" maxlength="2">
        <span>:</span>
        <input type="text" value="00" id="seconds" maxlength="2">            
        
        </div>
    
       
       `
        const settings = `
            <div id="buttons">
                <input type="button" value="Start" id="button-start" onclick="ViewStopWatch.init()">
                <input type="button" value="Reset" id="button-reset" onclick="ViewStopWatch.Refresh()">
                
            </div>
       `

        document.getElementById('hours').innerHTML = show + settings;
        document.getElementById('day').innerHTML = "";
        ViewStopWatch.Refresh()
    },
    timeToMinutes: time => Math.floor(time / 60),
    timeToSeconds: time => time % 60,
    formatTime: time => String(time).padStart(2, '0'),

    currentTime: 0,

    init() {
        
        ViewStopWatch.interval = setInterval(ViewStopWatch.CountDown, 1000);
        let start = document.getElementById("button-start");
        start.value = "Pause";
        start.removeAttribute("onclick");
        start.setAttribute("onclick", "ViewStopWatch.Pause()")
    },

    CountDown() {

        ViewStopWatch.currentTime = ViewStopWatch.currentTime + 1

        const minutes = ViewStopWatch.formatTime(ViewStopWatch.timeToMinutes(ViewStopWatch.currentTime));
        const seconds = ViewStopWatch.formatTime(ViewStopWatch.timeToSeconds(ViewStopWatch.currentTime));
        
        document.getElementById('minutes').value = minutes;
        document.getElementById('seconds').value = seconds;

    },

    Pause() {
        clearInterval(ViewStopWatch.interval);
        let start = document.getElementById("button-start");
        start.value = "Start";
        start.removeAttribute("onclick");
        start.setAttribute("onclick", "ViewStopWatch.init()");       
    },

    Refresh() {
        document.getElementById('minutes').value = "00";
        document.getElementById('seconds').value = "00";
        ViewStopWatch.currentTime = 0
        ViewStopWatch.Pause()
        
    }

}