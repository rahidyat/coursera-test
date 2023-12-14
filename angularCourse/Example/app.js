(function () {
'use strict';

angular.module('myFirstApp', [])

.controller('MyFirstController', function ($scope) {
	$scope.name = "Rahmat";
	$scope.sayHello = function () {
		return "Hello Mother Fucker!";
	};
});

angular.module('calculator', [])

.controller('calculatorController', function($scope) {
	$scope.name2 = "";
	$scope.totalValue = 0;

	$scope.displayNumeric = function () 
	{
		var totalNameValue = calculateNumericForString($scope.name2);
		$scope.totalValue = totalNameValue;
	  };
	
	
	  function calculateNumericForString(string) {
		var totalStringValue = 0;
		for (var i = 0; i < string.length; i++) {
		  totalStringValue += string.charCodeAt(i);
		}
	
		return totalStringValue;
	  }
	
});

})();
