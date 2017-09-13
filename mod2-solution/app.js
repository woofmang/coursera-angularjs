(function(){
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.itemName = "";
    toBuy.itemQuantity = "";

    toBuy.items = ShoppingListCheckOffService.getToBuyItems();

    toBuy.buyItem = function(itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    }
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBought = this;
    alreadyBought.items = ShoppingListCheckOffService.getBoughtItems();
  }

  function ShoppingListCheckOffService() {
    var service = this;

    var toBuyItems = [
      { name: "Cookies", quantity: 10 },
      { name: "Chips", quantity: 100 },
      { name: "Candy", quantity: 30 },
      { name: "Sugary Drinks", quantity: 10 },
      { name: "Pepto Bismol", quantity: 2 }
    ];

    var boughtItems = [];

    var addItemToBoughtItems = function(itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      boughtItems.push(item);
    };

    service.buyItem = function(itemIndex) {
      var boughtItem = toBuyItems.splice(itemIndex, 1);
      var name = boughtItem[0].name;
      var quantity = boughtItem[0].quantity;
      addItemToBoughtItems(name, quantity);
    };

    service.getToBuyItems = function() {
      return toBuyItems;
    };

    service.getBoughtItems = function() {
      return boughtItems;
    }
  }

})();
