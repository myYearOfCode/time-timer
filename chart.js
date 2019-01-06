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

// ask for user input on timer length
let duration = prompt("how many seconds would you like to wait?");
var start = Date.parse(new Date());
var end = start + (duration * 1000);
let finished = false;
let countType = true;
let animation_duration = 1000;
// For a pie chart
var myPieChart = new Chart(ctx,{
    type: 'pie',
    data: data,
    options: {
      animation: {
        duration: animation_duration, //keep this == to the setInterval timeout
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
  myPieChart.data.datasets[0].backgroundColor = [
    'rgba(255, 0, 0, 1)',
    'rgba(255, 255, 255, 1)'
  ]
  if (myPieChart.data.datasets[0].data[0] <100){
    let newPercent = time_based(start, end);
    myPieChart.data.datasets[0].data[0] = newPercent;
    myPieChart.data.datasets[0].data[1] = 100-newPercent;
    myPieChart.update();

  }

  if (myPieChart.data.datasets[0].data[0] == 100){
    console.log('count up. setting class to finished');
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
    let newPercent = time_based(start, end);
    myPieChart.data.datasets[0].data[0] = 100-newPercent;
    myPieChart.data.datasets[0].data[1] = newPercent;
    myPieChart.update();
  }
  if (myPieChart.data.datasets[0].data[0] == 0){
    console.log('countdown. setting class to finished');
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

function time_based(start, end) {
  let now = Date.parse(new Date());
  let percent = ((now-start) / (end-start))*100;
  console.log("%s%%",percent.toFixed(2));
  return percent;
}

let countingUp = setInterval(countUp, animation_duration) // keep this == to the animation timeout
// let countingDown = setInterval(countDown, animation_duration)
