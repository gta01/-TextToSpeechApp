let textarea = document.querySelector("textarea");
voiceSelect = document.querySelector("select");
speechButton = document.querySelector("button");

let spsyn = speechSynthesis;
isSpeaking = true;

voices();

// Function voice 
function voices() {
    for(let voice of spsyn.getVoices()) {
        // select default language Google US English
        let selectDefault = voice.name === "Google US English" ? "selected" : "";

        // prints voice in console
        // console.log(voice); 
        
        // creating option tag by passing voice name & lang
        let option = `<option value="${voice.name}" ${selectDefault}>${voice.name} (${voice.lang}) </option>`;
        // inserting option tag bfore end of select tag
        voiceSelect.insertAdjacentHTML("beforeend", option); 
    }
}

spsyn.addEventListener("voiceschanged",voices);

// Function Text To Speech
function textToSpeech(text) { 
    let utter = new SpeechSynthesisUtterance(text);
    for(let voice of spsyn.getVoices()) {
        // if available device voice == user selected voice  
        // set speech voice to user selected voice
        if(voice.name === voiceSelect.value){
            utter.voice = voice;
        }
    }    
    spsyn.speak(utter); // speak the speech
}

speechButton.addEventListener("click", bt => {
    bt.preventDefault();
    if(textarea.value !== "") {
        // if speech/utterance is not currently in speaking 
        if(!spsyn.speaking) {
            textToSpeech(textarea.value);
        }        
        if(textarea.value.length > 50) {
            setInterval(()=>{
                if(!spsyn.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechButton.innerText = "Convert To Speech";
                }else{
                }
            }, 500);
            if(isSpeaking) {
                spsyn.resume();
                isSpeaking = false;
                speechButton.innerText = "Pause Speech";
            }
            else{
                spsyn.pause();
                isSpeaking = true;
                speechButton.innerText = "Resume Speech";
            }
        }
        else {
            speechButton.innerText = "Convert To Speech";
        }
    }
});





