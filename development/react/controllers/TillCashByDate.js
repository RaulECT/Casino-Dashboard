class TillCashByDate {
  constructor() {
    this.labels = []
    this.generalLabels = []
    this.totalByTable = []
  }

  getLabels( data ) {
    let labels = []
    console.log( data );

    data.map( record => labels.push( record.time ) )
    
    return labels
  }

  getData( data ) {
    let amounts = []

    data.map( record => amounts.push( ( record.dif / 100 ) ) )
    
    return amounts
  }

}

module.exports = TillCashByDate