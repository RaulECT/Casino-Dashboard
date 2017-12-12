/**
 * @fileOverview This is Home Controller definition
 * @module Home
 */
(function () {
  angular.module('app').controller('historyTillCtrl', tillCtrl);

  tillCtrl.$inject = ['$location', 'authenticateFactory', 'languageFactory', 'logFactory'];

  function tillCtrl($location, authenticateFactory, languageFactory, logFactory) {
    var vm = this;
    var maxPage = 0;
    vm.pageWidth = 5;
    vm.text = languageFactory.historyTill();
    vm.logo = './assets/img/menu_int_denominaciones.png';

    vm.go = go;
    vm.data = [];
    var totalfound = 0;
    vm.content = [];
    vm.pageSizeArray=[5,10,25,50,100];
    vm.pageSize = vm.pageSizeArray[0];
    vm.pageNumber = 1;
    vm.pages = [];
    vm.updatePage = updatePage;
    vm.setPage = setPage;
    vm.updatePageSize=updatePageSize;
    vm.filterByTill=filterByTill;

    getLog();

    function init() {
      maxPage = Math.ceil(totalfound / vm.pageSize);
      vm.pages=[];
      for (var i = 0; i <= vm.pageWidth; i++) {
        if (i < maxPage) vm.pages.push(i + 1);
      }
    };


    function getLog(tillId=false) {
      var data={pageNumber:vm.pageNumber, pageSize:vm.pageSize};
      if(tillId) data.tillId=tillId;
      logFactory.till(data).then(response => {
        if(response.success){
          vm.content = [];
          totalfound=response.data.totalFound;
          for(var i=0;i<response.data.items.length;i++){
            var date=new Date(response.data.items[i].createdOn);
             response.data.items[i].createdOn=date.toLocaleDateString()+" "+date.toLocaleTimeString();
            vm.content.push(response.data.items[i])
            console.log(response.data.items[i]);
          };
          init();
        }
        
      });
    };

    function updatePage(p) {
      var start = vm.pages[vm.pages.length - 1] + p;
      console.log(start);
      if (start > -1 && start < maxPage) {
        vm.pages = [];
        for (var i = start; i < pageWidt; i++) {
          if (i <= maxPage) vm.pages.push(i + 1);
        }
      }
    };

    function updatePageSize(s){
      vm.pageSize=s;
      vm.pageNumber=1;
      getLog();
    };

    function setPage(n) {
      vm.pageNumber = n;
      getLog();
    };

    function filterByTill(id){
      vm.pageNumber=1;
      getLog(id);
    }


    function go(path) {
      console.log(path);
      if (path == '/login') {
        authenticateFactory.logout()
          .then(function (response) {
            if (response.success) {
              $location.path(path);
            }
            else {
              console.log(response.message);
            }
          });
      }
      else { $location.path(path); }
    };
  }
})();