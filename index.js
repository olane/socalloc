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

    $scope.socAllocation = function(soc){
      $scope.calculate();
      return soc.allocatedFunding;
    };

    $scope.calculate = function() {

      var remainingBudget = $scope.budget;

      angular.forEach($scope.socs, function(soc){
        soc.allocatedFunding = 0;
      });

      while(remainingBudget > 0){

        var totalUnfulfilledMembers = $scope.totalUnfulfilledMembers();

        if(totalUnfulfilledMembers === 0){
          break;
        }

        var budgetPerUnfulfilledMember = remainingBudget / totalUnfulfilledMembers;

        var overflowBudget = 0;

        angular.forEach($scope.socs, function(soc){
          if(soc.allocatedFunding !== soc.requestedFunding){

            soc.allocatedFunding += budgetPerUnfulfilledMember * soc.memberCount;

            if(soc.allocatedFunding > soc.requestedFunding){
              overflowBudget += soc.allocatedFunding - soc.requestedFunding;
              soc.allocatedFunding = soc.requestedFunding;
            }
          }
        });

        remainingBudget = overflowBudget;

      }
    };

    $scope.totalMembers = function() {
      var count = 0;
      angular.forEach($scope.socs, function(soc) {
        count += soc.memberCount;
      });
      return count;
    };

    $scope.totalUnfulfilledMembers = function() {
      var count = 0;
      angular.forEach($scope.socs, function(soc) {
        if(soc.requestedFunding !== soc.allocatedFunding){
          count += soc.memberCount;
        }
      });
      return count;
    };

  }]);
