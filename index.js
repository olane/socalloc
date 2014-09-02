angular.module('socAlloc', [])
  .controller('AllocController', ['$scope', function($scope) {
    $scope.socs = [
      {name:'Football',
       requestedFunding:500,
       memberCount:23,
       allocatedFunding:20},
      {name:'Rowing',
       requestedFunding:400,
       memberCount:13,
       allocatedFunding:50}];

    $scope.addSoc = function() {
      $scope.socs.push({name:"",
                        requestedFunding:0,
                        memberCount:0, 
                        allocatedFunding:0});
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
