var recorder, gumStream;
const newWordField = document.getElementById("new-word");
var recordButton = document.getElementById("recordButton");
const addedWords = document.getElementById("words-added");
recordButton.addEventListener("click", toggleRecording);

function toggleRecording() {
    if (recorder && recorder.state == "recording") {
        recorder.stop();
        gumStream.getAudioTracks()[0].stop();
    } else {
        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(function(stream) {
            gumStream = stream;
            recorder = new MediaRecorder(stream);
            recorder.ondataavailable = function(e) {
                var url = URL.createObjectURL(e.data);
                var preview = document.createElement('audio');
                preview.controls = true;
                preview.src = url;
                // document.body.appendChild(preview);
                // get new word and add the sound to samples
                let newWord = newWordField.value;
                let wordLi = document.createElement('li');
                wordLi.innerHTML = newWord;
                addedWords.appendChild(wordLi);
                samples[newWord] = url;
                recordButton.innerHTML = "●";
            };
            recorder.start();
            recordButton.innerHTML = "■";
        });
    }
}