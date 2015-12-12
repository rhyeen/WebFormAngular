'use strict';

/**
 * @ngdoc function
 * @name ddAngularApp.controller:OverviewContainer
 * @description
 *
 * # OverviewContainer
 * Controller of the ddAngularApp
 */
angular.module('ddAngularApp')
.controller('OverviewContainer', ['$scope', function($scope) {
	this.components = [
		'HTML5 Boilerplate',
		'AngularJS',
		'Karma'
	];

	$scope.overviewContainer = {
		
	};

}])
.directive('ddOverviewContainer', [ function() {

	/**
	 * For manipulating the DOM
	 * @param  scope   
	 * @param  element jqLite-wrapped element that matches this directive.
	 * @param  attrs   hash object with key-value pairs of normalized attribute names and their corresponding attribute values.
	 */
	function link(scope, element, attrs) {
		scope.accordianItems = scope.itemsWrapper.items;

		scope.accordianConfig = {
			activeItem: scope.accordianItems[0]
		}

		scope.createItem = function() {
			scope.$emit('createItem');
		};

		scope.changeViewToCategories = function() {
			scope.$emit('changeView', {view: "selection"});
		}
	}

	/**
	 * restrict: directive is triggered by element (E) name
	 * scope: isolated scope to $scope.overviewContainer only
	 * templateUrl: where we find the template.html
	 * link: for manipulating the DOM
	 */
	return {
		restrict: 'E',
		scope: {
			config: '=config',
			itemsWrapper: '=itemsWrapper'
		},
		templateUrl: 'views/overview-container.html',
		link: link
	};
}]);