(function(){
  'use strict';
  angular.module("LunchCheck", [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.lunchCheckResult = "";
    $scope.checkLunch = function() {
      $scope.lunchCheckResult = "checked";
    };
  }
})();
