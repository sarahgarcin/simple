// DefaultSamples is a list of samples to use when a word doesn't exits
let defaultSamples = ['drum_1.mp3', 'drum_2.mp3', 'drum_3.mp3', 'drum_4.mp3', 'drum_5.mp3', 'drum_6.mp3', 'drum_7.mp3', 'drum_8.mp3', 'drum_9.mp3', 'drum_10.mp3', 'drum_11.mp3', 'drum_12.mp3'];
// It will play a random default sample among the list
let randomDefaultSample = getRandomInt(0, defaultSamples.length);


// samples is the dictionnary
// Associate a word to a sample here 
let samples = {
  "default": "default/" + defaultSamples[randomDefaultSample], 
  // ------------ french ------------ 
  // stop words 
  "de" : "drum-4/drum_14.mp3",
  "du": "drum-4/drum_6.mp3",
  "en": "drum-4/drum_3.mp3",
  "et" : "drum-4/drum_12.mp3",
  "pas" : "drum-4/drum_9.mp3",
  "sur" : "drum-4/drum_11.mp3",
  "un" : "drum-4/drum_15.mp3",

  // nouns
  "alcool" : "animals/oiseau-sifflement.mp3",
  "bisous" : "drum-4/drum_7.mp3",
  "bonjour" : "voices/bording-complete.mp3",
  "chelou": "drum-4/drum_4.mp3",
  "contrôle": "voices/securite.mp3",
  "direct": "music/dont-touch-me-tomato.mp3",
  "éditeur": "drum-4/drum_2.mp3",
  "ligne" : "drum-4/drum_13.mp3",
  "matin" : "animals/poule.mp3",
  "merci" : "voices/poules-deau.mp3",
  "psg"   : "animals/oiseau-weird.mp3",
  "radio" : "animals/canard.mp3",
  "texte" : "drum-4/drum_10.mp3",
  "youpi" : "music/personal-jesus.mp3",

  // pronoms
  "je": "noise/radio.mp3",
  "tu" : "noise/vibrations.mp3",
  "il": "drum-4/drum_9.mp3",
  "elle": "sons-ordi/nokia.mp3",
  "iel" : "sons-ordi/messenger.mp3",
  "on" : "sons-ordi/osx-copier.mp3",
  "nous": "sons-ordi/osx-erreur.mp3",
  "vous": "sons-ordi/osx-notif.mp3",
  "ils": "voices/moi-pointe.mp3",
  "elles": "voices/mf-88.mp3",
  "ielles": "voices/somatisera.mp3",


  // verbs
  "basé": "drum-4/drum_5.mp3",
  "boire": "animals/oiseau-roulant.mp3",
  "est" : "drum-4/drum_1.mp3",
  "sommes" : "music/patriarcat.mp3",
  "terminé" : "drum-4/drum_15.mp3",

  // adverbs
  "encore" : "drum-4/drum_1.mp3",

  // interjections
  "euh" : "voices/euh.mp3",

  // ------------ english ------------
  "hello" : "over_0.mp3", 
  "world" : "over_1.mp3", 
  "simple": "over_2.mp3",
  "this" : "over_3.mp3", 
  "is" : "over_4.mp3", 
  "it": "over_5.mp3",
  "a" : "over_6.mp3", 
  "live" : "over_7.mp3", 
  "coding": "over_8.mp3",
  "editor" : "over_9.mp3", 
  "based" : "over_10.mp3", 
  "on": "over_11.mp3",
  "text" : "over_12.mp3", 
  "weird" : "over_13.mp3", 
  "and": "over_14.mp3",
  "simple" : "over_15.mp3", 
  "light" : "over_16.mp3", 
  "xoxo": "over_17.mp3",
  "work": "drum-4/drum_2.mp3",
  "in": "drum-4/drum_14.mp3", 
  "progress": "drum-4/drum_3.mp3",
}


