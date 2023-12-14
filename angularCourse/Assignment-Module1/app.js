(function () {
'use strict';

angular.module('lunchCheck', [])
.controller('lunchCheckController', lunchCheckController);

lunchCheckController.$inject = ['$scope'];

function lunchCheckController($scope) {
    $scope.lunchItems = '';
    $scope.messageStyle = {'color': 'red'};
    $scope.textBoxStyle = {'border-color' : 'black'};
    $scope.checkLunch = function () {
        var numitems = $scope.lunchItems
        .split('')
        .filter(x => x.trim() != '')
        .length;

        if (numitems ==0) {
            $scope.message = 'Please Enter Data First';
            $scope.messageStyle = {'color':'red'};
            $scope.textBoxStyle = {'border-color':'red'};
        }
        else
        if (numitems <= 3) {
            $scope.message = 'Enjoy!';
            $scope.messageStyle = {'color':'green'};
            $scope.textBoxStyle = {'border-color':'green'};
        }
        else { 
            $scope.message = 'Too much!';
            $scope.messageStyle = {'color':'green'};
            $scope.textBoxStyle = {'border-color':'green'};
        }
   }

}
 
})();
