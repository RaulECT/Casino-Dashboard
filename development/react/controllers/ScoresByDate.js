class ScoresByDate {

  constructor() {
    this.labels = []
  }

  getLables( data ) {
    let labels = []
    console.log( data );
    
    data.map( table => {
      table.scores.map( score => {
        labels.push( score.time )
      } )
    } )

    labels.sort(this.compare)
    console.log(labels);
    this.labels = labels

    return labels
  }

  getDatasets( data ) {
    let datasets = []

    data.map( table => {
      console.log( table );
      let data = []
      for (let index = 0; index < this.labels.length; index++) {
        data[index] = 0
      }

      table.scores.map( score => {
       data[ this.labels.indexOf(score.time) ] = score.amount / 100 
      } )

      let dataset = {
        data,
        label: table.tableId,
        fill: false,
        borderColor: this.getRandomColor()
      }

      datasets.push( dataset )    
    } )
    console.log(datasets);
    
    return datasets
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
    return color;
  }
}

module.exports = ScoresByDate