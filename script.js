window.addEventListener("load", iniciar);
document.getElementById('iniciar').addEventListener("click", iniciarFrequencia);
document.getElementById('range').addEventListener("change", cambiarFrequencia);

function iniciar() {
  try{
    window.AudioContext = window.AudioContext || window.webKitAudioContext;
    context = new AudioContext();
  }
  catch(e) {
    alert("La API no va. :(");
  }
}

function iniciarFrequencia() {
  let range = document.getElementById('range').value;
  osc = context.createOscillator();
  osc.frequency.value = range;
  osc.connect(context.destination);
  osc.start(0);
  document.querySelector(".show-frequency").innerHTML = range + "Hz";
}

function cambiarFrequencia() {
  let range = document.getElementById('range').value;
  osc.frequency.value = range;
  document.querySelector(".show-frequency").innerHTML = range + "Hz";
}