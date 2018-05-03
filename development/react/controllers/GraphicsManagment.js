import Chart from 'chart.js'

class GraphicsManagment {

  
  configLineGraphic( config ) {
    const { data, dataLabels, chartLabel, xLabel, yLabel, title } = config

    return {
      type: 'line',
      data: {
        labels: dataLabels,
        datasets: [{ 
            data: data,
            label: chartLabel,
            borderColor: "#3e95cd",
            fill: false
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: yLabel
              }
          }],
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: xLabel
            }
          }]
      },
        title: {
          display: true,
          fontSize: 16,
          text: title
        }
      }
    }

  }

  configPieGraphic( config ) {
    const { data, dataLabels, chartLabel, title } = config

    return {
      type: 'pie',
      data: {
        labels: dataLabels,
        datasets: [{
          label: chartLabel,
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: data
        }]
      },
      options: {
        title: {
          display: true,
          text: title
        }
      }
    }

  }
  
}

module.exports = GraphicsManagment