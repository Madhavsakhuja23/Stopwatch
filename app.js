// app.js
let min = 0;
let sec = 0;
let timerId = null;
let isRunning = false;

function defaultval() {
    document.getElementById("im").innerHTML = "00";
    document.getElementById("is").innerHTML = "00";
    document.querySelector(".custom-inputs").style.display = "none";
}

function timmer() {
    if (min === 0 && sec === 0) {
        clearTimeout(timerId);
        timerId = null;
        isRunning = false;
        document.getElementById("start").innerHTML = '<i class="fas fa-play"></i> Start';
        // Play alarm sound when timer completes
        playAlarm();
        return;
    }
    
    if (sec === 0) {
        if (min > 0) {
            min--;
            sec = 59;
        }
    } else {
        sec--;
    }
    
    updateDisplay();
    
    if (!isRunning) {
        isRunning = true;
        document.getElementById("start").innerHTML = '<i class="fas fa-running"></i> Running';
    }
    
    document.getElementById("pause").style.display = "inline-flex";
    document.getElementById("rst").style.display = "inline-flex";
    timerId = setTimeout(timmer, 1000);
}

function pause() {
    clearTimeout(timerId);
    timerId = null;
    isRunning = false;
    updateDisplay();
    document.getElementById("start").innerHTML = '<i class="fas fa-play"></i> Start';
}

function reset() {
    clearTimeout(timerId);
    timerId = null;
    isRunning = false;
    min = 0;
    sec = 0;
    updateDisplay();
    document.getElementById("start").innerHTML = '<i class="fas fa-play"></i> Start';
    document.getElementById("start").style.display = "inline-flex";
    document.getElementById("pause").style.display = "none";
    document.getElementById("rst").style.display = "none";
    document.getElementById("min").value = "00";
    document.getElementById("sec").value = "00";
}

function changecolor() {
    const selectcolor = document.getElementById("clr").value;
    document.documentElement.style.setProperty('--primary-color', selectcolor);
}

function minchange() {
    min = parseInt(document.getElementById("min").value);
    updateDisplay();
}

function secchange() {
    sec = parseInt(document.getElementById("sec").value);
    updateDisplay();
}

function add() {
    const customInputs = document.querySelector(".custom-inputs");
    if (customInputs.style.display === "flex") {
        customInputs.style.display = "none";
    } else {
        customInputs.style.display = "flex";
    }
}

function set() {
    const inputMin = parseInt(document.getElementById("adm").value) || 0;
    const inputSec = parseInt(document.getElementById("ads").value) || 0;
    
    min = inputMin;
    sec = inputSec;
    
    if (sec >= 60) {
        min += Math.floor(sec / 60);
        sec = sec % 60;
    }
    
    updateDisplay();
    document.querySelector(".custom-inputs").style.display = "none";
    document.getElementById("adm").value = "";
    document.getElementById("ads").value = "";
}

function updateDisplay() {
    document.getElementById("im").innerHTML = min < 10 ? '0' + min : min;
    document.getElementById("is").innerHTML = sec < 10 ? '0' + sec : sec;
}

function playAlarm() {
    // Create an audio context
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = "sine";
    oscillator.frequency.value = 880;
    gainNode.gain.value = 0.5;
    
    oscillator.start();
    
    // Create a pulsating effect
    let time = audioContext.currentTime;
    gainNode.gain.setValueAtTime(0.5, time);
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.5);
    
    // Stop after 1 second
    setTimeout(() => {
        oscillator.stop();
    }, 1000);
}
