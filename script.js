// some buttons and stuff
let startBtn = document.querySelector('#start-pause');
let lapBtn = document.querySelector('#lap');
let resetBtn = document.querySelector('#reset');
let lapList = document.querySelector('#lap-list');

let h = document.querySelector('#time-hours');
let m = document.querySelector('#time-mins');
let s = document.querySelector('#time-secs');
let ms = document.querySelector('#time-millis');

let muteC = document.querySelector('#mute-toggle');
let tickC = document.querySelector('#tick-toggle');
let vol = document.querySelector('#volume');

let running = false;
let startTime = 0;
let accTime = 0;
let lapsArr = [];
let lastLapTime = 0;
let anim;

let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let volVal = 0.3;
let mute = false;
let tickOn = true;
let lastSecond = -1;

function beep(freq=880, duration=50, gain=0.2){
    if(mute) return;
    let o = audioCtx.createOscillator();
    let g = audioCtx.createGain();
    o.frequency.value = freq;
    g.gain.value = gain*volVal;
    o.connect(g);
    g.connect(audioCtx.destination);
    o.start();
    o.stop(audioCtx.currentTime + duration/1000);
}

function pad(n, l=2){
    n = n + '';
    while(n.length < l) n = '0'+n;
    return n;
}

function getTime(ms){
    ms = Math.floor(ms);
    let hh = Math.floor(ms/3600000);
    let mm = Math.floor((ms%3600000)/60000);
    let ss = Math.floor((ms%60000)/1000);
    let mss = ms%1000;
    return {hh, mm, ss, mss};
}

function showTime(ms){
    let t = getTime(ms);
    h.textContent = pad(t.hh);
    m.textContent = pad(t.mm);
    s.textContent = pad(t.ss);
    ms.textContent = pad(t.mss,3);
}

function now(){
    return performance.now();
}

function totalTime(){
    if(running) return accTime + (now() - startTime);
    return accTime;
}

function tick(){
    let t = totalTime();
    showTime(t);
    if(tickOn && !mute){
        let sec = Math.floor(t/1000);
        if(sec != lastSecond){
            lastSecond = sec;
            beep(880,30,0.15);
        }
    }
    anim = requestAnimationFrame(tick);
}

function start(){
    if(running) return;
    running = true;
    startTime = now();
    lastSecond = Math.floor(accTime/1000)-1;
    startBtn.textContent = 'Pause';
    lapBtn.disabled = false;
    resetBtn.disabled = false;
    tick();
    beep(1200,50,0.2);
}

function pause(){
    if(!running) return;
    running = false;
    accTime += now() - startTime;
    startBtn.textContent = 'Start';
    cancelAnimationFrame(anim);
    showTime(accTime);
    beep(500,50,0.2);
}

function reset(){
    running = false;
    accTime = 0;
    startTime = 0;
    lapsArr = [];
    lastLapTime = 0;
    lapList.innerHTML = '';
    cancelAnimationFrame(anim);
    showTime(0);
    startBtn.textContent = 'Start';
    lapBtn.disabled = true;
    resetBtn.disabled = true;
    beep(300,60,0.2);
}

function addLap(){
    let t = totalTime();
    let split = t - lastLapTime;
    lastLapTime = t;
    lapsArr.push({t, split});
    let idx = lapsArr.length;
    let total = getTime(t);
    let spt = getTime(split);
    let li = document.createElement('li');
    li.innerHTML = idx + ' | ' + pad(spt.mm)+':'+pad(spt.ss)+'.'+pad(spt.mss,3) + ' | ' + pad(total.hh)+':'+pad(total.mm)+':'+pad(total.ss)+'.'+pad(total.mss,3);
    lapList.prepend(li);
    beep(900,40,0.25);
}

startBtn.addEventListener('click',()=>{ if(!running) start(); else pause(); });
lapBtn.addEventListener('click',()=>{ if(accTime!=0 || running) addLap(); });
resetBtn.addEventListener('click',reset);

document.addEventListener('keydown',(e)=>{
    if(e.code=='Space'){ e.preventDefault(); if(!running) start(); else pause(); }
    else if(e.key.toLowerCase()=='l'){ addLap(); }
    else if(e.key.toLowerCase()=='r'){ reset(); }
    else if(e.key.toLowerCase()=='m'){ muteC.checked = !muteC.checked; mute = muteC.checked; }
});

muteC.addEventListener('change',()=>{ mute = muteC.checked; });
tickC.addEventListener('change',()=>{ tickOn = tickC.checked; });
vol.addEventListener('input',()=>{ volVal = parseFloat(vol.value); });

showTime(0);
