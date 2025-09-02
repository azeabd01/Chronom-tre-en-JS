let timer;
let seconds = 0, minutes = 0, hours = 0; // stocke le temp actuel du chrono
let running = false; // Le chrono encoure d'execution 
let startTime = 0;
let history = []; //liste des temp pause

function formTime(h, m, s) {
    return (h < 10 ? "0" : "") + h + ":" +
        (m < 10 ? "0" : "") + m + ":" +
        (s < 10 ? "0" : "") + s;
}

function updateChrono() {
    seconds++;
    if (seconds == 60) { seconds = 0; minutes++; }
    if (minutes == 60) { minutes = 0; hours++; }
    document.getElementById("chrono").innerText = formTime(hours, minutes, seconds);
}

function startTimer() {
    if (!running) {
        startTime = hours * 3600 + minutes * 60 + seconds;
        timer = setInterval(updateChrono, 1000);
        running = true;
        document.querySelector(".start").textContent = "Reprendre";
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(timer);
        running = false;
        var stopTime = hours * 3600 + minutes * 60 + seconds;
        var diff = stopTime - startTime;
        var diffHours = Math.floor(diff / 3600);
        var diffMinutes = Math.floor((diff % 3600) / 60);
        var diffSeconds = diff % 60;
        var timeDiff = formTime(diffHours, diffMinutes, diffSeconds);
        history.push(timeDiff);
        var historyList = document.getElementById("history");
        var listItem = document.createElement("li");
        listItem.textContent = timeDiff;
        historyList.appendChild(listItem);
    }
}

function resetTimer() {
    clearInterval(timer);
    running = false;
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById("chrono").innerText = "00:00:00";
    history = [];
    document.getElementById("history").innerHTML = "";
    document.querySelector(".start").textContent = "Play"; 
}