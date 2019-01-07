var ctx = document.getElementById('myChart').getContext('2d');
data = {
    datasets: [{
        data: [0,100],
        backgroundColor: [
          'rgba(255, 0, 0, 1)',
          'rgba(255, 255, 255, 1)'
        ],
        hoverBackgroundColor: [
          'rgba(255, 0, 0, 1)',
          'rgba(255, 255, 255, 1)'
        ],
        // borderColor: 'rbga(255, 0, 0, 1)',
        borderWidth: 0,

    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    // labels: [
    //     'Red',
    //     'White'
    // ]
};
Chart.defaults.global.legend.display = false;

// I would like to have form elements for
// x toggle pingpong on off
// x set interval
// pause timer
// x start!
// I would like the form to be big and centered on initial load
// x I would like the form to fade out after submission.
// x I would like to be able to run it a second time without refreshing
// esc in pingpong mode brings up dialog box.
// I would like an "it has been x minutes. start again? clean dialog at end."

function startRunning(){
  resetData();
  document.getElementById('form').classList.add("hidden");
  document.getElementById('form').classList.remove("visible");
  duration = document.getElementById("duration").value;
  active = true;
  start = Date.parse(new Date());
  end = start + (duration * durationMultiplier);
  // countingUp = setInterval(countUp, animation_duration) // keep this == to the animation timeout
}

function togglePingPong(){
  pingPong = !pingPong;
  console.log("pingPong is "+ pingPong + "\n");
}
function setDurationMultiplier(){
  if (document.getElementById("durMinutes").checked){
    durationMultiplier = 60000;
  }
  else { durationMultiplier = 1000;}
}

function init(){
  // event handlers
  document.getElementById("startButton")
        .addEventListener('click', function(){ startRunning(); return false; });
  document.getElementById("togglePingPong")
        .addEventListener('click', function(){ togglePingPong(); return false; });
  document.getElementById("form")
        .addEventListener('submit', function(event){
          event.preventDefault();
          startRunning();
          return false;
        });
document.getElementById('durMinutes').addEventListener('click', function(){
          setDurationMultiplier();
          return false;
        });
document.getElementById('durSeconds').addEventListener('click', function(){
          setDurationMultiplier();
          return false;
        });
}
//
window.onload = init; // assign event handlers when the window is loaded.


let duration = ""
let durationMultiplier = 1
let active = false;
var start = Date.parse(new Date());
let pingPong = false;
var end = start + (duration * 1000);
let finished = false;
let countType = true;
let animation_duration = 1000;
var countingUp = "";
var countingDown = "";

// For a pie chart
var myPieChart = new Chart(ctx,{
    type: 'pie',
    data: data,
    options: {
      animation: {
        duration: animation_duration, // keep this == to the setInterval timeout
        easing: 'linear'
      },
      events: [],

      layout: {
        circumference: 1,
        padding: {
            left: 50,
            right:50,
            top: 50,
            bottom: 50
        }
      }
    }
});

function countUp() {
  // console.log("countup")
  myPieChart.data.datasets[0].backgroundColor = [
    'rgba(255, 0, 0, 1)',
    'rgba(255, 255, 255, 1)'
  ]
  if (myPieChart.data.datasets[0].data[0] <100){
    let newPercent = time_percent(start, end);
    myPieChart.data.datasets[0].data[0] = newPercent;
    myPieChart.data.datasets[0].data[1] = 100-newPercent;
    myPieChart.update();
  }

  if (myPieChart.data.datasets[0].data[0] >= 100 && pingPong){
    console.log('done counting up.');
    countType = !countType;
    resetDataPingPong()
  }
  if (myPieChart.data.datasets[0].data[0] >= 100  && !pingPong && active){
    active = false; // this makes it so this end condition only runs once.
    animationEnd();
  }
}

function countDown() {
  myPieChart.data.datasets[0].backgroundColor = [
    'rgba(0, 255, 0, 1)',
    'rgba(255, 255, 255, 1)'
  ]
  if (myPieChart.data.datasets[0].data[0] != 0){
    let newPercent = time_percent(start, end);
    myPieChart.data.datasets[0].data[0] = 100-newPercent;
    myPieChart.data.datasets[0].data[1] = newPercent;
    myPieChart.update();
  }
  if (myPieChart.data.datasets[0].data[0] <= 0  && pingPong){
    console.log('done counting down.');
    countType = !countType;
    resetDataPingPong()
  }
  if (myPieChart.data.datasets[0].data[0] <= 0  && !pingPong && active){
    active = false; // this makes it so this end condition only runs once.
    animationEnd();
  }
}

function animationEnd(){
  console.log('animation finished');
  resetData();
  if (!pingPong){
    clearInterval(countingDown);
    clearInterval(countingUp);
  }
  document.getElementById('form').classList.remove("hidden"); // fade out controls
  document.getElementById('form').classList.add("visible"); // fade in controls
}

function resetData() {
  myPieChart.data.datasets[0].data[0] = 0;
  myPieChart.data.datasets[0].data[1] = 100;
  start = Date.parse(new Date());
  end = start + (duration * 1000);
  clearInterval(countingUp);
  if (countType){
    clearInterval(countingDown);
    countingUp = setInterval(countUp, animation_duration)
  }
  else {
    clearInterval(countingUp);
    countingDown = setInterval(countDown, animation_duration)
  }
}

function resetDataPingPong() {
  start = Date.parse(new Date());
  end = start + (duration * durationMultiplier);
  // clearInterval(countingUp);
  if (countType){
    clearInterval(countingDown);
    countingUp = setInterval(countUp, animation_duration)
  }
  else {
    clearInterval(countingUp);
    countingDown = setInterval(countDown, animation_duration)
  }
}

// this returns a % of the time period
function time_percent(start, end) {
  let now = Date.parse(new Date());
  let percent = ((now-start) / (end-start))*100;
  console.log("%s%%",percent.toFixed(2));
  return percent;
}
