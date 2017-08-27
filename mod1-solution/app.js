(function(){
  'use strict';
  angular.module("LunchCheck", [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.lunchContents = "";
    $scope.lunchCheckResult = "";
    $scope.messageEmpty = false;
    $scope.messageNotOk = false;
    $scope.messageOk = false;
    $scope.checkLunch = function() {
      var result = "";
      var number = checkIt();
      if (number == 0) {
        $scope.messageEmpty = true;
        result = "C'mon; gimme something to work with here...";
      } else if (number > 3) {
        $scope.messageNotOk = true;
        result = "Too much!";
      } else if (number <= 3) {
        $scope.messageOk = true;
        result = "Enjoy!"
      }
      $scope.lunchCheckResult = result;
    };

    $scope.clearResult = function () {
      $scope.messageEmpty = false;
      $scope.messageNotOk = false;
      $scope.messageOk = false;
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
