module.exports = function GamesHandler() {

  // MARK: PROPERTIES
  this.games = []

  // MARK: FUNCTIONS
  this.addGame = function( casinoId, game ) {
    this.games.push( { casinoId, game: game } )
  }

  this.deleteGame = function( gameId ) {
    const gamesFilterd = this.games.filter( game => game.casinoId !== gameId )
  
    this.games = gamesFilterd
  }

  this.searchByCasinoId = function( casinoId ) {
    let game = null
  
    game = this.games.filter( game => game.casinoId === casinoId )
  
    return game
  }
}