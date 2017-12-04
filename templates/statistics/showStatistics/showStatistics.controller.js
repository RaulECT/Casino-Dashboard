/**
 * @fileOverview This is Home Controller definition
 * @module Home
 */
(function() {
    angular.module('app').controller('showStatisticsCtrl', showstatistics);
  
    showstatistics.$inject = ['$location',  'authenticateFactory',  'languageFactory'];
  
    function showstatistics( $location,  authenticateFactory,  languageFactory) {
      var vm = this;
      vm.text=languageFactory.statisticsEmailManager();
      vm.img='./assets/img/menu_int_visual_esta.png';
      vm.go=go;

      vm.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
      vm.series = ['Series A', 'Series B'];
      vm.options = {legend: {display: true}};
      vm.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
      ];
  
    
      
      function go( path ) {
        console.log(path);
        if(path=='/login'){
          authenticateFactory.logout()
          .then(function(response){
            if(response.success){
              $location.path( path );
            }
            else{
              console.log(response.message);
            }
          });
        }
        else{ $location.path( path );}
      };    
    }
  })();