'use strict';

/**
 * @ngdoc function
 * @name ddAngularApp.controller:CreateInput
 * @description
 *
 * # CreateInput
 * Controller of the ddAngularApp
 */
angular.module('ddAngularApp')
.controller('CreateInput', ['$scope', function($scope) {
	this.components = [
		'HTML5 Boilerplate',
		'AngularJS',
		'Karma'
	];

}])
.directive('ddCreateInput', [ function() {

	/**
	 * For manipulating the DOM
	 * @param  scope   
	 * @param  element jqLite-wrapped element that matches this directive.
	 * @param  attrs   hash object with key-value pairs of normalized attribute names and their corresponding attribute values.
	 */
	function link(scope, element, attrs) {
		scope.createInput = {
			showTooltip: false
		};


		//console.log(scope.config);

		scope.toggleTooltip = function() {
			scope.createInput.showTooltip = !scope.createInput.showTooltip;
		};

		scope.checkRequirements = function() {
			scope.$emit("checkRequirements", {input: scope.config});
		};

		scope.addAttributes = function() {
			scope.$emit("addAttribute", {addAttributeInput: scope.config});
		};
	}

	/**
	 * restrict: directive is triggered by element (E) name
	 * scope: isolated scope to $scope.createInput only
	 * templateUrl: where we find the template.html
	 * link: for manipulating the DOM
	 */
	return {
		restrict: 'E',
		scope: {
			config: '=config'
		},
		templateUrl: 'views/create-input.html',
		link: link
	};
}]);