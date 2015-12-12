'use strict';

/**
 * @ngdoc function
 * @name ddAngularApp.controller:ExtraContainer
 * @description
 *
 * # ExtraContainer
 * Controller of the ddAngularApp
 */
angular.module('ddAngularApp')
.controller('ExtraContainer', ['$scope', function($scope) {
	this.components = [
		'HTML5 Boilerplate',
		'AngularJS',
		'Karma'
	];

	$scope.extraContainer = {

	};

}])
.directive('ddExtraContainer', [ function() {
	
	/**
	 * For manipulating the DOM
	 * @param  scope   
	 * @param  element jqLite-wrapped element that matches this directive.
	 * @param  attrs   hash object with key-value pairs of normalized attribute names and their corresponding attribute values.
	 */
	function link(scope, element, attrs) {
		scope.confirm = function() {
			scope.config.show = false;
			scope.config.action = "confirm";
		}

		scope.cancel = function() {
			scope.config.show = false;
		}
	}

	/**
	 * restrict: directive is triggered by element (E) name
	 * scope: isolated scope to $scope.extraContainer only
	 * templateUrl: where we find the template.html
	 * link: for manipulating the DOM
	 */
	return {
		restrict: 'E',
		scope: {
			config: '=config'
		},
		templateUrl: 'views/extra-container.html',
		link: link
	};
}]);