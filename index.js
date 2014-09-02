angular.module('socAlloc', [])
  .controller('AllocController', ['$scope', function($scope) {
    $scope.socs = [
      {name:'Football', requestedFunding:500, allocatedFunding:0},
      {name:'Rowing', requestedFunding:400, allocatedFunding:0}];

    $scope.addSoc = function() {
      $scope.socs.push({name:"", requestedFunding:0, allocatedFunding:0});
    };


    $scope.rmSoc = function() {
      $scope.socs.pop();
    };

    $scope.totalRequested = function(){
      var count = 0;
      angular.forEach($scope.socs, function(soc) {
        count += soc.requestedFunding;
      });
      return count;
    };
  }]);
