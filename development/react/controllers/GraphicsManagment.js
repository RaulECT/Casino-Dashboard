import Chart from 'chart.js'

class GraphicsManagment {

  configBarGraphic( config, isMultiLine = false ) {
    const { data, dataLabels, chartLabel, xLabel, yLabel, title, type } = config
    const colors = []

    for (let index = 0; index < dataLabels.length; index++) {
      colors.push( this.getRandomColor().slice( 0, 7 ) )
    }

    const configuration = {
      type: type,
      data: {
        labels: dataLabels,
        datasets: [
          {
            label: chartLabel,
            backgroundColor: colors,
            data: data
          }
        ]
      },
      options: {
        legend: {display: isMultiLine},
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

    if ( isMultiLine ) {
      configuration['data'] = {
        labels: dataLabels,
        datasets: data,
      }
    } else {
      configuration['data'] = {
        labels: dataLabels,
        datasets: [
          {
            label: chartLabel,
            backgroundColor: colors,
            data: data
          }
        ]
      }
    }

    return configuration
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
            pointRadius: 14,
            fill: 'origin'
          }
        ]
      },
      options: {
        legend: {display: isMultiLine},
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
        datasets: data,
      }
    } else {
      configuration['data'] = {
        labels: dataLabels,
        datasets: [{ 
            data: data,
            label: chartLabel,
            borderColor: "#3e95cd",
            fill: 'origin',
            backgroundColor: "#3e95cd8f"
          }
        ]
      }
    }

    return configuration

  }

  configPieGraphic( config ) {
    const { data, dataLabels, chartLabel, title } = config
    const colors = []

    for (let index = 0; index < dataLabels.length; index++) {
      colors.push( this.getRandomColor().slice( 0, 7 ) )
    }

    return {
      type: 'pie',
      data: {
        labels: dataLabels,
        datasets: [{
          label: chartLabel,
          backgroundColor: colors,
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

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return `${color}8f`;
  }
  
}

module.exports = GraphicsManagment