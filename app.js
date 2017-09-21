(function () {
'use strict';

angular.module('ShoppingListDirectiveApp', [])
.controller('ShoppingListController1', ShoppingListController1)
.controller('ShoppingListController2', ShoppingListController2)
.factory('ShoppingListFactory', ShoppingListFactory)
.directive('listItemDescription', ListItemDescription)
.directive('shoppingList', ShoppingList);

function ShoppingList() {
  var ddo = {
    templateUrl: 'shoppingList.html',
    // Isolate Scope
    scope: {
      // use "=" for 2-way binding: changes in the DOM are reflected here,
      // and changes here are reflected in the DOM
      list: '=myList',
      // use "@" for 1-way binding: changes in the DOM are reflected here,
      // but changes here are NOT reflected in the DOM
      title: '@title'
      // NOTE: using "=" or "@" by themselves assumes that the bound property in
      // the DOM has the de-normalized version of the name in the directive. For
      // example, "myList: '='" would be a 2-way binding to "my-list" in the DOM
    }
  };

  return ddo;
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
ShoppingListController1.$inject = ['ShoppingListFactory'];
function ShoppingListController1(ShoppingListFactory) {
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


// LIST #2 - controller
ShoppingListController2.$inject = ['ShoppingListFactory'];
function ShoppingListController2(ShoppingListFactory) {
  var list = this;

  // Use factory to create new shopping list service
  var shoppingList = ShoppingListFactory(3);

  list.items = shoppingList.getItems();

  list.itemName = "";
  list.itemQuantity = "";

  list.addItem = function () {
    try {
      shoppingList.addItem(list.itemName, list.itemQuantity);
    } catch (error) {
      list.errorMessage = error.message;
    }

  };

  list.removeItem = function (itemIndex) {
    shoppingList.removeItem(itemIndex);
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
