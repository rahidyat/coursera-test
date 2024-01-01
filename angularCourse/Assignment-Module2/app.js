(function(){
    'use strict';

    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);


    ToBuyController.$inject=['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService){
        const buyCtrl = this;

        buyCtrl.items = ShoppingListCheckOffService.getItemsToBuy();        

        buyCtrl.buyItem = function(itemIndex){
            ShoppingListCheckOffService.addItemBought(itemIndex);                        
        };

        buyCtrl.everythingBought = function(){
            return ShoppingListCheckOffService.arrayLength(buyCtrl.items);        
        };
    }


    AlreadyBoughtController.$inject=['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService){
        const boughtCtrl = this;

        boughtCtrl.items = ShoppingListCheckOffService.getItemsBought();        

        boughtCtrl.nothingBought = function(){
            return ShoppingListCheckOffService.arrayLength(boughtCtrl.items);        
        };
    }


    function ShoppingListCheckOffService(){
        const service = this;

        let itemsToBuy = [
            {
                name: "cookies",
                quantity: 5
            },
            {
                name: "super cookies",
                quantity: 15
            },
            {
                name: "cheese cookies",
                quantity: 20
            },
            {
                name: "chocolate cookies",
                quantity: 10
            },
            {
                name: "greentea cookies",
                quantity: 30
            },
        ];

        let itemsBought = [];

        service.getItemsToBuy = function(){
            return itemsToBuy;
        };

        service.getItemsBought = function(){
            return itemsBought;
        };

        service.addItemBought = function(index){
            let item = {
                name: itemsToBuy[index].name,
                quantity: itemsToBuy[index].quantity
            }

            itemsToBuy.splice(index, 1);
            itemsBought.push(item);

            console.log(itemsToBuy);
            console.log(itemsBought);
        };

        service.arrayLength = function(array){
            if(array.length == 0){
                return true;
            }
            else {
                return false;
            }
        };
    }


})();