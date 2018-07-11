/**
 * Clase que se encarga de manejar los datos de la estadistica de ganancias por rango de fechas
 */
class ScoresByDateRange {

  /**
   * Crea la clase
   * @constructor
   */
  constructor() {
    this.labels = []
    this.generalLabels = []
    this.totalByTable = []
  }

  /**
   * Función que se encarga de obtener los labels de acuerdo a los adtos obtenidos de la API
   * @param {Object} data Datos de la estadistica
   * @returns {Object} Labels 
   */
  getLabels( data ) {
    let labels = []
    let generalLabels = []

    data.map( element => {
      if ( labels.indexOf( element.date ) === -1 ) {
        labels.push( element.date )
      }

      element.tables.map( table => {
        if ( generalLabels.indexOf( table.tableName ) === -1 ) {
          generalLabels.push( table.tableName )
        }
      } )
      
    } )

    this.generalLabels = generalLabels
    this.labels = labels

    return { labels, generalLabels }
  }

  /**
   * Función que se encarga de generar los datasets por mesa utilizando la información proporcionada por la API
   * @param {Object} data Datos de la estadistica
   * @returns {Object} Datasets 
   */
  getDatasets( data ) {
    let datasets = []
    let amountByTable = []

    for (let index = 0; index < this.generalLabels.length +1; index++) {
      amountByTable[index] = 0
    }

    data.map( element => {
      
      element.tables.map( table => {
        let amount = amountByTable[ this.generalLabels.indexOf( table.tableName ) ]
        amountByTable[ this.generalLabels.indexOf( table.tableName ) ] = amount + ( table.win / 100 )
      } )

    } )
    const tablesDatasets = this.getTotalDataSet( data )
    const totalDataset = this.getDatasetsByDate( data )
    
    datasets = datasets.concat( totalDataset )
    datasets = datasets.concat( tablesDatasets )

    return { datasets, dataTotal: amountByTable }
  }

  /**
   * Función que se encarga de generar el dataset con el total de ganancias de todas las mesas
   * @param {Object} data Datos de la estadistica
   * @returns {Object} Dataset 
   */
  getTotalDataSet( data ) {
    let totalByDates = []
    const { rgb, rgba } = this.getRandomRGBColor()
    
    data.map( element => {

      let total = 0
      element.tables.map( table => total += (table.win/100) )
      totalByDates.push( total )
    } )

    const dataset = {
      data: totalByDates,
      label: 'Total por fecha',
      fill: true,
      borderColor: rgb,
      backgroundColor: rgba,
      pointRadius: 9,
      pointHoverRadius: 12,
      pointBackgroundColor: rgb,
    }

    return dataset
  }

  /**
   * Función que se encarga de generar los datasets por fecha de acuerdo a la información obtenida
   * @param {Object} data Información de la estadistica
   * @returns {Object} Datasets
   */
  getDatasetsByDate( data ) {
    let datasets = []
    const pointsStyles = ['circle',
      'triangle',
      'rect',
      'rectRounded',
      'rectRot',
      'cross',
      'crossRot',
      'star',
     ]
    
    this.generalLabels.map( label => {

      let tableData = []
      data.map( element => {
        element.tables.map( table => {
          if ( table.tableName === label ) {
            tableData.push( (table.win/100) )
          }
        } )
      } )

      const color = `${this.getRandomColor()}`
      const dataset = {
        data: tableData,
        label: label,
        fill: false,
        borderColor: color,
        backgroundColor: color,
        borderDash: [5, 5],
        pointStyle: pointsStyles[ Math.floor(Math.random() * 8) ],
        pointRadius: 9,
				pointHoverRadius: 12,
      }
      datasets.push( dataset )
      
    } )


    return datasets
  }

  /**
   * Función que se encarga de generar un color random en formato hexadecimal
   * @returns Color en forma hexadecimal
   */
  getRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  /**
   * Función que se encarga de generar un color random en formato RGBa
   * @returns Color en formato RGBa
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

module.exports = ScoresByDateRange