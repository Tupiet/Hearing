// ----------- //
//   PROGRAM   //
// ----------- //

// Aquesta part declara els botons i divs necessaris. 

// Buttons
startButton = document.getElementById('letsStart');
iniciarLeft = document.getElementById('iniciarLeft');
adelanteLeftFrec = document.getElementById('adelanteLeftFrec');
adelanteRightFrec = document.getElementById('adelanteRightFrec');
finalButton = document.getElementById('finalButton');

stopLeft = document.getElementById('stopLeft');
restartLeft = document.getElementById('restartLeft');

// Divs
const intro = document.querySelector('.intro');
const interface = document.querySelector('.interface');

const left = document.querySelector('.left');
const right = document.querySelector('.right');

const config = document.querySelector('.config');
const result = document.querySelector('.result');

const optionsLeft = document.querySelector('.optionsLeft');
const optionsRight = document.querySelector('.optionsRight');

const show = document.querySelector('.show-frequency');

// Quan la pàgina carregui, iniciar() s'executarà.
window.addEventListener("load", iniciar);

// Quan passin certes accions, s'activarà alguna funció.
// Aquestes funcions estan declarades en aquest bloc.
// Al blog de "cutscenes" n'hi ha més. 
document.getElementById('iniciarLeft').addEventListener("click", iniciarFrequenciaLeft);

document.getElementById('rangeLeftFrec').addEventListener("change", cambiarFrequenciaLeft);
document.getElementById('rangeLeftVol').addEventListener("change", cambiarVolumenLeft);

document.getElementById('rangeRightFrec').addEventListener("change", cambiarFrequenciaRight);
document.getElementById('rangeRightVol').addEventListener("change", cambiarVolumenRight);

finalButton.addEventListener('click', final);

// Variables globals
leftFrec = 0;
rightFrec = 0;
leftSound = 0.3;
rightSound = 0.3;

// Això es fa al començar, inicia l'AudioContext.
function iniciar() {
  try{
    window.AudioContext = window.AudioContext || window.webKitAudioContext;
    audioContext = new AudioContext();
  }
  catch(e) {
    alert("La API no va. :(");
  }
}

// Ara s'ha espitxat el botó "iniciar", 
// i crea els oscil·ladors necessaris i ho connecta 
// fent l'stereo (tot i que només usem un canal, l'esquerre).
function iniciarFrequenciaLeft() {
  let rangeLeftFrec = document.getElementById('rangeLeftFrec').value;
  
  leftOscillator = audioContext.createOscillator();
  leftGain = audioContext.createGain();
  rightOscillator = audioContext.createOscillator();
  rightGain = audioContext.createGain();
  merger = audioContext.createChannelMerger(2);

  leftOscillator.connect(leftGain).connect(merger, 0, 0);
  rightOscillator.connect(rightGain).connect(merger, 0, 1);

  merger.connect(audioContext.destination); 

  leftOscillator.frequency.value = rangeLeftFrec;
  leftFrec = rangeLeftFrec;

  leftGain.gain.value = 0.3;
  leftOscillator.start(0);

  document.querySelector(".show-frequency-left").innerHTML = rangeLeftFrec + "Hz";
}

// Això s'activa quan es canvia la freqüència movent la barra.
function cambiarFrequenciaLeft() {
  let rangeLeftFrec = document.getElementById('rangeLeftFrec').value;

  leftOscillator.frequency.value = rangeLeftFrec;
  leftFrec = rangeLeftFrec;

  document.querySelector(".show-frequency-left").innerHTML = rangeLeftFrec + "Hz";
}

// Això s'activa al moure la barra del so.
function cambiarVolumenLeft() {
  let rangeLeftVol = document.getElementById('rangeLeftVol').value;
  let volume = rangeLeftVol / 100;
  leftGain.gain.value = volume;
  leftSound = rangeLeftVol;
}

// En aquest punt, hem desconnectat el canal esquerre del nostre stereo (ho fem baix, al addEventListener de "avanzarLeft"). Per tant, només activarem ara el canal dret.
function iniciarFrequenciaRight() {
  let rangeRightFrec = document.getElementById('rangeRightFrec').value;

  rightOscillator.frequency.value = rangeRightFrec;
  rightFrec = rangeRightFrec;

  rightGain.gain.value = 0.3;
  rightOscillator.start(0);

  document.querySelector(".show-frequency-right").innerHTML = rangeRightFrec + "Hz";
}

// Això s'activarà al moure's el la barra de la freqüència.
function cambiarFrequenciaRight() {
  let rangeRightFrec = document.getElementById('rangeRightFrec').value;

  rightOscillator.frequency.value = rangeRightFrec;
  rightFrec = rangeRightFrec;

  document.querySelector(".show-frequency-right").innerHTML = rangeRightFrec + "Hz";
}

// I això serveix per a canviar el volum.
function cambiarVolumenRight() {
  let rangeRightVol = document.getElementById('rangeRightVol').value;
  let volume = rangeRightVol / 100;
  rightGain.gain.value = volume;
  rightSound = rangeRightVol;
}

// Això s'executarà en últim pla. 
// Un cop tots els valors ja han sigut assignats, 
// ara els reprodueix tots.
function final() {
  leftOscillator.frequency.value = leftFrec;
  leftGain.gain.value = leftSound / 100;

  rightOscillator.frequency.value = rightFrec;
  rightGain.gain.value = rightSound / 100;

  leftOscillator.connect(leftGain).connect(merger, 0, 0);
  rightOscillator.connect(rightGain).connect(merger, 0, 1);

  finalButton.style.display = 'none';
  show.style.display = 'block';
  show.innerHTML = 
  `<p>Izquierda: ${leftFrec} Hz i ${leftSound} de volumen</p>
   <p>Derecha: ${rightFrec} Hz i ${rightSound} de volumen</p>`
}

// ---------------------- //
//  CUTSCENES I PROGRAMA  //
// ---------------------- //

// Aquest apartat està dedicat als canvis més visuals. 
// També inclou parts importants per a funcionar el programa.

// Això passa quan es prem el botó "¡empecemos!" del principi.
startButton.addEventListener('click', function() {
  intro.style.display = 'none';
  startButton.style.display = 'none';
  interface.style.display = 'inline';
});

// Aquí apareixen els controls de l'orella esquerra.
iniciarLeft.addEventListener('click', function() {
  iniciarLeft.style.display = 'none';
  optionsLeft.style.display = 'inline';
});

// Això para el so a l'orella esquerra.
// Estic usant un try ja que pot donar errors 
// si es prem el botó dos cops.
stopLeft.addEventListener('click', function() {
  stopLeft.style.display = 'none';
  restartLeft.style.display = 'block';
  try {
    leftOscillator.disconnect(leftGain);
  } catch (e) {
    console.log('Uh... Algo ha fallado');
  }
  
});

// Aquí reactivem el so esquerre.
restartLeft.addEventListener('click', function() {
  restartLeft.style.display = 'none';
  stopLeft.style.display = 'block';
  leftOscillator.connect(leftGain).connect(merger, 0, 0);
});

// Aquí parem el so de l'orella dreta.
stopRight.addEventListener('click', function() {
  stopRight.style.display = 'none';
  restartRight.style.display = 'block';
  try {
    rightOscillator.disconnect(rightGain);
  } catch (e) {
    console.log('Uh... Algo ha fallado');
  }
  
});

// I, sí, aquí activem el so dret un altre cop.
restartRight.addEventListener('click', function() {
  restartRight.style.display = 'none';
  stopRight.style.display = 'block';
  rightOscillator.connect(rightGain).connect(merger, 0, 1);
});

// Aquí fem el pas de l'orella esquerra a la dreta.
adelanteLeftFrec.addEventListener('click', function() {
  // Desconnectem l'oscil·lador esquerre, que és el que estava sonant.
  leftOscillator.disconnect(leftGain);
  // Iniciem la freqüència dreta.
  iniciarFrequenciaRight();
  left.style.display = 'none';
  right.style.display = 'inline';
  optionsRight.style.display = 'inline';
});

// I ara passem a la part final
adelanteRightFrec.addEventListener('click', function() {
  rightOscillator.disconnect(rightGain);
  config.style.display = 'none';
  result.style.display = 'inline';
  console.log(leftFrec + "\n" + rightFrec + "\n" + leftSound + "\n" + rightSound);
});