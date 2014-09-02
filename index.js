angular.module('socAlloc', [])
  .controller('AllocController', ['$scope', function($scope) {
    $scope.socs = [
      {name:'Football', requested:500},
      {name:'Rowing', requested:400}];

    $scope.addSoc = function() {
      $scope.socs.push({name:"", requested:0});
    };
  }]);
