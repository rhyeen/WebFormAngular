'use strict';

/**
 * @ngdoc function
 * @name ddAngularApp.controller:StatusBar
 * @description
 *
 * # StatusBar
 * Controller of the ddAngularApp
 */
angular.module('ddAngularApp')
.controller('StatusBar', ['$scope', function($scope) {
	this.components = [
		'HTML5 Boilerplate',
		'AngularJS',
		'Karma'
	];

	$scope.statusBar = {

	};

}])
.directive('ddStatusBar', [ function() {
	
	/**
	 * For manipulating the DOM
	 * @param  scope   
	 * @param  element jqLite-wrapped element that matches this directive.
	 * @param  attrs   hash object with key-value pairs of normalized attribute names and their corresponding attribute values.
	 */
	function link(scope, element, attrs) {
		
	}

	/**
	 * restrict: directive is triggered by element (E) name
	 * scope: isolated scope to $scope.config only
	 * templateUrl: where we find the template.html
	 * link: for manipulating the DOM
	 */
	return {
		restrict: 'E',
		scope: {
			config: '=config'
		},
		templateUrl: 'views/status-bar.html',
		link: link
	};
}]);