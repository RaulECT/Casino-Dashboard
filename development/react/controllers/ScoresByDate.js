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
        labels.push( score.time )
      } )
    } )

    labels.sort(this.compare)
    console.log(labels);
    console.log( generalLabels );
    
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

      const color = this.getRandomColor()
      let dataset = {
        data,
        label: table.tableId,
        fill: true,
        borderColor: color,
        backgroundColor: color
      }

      datasets.push( dataset )    
    } )
    
    console.log( totalByTable );
    
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

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return `${color}8f`;
  }
}

module.exports = ScoresByDate