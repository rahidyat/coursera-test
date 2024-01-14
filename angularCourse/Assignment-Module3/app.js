(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems);

function FoundItems() {
    var ddo = {
        restrict: 'E',
        templateUrl: 'foundList.html',
        scope: {
            foundItems: '<',
            onRemove: '&'
        },
        controller: NarrowItDownController,
        controllerAs: 'list',
        bindToController: true
    };

    return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService', '$scope'];
function NarrowItDownController(MenuSearchService, $scope) {
    var menu = this;
    this.onclick = function () {
        if($scope.searchTerm != ""){
            menu.class_loader = "block"
            var promise = MenuSearchService.getMatchedMenuItems($scope.searchTerm);
            promise.then(function (response) {
                menu.found = response;
                menu.class_loader = "none"
            })
            .catch(function (error) {
                console.log(error);
                menu.class_loader = "none"
            });
        }else{
            menu.found = []
        }
    }

    this.removeItem = function (itemIndex) {
        this.found.splice(itemIndex, 1);
    };
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
    this.getMatchedMenuItems = function (searchTerm) {
        return $http({
                method: "GET",
                url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json"
            }).then(function (result) {
                var list = result.data
                var foundItems = new Array();
                for (const [key, value] of Object.entries(list)) {
                    for (var y = 0; y < value.menu_items.length; y++){
                        var name = value.category.name;
                        var short_name = value.category.short_name;
                        if (value.menu_items[y].description.toLowerCase().indexOf(searchTerm) !== -1) {
                            var item = {
                              name: name,
                              short_name: short_name,
                              description: value.menu_items[y].description
                            }
                            foundItems.push(item);
                        }
                    }
                }

                return foundItems;
            });
    }
}

})();


