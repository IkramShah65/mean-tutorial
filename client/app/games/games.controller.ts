'use strict';
(function(){
class GamesComponent {
  constructor($http) {
    this.$http = $http;
    this.games = [];
	this.filter = 'none';
  }
  $onInit() {
    this.$http.get('/api/games').then(response => {
      this.games = response.data;	  
      this.originalGames = response.data;
    });
  }
  addGame() {
  if (this.newGame) {
      this.$http.post('/api/games', { name: this.newGame.name , platform: this.newGame.platform, genre: this.newGame.genre});
      this.newGame = '';
    this.$http.get('/api/games').then(response => {
      this.games = response.data;
    });
    }
  }  
    resetGames(){
       this.games = this.originalGames;
	   this.filter = 'none';
    }

    filterByGenre(genre){
      this.resetGames();
        this.filter = 'Genre: ' + genre;
      this.games = this.games.filter(function(game){
        return game.genre === genre;
      });
    };

    filterByPlatForm(platform){
      this.resetGames();
        this.filter = 'Platform: ' + platform;
      this.games = this.games.filter(function(game){
        return game.platform === platform;
      });
    };

   toggleEdit(index){
      this.games[index].edit = !this.games[index].edit; 
    };

    saveGame(index){
        this.$http.put('/api/games/' + this.games[index]._id, this.games[index])
        this.games[index].edit = false;
    };

  deleteGame(index) {  
    this.$http.delete('/api/games/' + this.games[index]._id);
    this.$http.get('/api/games').then(response => {
      this.games = response.data;
    });
  }
}

angular.module('meanTutorialApp')
  .component('games', {
    templateUrl: 'app/games/games.html',
    controller: GamesComponent
  });

})();
