window.onload = displayClock();
function displayClock(){
  var display = new Date().toLocaleTimeString();
  document.getElementById('clock').innerHTML = display;
  setTimeout(displayClock, 1000); 
}