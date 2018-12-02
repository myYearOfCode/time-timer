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


// For a pie chart
var myPieChart = new Chart(ctx,{
    type: 'pie',
    data: data,
    options: {
      animation: {
        duration: 1000,
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
    myPieChart.data.datasets[0].data[0] += 10;
    myPieChart.data.datasets[0].data[1] -= 10;
    myPieChart.update();
  }
}
// myLinemyPieChartChart.update(); // Calling update now animates the position of March from 90 to 50.

setInterval(changeData, 1000)














//
// var chart = new Chart(ctx, {
//     // The type of chart we want to create
//     type: 'line',
//
//     // The data for our dataset
//     data: {
//         labels: ["January", "February", "March", "April", "May", "June", "July"],
//         datasets: [{
//             label: "My First dataset",
//             backgroundColor: 'rgb(255, 99, 132)',
//             borderColor: 'rgb(255, 99, 132)',
//             data: [0, 10, 5, 2, 20, 30, 45],
//         }]
//     },
//
//     // Configuration options go here
//     options: {}
// });
