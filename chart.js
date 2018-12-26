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
        borderWidth: 0,

    }],
    // These labels appear in the legend and in the tooltips when hovering different arcs
    // labels: [
    //     'Red',
    //     'White'
    // ]
};

// ask for user input on timer length
let duration = prompt("how many seconds would you like to wait?");
var start = Date.parse(new Date());
var end = start + (duration * 1000);

// For a pie chart
var myPieChart = new Chart(ctx,{
    type: 'pie',
    data: data,
    options: {
      animation: {
        duration: 1000, //keep this == to the setInterval timeout
        easing: 'linear'
      },

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
  if (myPieChart.data.datasets[0].data[0] <100){
    let newPercent = time_based(start, end);
    myPieChart.data.datasets[0].data[0] = newPercent;
    myPieChart.data.datasets[0].data[1] = 100-newPercent;
    myPieChart.update();
    // time_based(start, end);
  }
}

function time_based(start, end) {
  let now = Date.parse(new Date());
  let percent = ((now-start) / (end-start))*100;
  console.log("%s%%",percent.toFixed(2));
  return percent;
}

setInterval(changeData, 1000) // keep this == to the animation timeout
