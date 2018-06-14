class ScoresByDateRange {
  constructor() {
    this.labels = []
    this.generalLabels = []
    this.totalByTable = []
  }

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

  getTotalDataSet( data ) {
    let totalByDates = []
    const color = `${this.getRandomColor()}`
    
    data.map( element => {

      let total = 0
      element.tables.map( table => total += (table.win/100) )
      totalByDates.push( total )
    } )

    const dataset = {
      data: totalByDates,
      label: 'Total por fecha',
      fill: true,
      borderColor: color,
      backgroundColor: `${color}14`,
      pointRadius: 9,
		  pointHoverRadius: 12,
    }
    console.log( dataset );
    return dataset
  }

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

    console.log( datasets );
    return datasets
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }
}

module.exports = ScoresByDateRange