(function(){
  'use strict';

  angular.module('MenuCategoriesApp', [])
  .controller('MenuCategoriesController', MenuCategoriesController)
  .service('MenuCategoriesService', MenuCategoriesService)
  .constant("ApiBaseUrl", "https://davids-restaurant.herokuapp.com");

  MenuCategoriesController.$inject = ['MenuCategoriesService'];
  function MenuCategoriesController(MenuCategoriesService) {
    var menu = this;

    var promise = MenuCategoriesService.getMenuCategories();

    promise.then(function(response){
      menu.categories = response.data;
    }).catch(function(error){
      console.log("Something went terribly wrong: " + error.message);
    });

    menu.logMenuItems = function(shortName) {
      var promise = MenuCategoriesService.getMenuForCategory(shortName);

      promise.then(function(response){
        console.log(response.data);
      })
      .catch(function(error){
        console.log(error);
      });
    };
  };

  MenuCategoriesService.$inject = ['$http','ApiBaseUrl'];
  function MenuCategoriesService($http, ApiBaseUrl) {
    var service = this;

    service.getMenuCategories = function() {
      var response = $http({
        method: "GET",
        url: (ApiBaseUrl + "/categories.json")
      });
      return response;
    };

    service.getMenuForCategory = function(shortName) {
      var response = $http({
        method: "GET",
        url: (ApiBaseUrl + "/menu_items.json"),
        params: {
          category: shortName
        }
      });
      return response;
    };
  }

})();
