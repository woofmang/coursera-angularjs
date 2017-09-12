(function(){
  'use strict';

  angular.module('ShoppingListApp', [])
  .controller('ShoppingListController', ShoppingListController)
  .provider('ShoppingListService', ShoppingListProvider)
  .config(Config);

  Config.$inject = ['ShoppingListServiceProvider'];
  function Config(ShoppingListServiceProvider) {
    ShoppingListServiceProvider.defaults.maxItems = 2;
  }

  ShoppingListController.$inject = ['ShoppingListService'];
  function ShoppingListController(ShoppingListService) {
    var list = this;

    list.items = ShoppingListService.getItems();

    list.itemName = "";
    list.itemQuantity = "";

    list.addItem = function() {
      try {
        ShoppingListService.addItem(list.itemName, list.itemQuantity);
      } catch(error) {
        list.errorMessage = error.message;
      }
    }

    list1.removeItem = function(itemIndex) {
      shoppingList.removeItem(itemIndex);
    }
  }

  function ShoppingListService(maxItems) {
    var service = this;
    var items = [];
    service.addItem = function(itemName, quantity) {
      if (maxItems === undefined ||
          (maxItems !== undefined) && (items.length < maxItems)) {
            var item = {
              name: itemName,
              quantity: quantity
            };
            items.push(item);
          }
      else {
        throw new Error("Max items (" + maxItems +") reached.");
      }
    };

    service.removeItem = function(itemIndex) {
      items.splice(itemIndex, 1);
    };

    service.getItems = function() {
      return items;
    };
  }

  function ShoppingListProvider() {
    var provider = this;

    provider.defaults = {
      maxItems: 10
    };

    provider.$get = function() {
      var shoppingList = new ShoppingListService(provider.defaults.maxItems);
      return shoppingList;
    }
  }

})();
