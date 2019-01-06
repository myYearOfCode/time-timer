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

function changeData() {
  if (myPieChart.data.datasets[0].data[0] <100 && finished == false){
    let newPercent = time_based(start, end);
    myPieChart.data.datasets[0].data[0] = newPercent;
    myPieChart.data.datasets[0].data[1] = 100-newPercent;
    myPieChart.update();
    // time_based(start, end);
  }
  if (myPieChart.data.datasets[0].data[0] == 100 && finished == false){
    console.log('setting class to finished');
    finished = true;
    let element = document.querySelector(".chart");
    element.classList.add("finished")
  }
}

function resetData() {
    myPieChart.data.datasets[0].data[0] = 0;
    myPieChart.data.datasets[0].data[1] = 100;
    myPieChart.update();
}

function time_based(start, end) {
  let now = Date.parse(new Date());
  let percent = ((now-start) / (end-start))*100;
  console.log("%s%%",percent.toFixed(2));
  return percent;
}

setInterval(changeData, animation_duration) // keep this == to the animation timeout
