'use strict';

/**
 * @ngdoc function
 * @name ddAngularApp.controller:AccordianItem
 * @description
 *
 * # AccordianItem
 * Controller of the ddAngularApp
 */
angular.module('ddAngularApp')
.controller('AccordianItem', ['$scope', function($scope) {
	this.components = [
		'HTML5 Boilerplate',
		'AngularJS',
		'Karma'
	];

}])
.directive('ddAccordianItem', [ function() {

	/**
	 * For manipulating the DOM
	 * @param  scope   
	 * @param  element jqLite-wrapped element that matches this directive.
	 * @param  attrs   hash object with key-value pairs of normalized attribute names and their corresponding attribute values.
	 */
	function link(scope, element, attrs) {
		scope.accordianItem = {
			isActive: false,
			name: "",
			description: "",
			keyArray: []
		};

		function setupItemAttributes() {
			var i,
				itemKeyValue,
				itemKeys = Object.keys(scope.item);

			scope.accordianItem.name = scope.item.name;
			scope.accordianItem.description = scope.item.description;

			for (i = 0; i < itemKeys.length;  i++) {
				// ignore the cases we are always looking for
				if (itemKeys[i] === "name" || itemKeys[i] === "description") {
					continue;
				}
				itemKeyValue = {
					key: itemKeys[i],
					value: scope.item[itemKeys[i]]
				};
				scope.accordianItem.keyArray.push(itemKeyValue);
			}
		}

		scope.deleteItem = function() {
			scope.$emit('deleteItem', {item: scope.item});
		};

		scope.editItem = function() {
			scope.$emit('editItem', {item: scope.item});
		};

		scope.selectItem = function() {
			// already active, don't need to select
			if (scope.config.activeItem === scope.item) {
				return;
			}
			scope.config.activeItem = scope.item;
		}


		/**** initial setup ****/
		setupItemAttributes();
	}

	/**
	 * restrict: directive is triggered by element (E) name
	 * scope: isolated scope to $scope.accordianItem only
	 * templateUrl: where we find the template.html
	 * link: for manipulating the DOM
	 */
	return {
		restrict: 'E',
		scope: {
			config: '=config',
			item: '=item'
		},
		templateUrl: 'views/accordian-item.html',
		link: link
	};
}]);