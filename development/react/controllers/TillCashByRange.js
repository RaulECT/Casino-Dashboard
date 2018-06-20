class TillCashByRange {

  getLabels( data ) {
    let labels = []

    data.map( record => labels.push( record.date ) )

    return labels
  }

  getData( data ) {
    let amounts = []

    data.map( record => amounts.push( ( record.total/100 ) ) )

    return amounts
  }
}

module.exports = TillCashByRange