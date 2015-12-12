'use strict';

/**
 * @ngdoc function
 * @name ddAngularApp.controller:SvgLoader
 * @description
 *
 * # SvgLoader
 * Controller of the ddAngularApp
 */
angular.module('ddAngularApp')
.controller('SvgLoader', ['$scope', function($scope) {
	this.components = [
		'HTML5 Boilerplate',
		'AngularJS',
		'Karma'
	];

	$scope.svgLoader = {

	};

}])
.directive('ddSvgLoader', [ function() {
	
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
	 * scope: isolated scope to $scope.svgLoader only
	 * templateUrl: where we find the template.html
	 * link: for manipulating the DOM
	 */
	return {
		restrict: 'E',
		scope: {
			svgLoader: '=info'
		},
		templateUrl: 'views/svg-loader.html',
		link: link
	};
}]);