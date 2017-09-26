(function () {
'use strict';

angular.module('ShoppingListDirectiveApp', [])
.controller('ShoppingListController', ShoppingListController)
.factory('ShoppingListFactory', ShoppingListFactory)
.directive('shoppingList', ShoppingListDirective);

function ShoppingListDirective() {
  var ddo = {
    templateUrl: 'shoppingList.html',
    scope: {
      items: '<',
      title: '@',
      onRemove: '&',
    },
    controller: ShoppingListDirectiveController,
    controllerAs: 'list',
    bindToController: true,
    link: ShoppingListDirectiveLink
  };

  return ddo;
}

function ShoppingListDirectiveLink(scope, element, attrs, controller) {
  // console.log("Link scope is: ", scope);
  // console.log("Controller instance is: ", controller);
  // console.log("Element is: ", element);

  scope.$watch('list.cookiesInList()', function(newValue, oldValue) {
    console.log("Old value: ", oldValue);
    console.log("New value: ", newValue);

    if (newValue === true) {
      displayCookieWarning();
    }
    else {
      removeCookieWarning();
    }
  });

  function displayCookieWarning() {
    // using jQlite (built-in watered-down version of jQuery)
    // var warningElem = element.find("div");
    // console.log(warningElem);
    // warningElem.css('display', 'block');

    // using jQuery (jQuery must be included before angular in html)
    var warningElem = element.find("div.error");
    warningElem.slideDown(900);
  }

  function removeCookieWarning() {
      // using jqlite
      // var warningElem = element.find("div");
      // warningElem.css('display', 'none');

      // using jquery
      var warningElem = element.find("div.error");
      warningElem.slideUp(900);
  }
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
// function ListItem() {
//   var ddo = {
//     restrict: "E",
    // templateUrl: 'listItem.html'
//   };
//
//   return ddo;
// }

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
    console.log("'this' is: ", this);
    this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
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
