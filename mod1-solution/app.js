(function(){
  'use strict';
  angular.module("LunchCheck", [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.lunchContents = "";
    $scope.lunchCheckResult = "";
    $scope.checkLunch = function() {
      var result = "";
      var number = checkIt();
      if (number == 0) {
        console.log("number is 0");
        result = "C'mon; gimme something to work with here...";
      } else if (number > 3) {
        console.log("number is more than 3");
        result = "Too much!";
      } else if (number <= 3) {
        console.log("number is 3 or less");
        result = "Enjoy!"
      }
      $scope.lunchCheckResult = result;
    };

    $scope.clearResult = function () {
      $scope.lunchCheckResult = "";
    }

    var checkIt = function() {
      var items = [];
      var rawItems = $scope.lunchContents.split(",");
      for (var i = 0; i < rawItems.length; i++) {
        var trimmedItem = rawItems[i].toString().trim();
        if (trimmedItem.length > 0) {
          items.push(trimmedItem);
        }
      }
      return items.length;
    };
  }
})();
