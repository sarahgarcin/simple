let d = document;
let b = d.body;
let nbOfCol = settings.numberOfColumns; 

// init loops
let loops = []; 



// launch ini fuction
init();

async function init(){
  return new Promise((resolve) => {
    
    // init columns (depending on the number define in settings.js) 
    for(let i=1; i<=nbOfCol; i++){
      let colId = "col-" + i;
      addColumn(colId);
    }

    document.body.addEventListener('keydown', handleKeyDown);

    // On click + button, add column
    const button = document.getElementById('add-col-btn');
    button.addEventListener('click', event => {
      nbOfCol +=1; 
      let newColId = "col-" + nbOfCol;
      console.log(nbOfCol, newColId);
      addColumn(newColId);
    });

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

function addColumn(editorId){
  let wrapper = document.querySelector('.col-wrapper');
  let col = document.createElement('div');
  col.classList.add('col');
  col.setAttribute('id', editorId);
  let config = document.createElement('textarea');
  config.setAttribute('spellcheck', 'false');
  config.classList.add('config');
  config.innerHTML = settings.tempoBase + " " + settings.gainBase;
  let editor = document.createElement('textarea');
  editor.setAttribute('spellcheck', 'false');
  editor.classList.add('editor');
  col.appendChild(config);
  col.appendChild(editor);
  wrapper.appendChild(col);
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
    loop: new myLoop(0, data.words, data.interval, data.gain, data.id), 
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
  // textToParse = textToParse.replaceAll(',','');
  // textToParse = textToParse.replaceAll(';','');
  textToParse = textToParse.replaceAll('\n',' ');
  // remove "." only on the main editor not on the config editor
  // if(editorToParse.classList.contains('editor')){
  //   textToParse = textToParse.replaceAll('.','');
  // }
  const words = textToParse.split(" ");
  console.log(words);
  return words;
}


function myLoop(i, el, tempo, gain, id) {         //  create a loop function
  let timeout;
  let that = this;
  this.interval = tempo;
  this.gain = gain; 
  this.i = i; 
  this.el = el; 
  this.id = id;
  this.playback = 1;
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
    console.log("step", that.i, that.interval, that.el[that.i], that.gain);
    let targetConfig = document.querySelector("#" + that.id + " .config");
    let thisinterval = that.interval;
    let thisgain = that.gain;

    // get all punctuations from settings.json
    const playbackPunctuations = settings.punctuations.filter((punctuation) => punctuation.type === "playback");
    const intervalPunctuations = settings.punctuations.filter((punctuation) => punctuation.type === "interval");
    const gainPunctuations = settings.punctuations.filter((punctuation) => punctuation.type === "gain");
    
    // get random default sample for the word that doesn't exist in the dictionnary
    randomDefaultSample = getRandomInt(0, defaultSamples.length);
    samples['default'] = "default/" + defaultSamples[randomDefaultSample];

    if(samples[that.el[that.i]] != undefined){
      playSample(samples[that.el[that.i]], that.gain, that.playback);
      // reset the normal values for others
      that.interval = thisinterval;
      that.gain = thisgain;
      that.playback = 1;
    }
    else {
      const punctuationCharacters = settings.punctuations.map((punctuationObj) => punctuationObj.punctuation);
      const currentPunctuation = that.el[that.i];
      if (punctuationCharacters.includes(currentPunctuation)) {
        // found playback punctuations
        const foundPlaybackPunctuation = playbackPunctuations.find((puncObj) => puncObj.punctuation === currentPunctuation);
        // found interval punctuations
        const foundIntervalPunctuation = intervalPunctuations.find((puncObj) => puncObj.punctuation === currentPunctuation);
        // found gain punctuations
        const foundGainPunctuation = intervalPunctuations.find((puncObj) => puncObj.punctuation === currentPunctuation);
        if (foundPlaybackPunctuation) {
          that.playback = foundPlaybackPunctuation.value;
        }
        if (foundIntervalPunctuation) {
          that.interval = eval(parseEditor(targetConfig)[0] + foundIntervalPunctuation.value);
        }
        if (foundGainPunctuation) {
          that.gain = eval(parseEditor(targetConfig)[1] +foundGainPunctuation.value);
        }
      }
      else{
        playSample(samples['default'], that.gain, that.playback); 
        // reset the normal values for others
        that.interval = thisinterval;
        that.gain = thisgain;
        that.playback = 1;
      }
    }

    // // add options with punctuation -> options are apply to the word after
    // // if '.' change pitch playback divide by 2 --> audio.playbackRate
    // else if(that.el[that.i] == '.'){
    //   that.playback = 0.5;
    // }
    // // if ':' change pitch playback to 0.3 --> audio.playbackRate
    // else if(that.el[that.i] == ':'){
    //   that.playback = 0.3;
    // }
    // // if '+' change pitch playback to 2
    // else if(that.el[that.i] == '+'){
    //   that.playback = 2;
    // }
    // // if '!' change pitch playback to 3
    // else if(that.el[that.i] == '!'){
    //   that.playback = 3;
    // }
    // // if '-' change interval divide by 2
    // else if(that.el[that.i] == '-'){
    //   that.interval = parseEditor(targetConfig)[0] / 2;
    // }
    // // if '—' change interval divide by 4
    // else if(that.el[that.i] == '—'){
    //   that.interval = parseEditor(targetConfig)[0] / 4;
    // }
    // // if '/' change the gain divide by 2
    // else if(that.el[that.i] == '/'){
    //   that.gain = parseEditor(targetConfig)[1] / 2;
    // }
    // // if '*' change the gain mutiply by 2
    // else if(that.el[that.i] == '*'){
    //   if(that.gain * 2 < 1){
    //     that.gain = parseEditor(targetConfig)[1] * 2;
    //   }
    //   else{
    //     that.gain = 100;
    //   }    
    // }
    // else{
    //   playSample(samples['default'], that.gain, that.playback); 
    //   // reset the normal values for others
    //   that.interval = thisinterval;
    //   that.gain = thisgain;
    //   that.playback = 1;
    // }

    that.i++; //  increment the counter
    if (that.i < that.el.length) { //  if the counter < 10, call the loop function
      timeout = setTimeout(step, that.interval); //  ..  again which will trigger another 
    }  //  ..  setTimeout()
    else{
      that.i = 0;
      clearTimeout(timeout);
      timeout = setTimeout(step, that.interval); 
    }
  }
}

function playSample(sample, gain, playback){
  let detectFile = sample.split('.')[1];
  let URL;
  // detect if the file to play is an mp3 or a blob: (from live recording)
  if(detectFile == "mp3" || detectFile == "ogg"){
    URL = 'samples/'+ sample;
  }
  else{
    URL = sample;
  }
  console.log('path: ' + URL, 'gain: ' + gain, 'playbak: ' + playback);
  let audio = new Audio(URL);
  // write the gain from 0 to 100 and divide it by 100 to remap it from 0 to 1
  audio.volume = parseInt(gain) / 100;
  audio.playbackRate = playback;
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




