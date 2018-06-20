class ScoresByDate {

  constructor() {
    this.labels = []
    this.generalLabels = []
    this.totalByTable = []
  }

  getLables( data ) {
    let labels = []
    let generalLabels = []
    console.log( data );
    
    data.map( table => {
      generalLabels.push( table.tableId )
      table.scores.map( score => {
        if ( labels.indexOf( score.time ) === -1 ) {
          labels.push( score.time )
        }
      } )
    } )

    labels.sort(this.compare)
    
    this.generalLabels = generalLabels
    this.labels = labels

    return { labels, generalLabels }
  }

  getDatasets( data ) {
    let datasets = []
    let totalByTable = []

    data.map( table => {
      const tableTotal = this.getTotalByTable( table.scores )
      totalByTable.push( tableTotal )
      
      let data = []
      for (let index = 0; index < this.labels.length; index++) {
        data[index] = 0
      }

      table.scores.map( score => {
       data[ this.labels.indexOf(score.time) ] = score.amount / 100 
      } )

      const { rgb, rgba } = this.getRandomRGBColor()
      let dataset = {
        data,
        label: table.tableId,
        fill: true,
        borderColor: rgb,
        backgroundColor: rgba,
        pointRadius:4,
        pointBackgroundColor: rgb,
      }

      datasets.push( dataset )    
    } )
    
    totalByTable.push(0)
    
    return { datasets, totalByTable }
  }

  getTotalByTable( table ) {
    let total = 0
    
    table.map( score => total += ( score.amount / 100) )

    return total
  }

   compare(a,b) {
    var time1 = parseFloat(a.replace(':','.').replace(/[^\d.-]/g, ''));
    var time2 = parseFloat(b.replace(':','.').replace(/[^\d.-]/g, ''));

    if (time1 < time2) return -1;
    if (time1 > time2) return 1;
    return 0;
  }

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

module.exports = ScoresByDate