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
// set interval
// pause timer
// x start!


function startRunning(){
  do {
    duration = prompt("how many seconds would you like to wait?");
  } while (duration <=0 || isNaN(duration));

  active = true;
  start = Date.parse(new Date());
  end = start + (duration * 1000);
  countingUp = setInterval(countUp, animation_duration) // keep this == to the animation timeout
}

function togglePingPong(){
  pingPong = !pingPong;
  console.log("pingPong is "+ pingPong + "\n");
}

function updateSliderValue(){
  console.log(document.getElementById("duration").value);
}
function init(){
document.getElementById("startButton").addEventListener('click', function(){ startRunning(); return false; });
document.getElementById("togglePingPong").addEventListener('click', function(){ togglePingPong(); return false; });
document.getElementById("duration").addEventListener('drag', function(){ updateSliderValue(); return false; });
//     // document.getElementById("form").addEventListener("click", function(event){
//     //   event.preventDefault()
//     // });
//     document.getElementById('form').onsubmit = startRunning;
    console.log('hi')
}
//
window.onload = init;

// ask for user input on timer length
let duration = ""
let active = false;
var start = Date.parse(new Date());
let pingPong = false;
var end = start + (duration * 1000);
let finished = false;
let countType = true;
let animation_duration = 1000;
var countingUp = "";
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
    resetData()
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
    resetData()
  }
}

function resetData() {
    start = Date.parse(new Date());
    end = start + (duration * 1000);
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
