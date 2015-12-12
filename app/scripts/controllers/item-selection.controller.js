'use strict';

/**
 * @ngdoc function
 * @name ddAngularApp.controller:ItemSelection
 * @description
 *
 * # ItemSelection
 * Controller of the ddAngularApp
 */
angular.module('ddAngularApp')
.controller('ItemSelection', ['$scope', function($scope) {
	this.components = [
		'HTML5 Boilerplate',
		'AngularJS',
		'Karma'
	];
	$scope.itemSelection = {
		
	};

}])
.directive('ddItemSelection', ['itemSelectionService', function(itemSelectionService) {

	/**
	 * For manipulating the DOM
	 * @param  scope   
	 * @param  element jqLite-wrapped element that matches this directive.
	 * @param  attrs   hash object with key-value pairs of normalized attribute names and their corresponding attribute values.
	 */
	function link(scope, element, attrs) {
		scope.itemTypes = [];

		scope.getItemTypes = function() {
			itemSelectionService.getItemTypes().then(function(data) {
				scope.itemTypes = data;
			}, function(error) {
				//console.log(error);
			});
		};

		scope.selectItem = function(itemType) {
			itemSelectionService.getItemSelectedType(itemType.value).then(function(data) {
				scope.$emit('selectItemType', {itemTypeConfig: data});
			}, function(error) {
				//console.log(error);
			});

			itemSelectionService.getItemsOfType(itemType.value).then(function(data) {
				scope.$emit('getItemsOfType', {items: data});
			}, function(error) {
				//console.log(error);
			});
		};

		/**** INITIAL SETUP ****/
		scope.getItemTypes();
	}

	/**
	 * restrict: directive is triggered by element (E) name
	 * scope: isolated scope to $scope.itemSelection only
	 * templateUrl: where we find the template.html
	 * link: for manipulating the DOM
	 */
	return {
		restrict: 'E',
		templateUrl: 'views/item-selection.html',
		link: link
	};
}]);