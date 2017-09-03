(function(){
  'use strict';

  var shoppingList = [
    'Milk', 'Donuts', 'Cookies', 'Chocolate', 'Peanut Butter', 'Pepto Bismol',
    'Pepto Bismol (Chocolate Flavor)', 'Pepto Bismol (Cookie Flavor)'
  ];

  angular.module('ShoppingListApp', [])
  .controller('ShoppingListController', ShoppingListController);

  ShoppingListController.$inject = ['$scope'];
  function ShoppingListController($scope) {
    $scope.shoppingList = shoppingList;
}

})();
