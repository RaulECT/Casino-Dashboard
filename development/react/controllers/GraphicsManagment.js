import Chart from 'chart.js'

class GraphicsManagment {

  configBarGraphic( config ) {
    const { data, dataLabels, chartLabel, xLabel, yLabel, title, type } = config

    return {
      type: type,
      data: {
        labels: dataLabels,
        datasets: [
          {
            label: chartLabel,
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
            data: data
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
          text: title
        }
      }
    }
  }
  
  configLineGraphic( config, isMultiLine = false ) {
    const { data, dataLabels, chartLabel, xLabel, yLabel, title } = config

    let configuration = {
      type: 'line',
      data: {
        labels: dataLabels,
        datasets: [{ 
            data: data,
            label: chartLabel,
            borderColor: "#3e95cd",
            fill: 'origin'
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

    if ( isMultiLine ) {
      configuration['data'] = {
        labels: dataLabels,
        datasets: data
      }
    } else {
      configuration['data'] = {
        labels: dataLabels,
        datasets: [{ 
            data: data,
            label: chartLabel,
            borderColor: "#3e95cd",
            fill: false
          }
        ]
      }
    }

    return configuration

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

  configPolarGraphic() {
    
    let config = {
      type: 'polarArea',
      data: {
        labels: ["M1", "M2"],
        datasets: [
          {
            label: "Ganancias por fecha",
            backgroundColor: ["#3e95cd", "#8e5ea2"],
            data: [107050,182050]
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Predicted world population (millions) in 2050'
        }
      }
    }

    return config
  }
  
}

module.exports = GraphicsManagment