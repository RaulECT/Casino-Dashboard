/**
 * Clase que se encarga de configurar los gráficos para mostrarlos al usuario
 */
import Chart from 'chart.js'

class GraphicsManagment {

  /**
   * Función que se encarga de configurar un gráfico de tipo barra
   * @param {Object} config Coniguracion que se desea
   * @param {Boolean} isMultiLine Indica si hay mas de un elemento en el gráfico
   */
  configBarGraphic( config, isMultiLine = false ) {
    const { data, dataLabels, chartLabel, xLabel, yLabel, title, type } = config
    const colors = []
    const bordersColors = []

    for (let index = 0; index < dataLabels.length; index++) {
      const { rgb, rgba } = this.getRandomRGBColor()
      colors.push( rgb )
      bordersColors.push( rgba )
    }

    const configuration = {
      type: type,
      data: {
        labels: dataLabels,
        datasets: [
          {
            label: chartLabel,
            backgroundColor: colors,
            borderColor: bordersColors,
            data: data,
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
              },
              ticks: {
                beginAtZero: true
              },
          }],
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: xLabel
            },
            ticks: {
              beginAtZero: true
            },
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
  
  /**
   * Función que se encarga de configurar un gráfico de tipo lineal
   * @param {Object} config Configuración que se desea del gráfico
   * @param {Boolean} isMultiLine Indica si hay mas de un elemento en el gráfico
   */
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
        responsive: true,
        legend: {display: isMultiLine},
        scales: {
          yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: yLabel
              },
              ticks: {
                beginAtZero: true
              },
          }],
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: xLabel
            },
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
      const { rgb, rgba } = this.getRandomRGBColor()

      configuration['data'] = {
        labels: dataLabels,
        datasets: [{ 
            data: data,
            label: chartLabel,
            borderColor: rgb,
            fill: 'origin',
            backgroundColor: rgba,
            pointRadius: 7,
            pointHoverRadius: 10,
            pointBackgroundColor: rgb,
          }
        ]
      }
    }

    return configuration

  }

  /**
   * Función que se encarga de configurar un gráfico de tipo pastel
   * @param {Object} config Configuración que se desea del gráfico
   */
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
        pieceLabel: {
          render: 'value' //show values
        },
        title: {
          display: true,
          text: title
        }
      }
    }

  }

  /**
   * Función que se encarga de configurar un gráfico de tipo polar
   */
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

  /**
   * Función que se encarga de generar un color random en formato hexadecimal
   * @returns {String} Color en formato hexadecimal
   */
  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return `${color}8f`;
  }

  /**
   * Función que se encarga de generar un color random en formato RGBA
   * @returns {String} Color en formato RGBA
   */
  getRandomRGBColor() {
    const red = Math.floor(Math.random() * 255)
    const green = Math.floor(Math.random() * 255)
    const blue = Math.floor(Math.random() * 255 )
    const alpha = .15

    const rgb = `rgb(${red}, ${green}, ${blue})`
    const rgba = `rgba(${red}, ${green}, ${blue}, ${alpha})`

    return { rgb, rgba }
  }
  
}

module.exports = GraphicsManagment