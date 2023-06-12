let d = document;
let b = d.body;
// const editor = document.getElementById('editor');
// const config = document.getElementById('config');
const editors = document.querySelectorAll('.editor');
const configs = document.querySelectorAll('.config');

//  init interval
// let interval = [];
// init loop
let loops = []; 
// bool if started or not 
// let started = false;


// launch ini fuction
init();

async function init(){
  return new Promise((resolve) => {
    document.body.addEventListener('keydown', handleKeyDown);
    // for (let editor of editors){
    //   editor.addEventListener('keydown', handleKeyDownEditor);
    // }
    // for (let config of configs){
    //   config.addEventListener('keydown', handleKeyDownConfig);
    // }
    console.log('Welcome to simple');
    resolve('init-done');
  })
}

function handleKeyDown(e){
  let target = e.target;
  let targetParentId = target.parentNode.id; 
  let thisLoop = searchKeyVal(loops, 'id', targetParentId);
  if (e.ctrlKey && e.key == 's') { 
    console.log("Save Editor Keypressed");
    e.preventDefault();
    if(thisLoop){
      if (thisLoop.started) {
        saveEditor(targetParentId);
      }
    }
  }
  // CTRL+R = start / stop
  else if (e.ctrlKey && e.key == 'r') { 
    e.preventDefault();
    // if thisLoop exist 
    if(thisLoop){
      console.log("Loop exist --> Start / Stop", thisLoop.started);
      if (thisLoop.started) {
        stop(targetParentId);      
      }else{
        start(targetParentId);
      }
    }
    // else, there no Loop for the moment, so start it 
    else{
      console.log("Start / Stop", "started: false");
      createLoop(targetParentId);
      start(targetParentId);
    }
    
  }
}

function getDataFromEditors(editorId){
  // get editors 
  let targetEditor = document.querySelector("#" + editorId + " .editor");
  let targetConfig = document.querySelector("#" + editorId + " .config");
  // get data from the config editor
  let config = parseEditor(targetConfig)
  // get words from the main editor
  let words = parseEditor(targetEditor);

  // interval (tempo) = config[0] 
  // gain (volume) = config[1] 
  console.log("interval", config[0]);
  console.log("gain", config[1]);
  
  let data = {
    id: editorId,
    words: words, 
    interval : config[0], 
    gain : config[1]
  }

  return data; 
}

function createLoop(editorId){
  let data =  getDataFromEditors(editorId);
  loops.push({
    id: data.id,
    loop: new myLoop(0, data.words, data.interval, data.gain), 
    started : true
  });
}

function start(editorId){
  console.log("Start Function");
  // add class if the col has started
  let col = document.getElementById(editorId);
  col.classList.add("started");

  let thisLoop = searchKeyVal(loops, 'id', editorId);
  thisLoop.started = true;
  thisLoop.loop.start();
}

function stop(editorId){
  // remove started class when col is stopped
  let col = document.getElementById(editorId);
  col.classList.remove("started");

  let thisLoop = searchKeyVal(loops, 'id', editorId);
  thisLoop.started = false;
  thisLoop.loop.stop();
}

function saveEditor(editorId){
  console.log("Save Editor Function", editorId);
  let thisLoop = searchKeyVal(loops, 'id', editorId);
  // let targetEditor = document.querySelector("#" + editorId + " .editor");
  thisLoop.loop.update(editorId);
}

function parseEditor(editorToParse){
  console.log("Parse Editor Function")
  let textToParse = editorToParse.value;
  textToParse = textToParse.replaceAll(',','');
  textToParse = textToParse.replaceAll(';','');
  textToParse = textToParse.replaceAll('\n',' ');
  // remove "." only on the main editor not on the config editor
  if(editorToParse.classList.contains('editor')){
    textToParse = textToParse.replaceAll('.','');
  }
  const words = textToParse.split(" ");
  console.log(words);
  return words;
}


function myLoop(i, el, tempo, gain) {         //  create a loop function
  let timeout;
  let that = this;
  this.interval = tempo;
  this.gain = gain; 
  this.i = i; 
  this.el = el; 
  this.start = function() {
    timeout = setTimeout(step, this.interval);
    console.log("start", timeout);
  }
  this.update = function(editorId){
    let targetEditor = document.querySelector("#" + editorId + " .editor");
    let targetConfig = document.querySelector("#" + editorId + " .config");
    // get interval from the config editor
    this.interval = parseEditor(targetConfig)[0];
    // get gain from the config editor
    this.gain = parseEditor(targetConfig)[1];
    // get words from the main editor
    this.el = parseEditor(targetEditor);
    console.log(this.interval, this.gain);
    // get words from the main editor
    // let words = parseEditor(editor);
    // this.el = words; 
    // // update the interval 
    // this.interval = interval[0];
    timeout = setTimeout(step, this.interval);
  }
  this.stop = function() {
    that.i = 0;
    clearTimeout(timeout);
    console.log("stop");
  }
  function step(){
    console.log("step", that.i, that.interval, that.el[that.i]);
    
    // get random default sample for the word that doesn't exist in the dictionnary
    randomDefaultSample = getRandomInt(0, defaultSamples.length);
    samples['default'] = "default/" + defaultSamples[randomDefaultSample];
    
    if(samples[that.el[that.i]] != undefined){
      playSample(samples[that.el[that.i]], that.gain);
    }
    else{
      playSample(samples['default'], that.gain);  
    }

    that.i++;                    //  increment the counter
    if (that.i < that.el.length) {           //  if the counter < 10, call the loop function
      timeout = setTimeout(step, that.interval);             //  ..  again which will trigger another 
    }                       //  ..  setTimeout()
    else{
      that.i = 0;
      clearTimeout(timeout);
      timeout = setTimeout(step, that.interval); 
    }
  }
}

function playSample(sample, gain){
    const URL = 'samples/'+ sample;
    console.log('path: ' + URL, 'gain: ' + gain);
    let audio = new Audio(URL);
    audio.volume = gain;
    // audio.cloneNode(true).play();
    audio.play();
}


function searchKeyVal(obj, keyName, valName=undefined) {
  for (prop in obj) {
    if (typeof obj[prop] == "object") {
      let objectFound
      if (valName !== undefined) { // searchKey mode
         objectFound = searchKeyVal(obj[prop], keyName, valName);
      }else{
         objectFound = searchKeyVal(obj[prop], keyName);
      }
      if (objectFound !== undefined) return objectFound
    }else{
      if (valName !== undefined) { // searchKey mode
        if (prop == keyName && obj[prop] == valName) {
          return obj
        }
      }else{
        if (prop == keyName) {
          return obj
        }
      }
    }
  }
}




