angular.module('socAlloc', [])
  .controller('AllocController', ['$scope', function($scope) {
    $scope.socs = [
      {name:'Football',
       requestedFunding:500,
       memberCount:23},
      {name:'Rowing',
       requestedFunding:400,
       memberCount:13},
      {name:'Knitting',
       requestedFunding:1000,
       memberCount:3}];

    $scope.budget = 801;

    $scope.addSoc = function() {
      $scope.socs.push({name:"",
                        requestedFunding:0,
                        memberCount:0,
                        allocatedFunding:0});
    };


    $scope.removeRow = function(soc) {

      var index = $scope.socs.indexOf(soc);

      if (index > -1) {
        $scope.socs.splice(index, 1);
      }

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

    $scope.totalAllocatedFunding = function() {
      var count = 0;
      angular.forEach($scope.socs, function(soc) {
        count += soc.allocatedFunding;
      });
      return count;
    }

    $scope.unusedBudget = function() {
      var unused = $scope.budget - $scope.totalAllocatedFunding();
      return unused > 0 ? unused : 0;
    }


    $scope.notGrantedTotal = function() {
      var total = $scope.totalRequested() - $scope.budget;
      return total > 0 ? total : 0;
    }

    $scope.importPastedData = function() {

      var data = $scope.pasteData;

      var rows = data.split("\n");

      $scope.socs = [];

      for(var y in rows) {
        var cells = rows[y].split("\t");

        if(cells[1] == null){
          cells[1] = 0
        }

        if(cells[2] == null){
          cells[2] = 0
        }

        $scope.socs.push(
          {
            name: cells[0],
            memberCount: $scope.tryParseInt(cells[1]),
            requestedFunding: $scope.tryParseFloat(cells[2])
          });
      }
    };

    $scope.tryParseInt = function(str){
      var result = parseInt(str.replace(/[^0-9\.]+/g,""));
      return isNaN(result) ? 0 : result;
    };

    $scope.tryParseFloat = function(str){
      var result = parseFloat(str.replace(/[^0-9\.]+/g,""));
      return isNaN(result) ? 0 : result;
    };


    $scope.getExportData = function() {
      var str = "";
      angular.forEach($scope.socs, function(soc) {
        str += soc.name + "\t";
        str += soc.memberCount + "\t";
        str += soc.requestedFunding.toFixed(2) + "\t";
        str += soc.allocatedFunding.toFixed(2) + "\n";
      });
      return str;
    }

  }]);
