(function () {
'use strict';

angular.module('ShoppingListDirectiveApp', [])
.controller('ShoppingListController', ShoppingListController)
.factory('ShoppingListFactory', ShoppingListFactory)
// .controller('ShoppingListDirectiveController', ShoppingListDirectiveController)
.directive('shoppingList', ShoppingListDirective);

function ShoppingListDirective() {
  var ddo = {
    templateUrl: 'shoppingList.html',
    scope: {
      items: '<',
      title: '@'
    },
    controller: ShoppingListDirectiveController,
    controllerAs: 'list',
    // alternatively,if we declare the controller on the module (as above,
    // commented out), we could replace the above two lines with th one below,
    // and then, we'd be able to reference this controller anywhere in the app
    // controller: 'ShoppingListDirectiveController as list',
    bindToController: true
  };

  return ddo;
}

function ShoppingListDirectiveController() {
  var list = this;

  list.cookiesInList = function() {
    for (var i = 0; i < list.items.length; i++) {
      var name = list.items[i].name;
      if (name.toLowerCase().indexOf("cookie") !== -1) {
        return true;
      }
    }
    return false;
  };

}

//
function ListItem() {
  var ddo = {
    restrict: "E",
    templateUrl: 'listItem.html'
  };

  return ddo;
}

// we can access item.quantity and item.name because
// directives inherit the same scope as the controller
// they are used in by default
function ListItemDescription() {
  var ddo = {
    template: '{{ item.quantity }} of {{ item.name }}'
  };

  return ddo;
}


// LIST #1 - controller
ShoppingListController.$inject = ['ShoppingListFactory'];
function ShoppingListController(ShoppingListFactory) {
  var list = this;

  // Use factory to create new shopping list service
  var shoppingList = ShoppingListFactory();

  list.items = shoppingList.getItems();
  var origTitle = "Shopping List #1";
  list.title = origTitle + " (" + list.items.length + " items)";

  list.itemName = "";
  list.itemQuantity = "";

  list.addItem = function () {
    shoppingList.addItem(list.itemName, list.itemQuantity);
    list.title = origTitle + " (" + list.items.length + " items)";
  };

  list.removeItem = function (itemIndex) {
    shoppingList.removeItem(itemIndex);
    list.title = origTitle + " (" + list.items.length + " items)";
  };
}

// If not specified, maxItems assumed unlimited
function ShoppingListService(maxItems) {
  var service = this;

  // List of shopping items
  var items = [];

  service.addItem = function (itemName, quantity) {
    if ((maxItems === undefined) ||
        (maxItems !== undefined) && (items.length < maxItems)) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      items.push(item);
    }
    else {
      throw new Error("Max items (" + maxItems + ") reached.");
    }
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
}


function ShoppingListFactory() {
  var factory = function (maxItems) {
    return new ShoppingListService(maxItems);
  };

  return factory;
}

})();
