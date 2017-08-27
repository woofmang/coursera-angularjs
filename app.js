(function(){
  'use strict';
  angular.module('DIApp', [])
  .controller('DIController', DIController);
  DIController.$inject = ['$scope', '$filter'];
  function DIController($scope, $filter) {
    $scope.name = "Kevin";
    $scope.upper = function() {
      var upCase = $filter('uppercase');
      $scope.name = upCase($scope.name);
    };
  }
})();
