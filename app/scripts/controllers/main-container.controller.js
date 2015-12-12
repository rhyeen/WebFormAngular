'use strict';

/**
 * @ngdoc function
 * @name ddAngularApp.controller:MainContainer
 * @description
 *
 * # MainContainer
 * Controller of the ddAngularApp
 */
angular.module('ddAngularApp')
.controller('MainContainer', ['$scope', function($scope) {
	this.components = [
		'HTML5 Boilerplate',
		'AngularJS',
		'Karma'
	];

	$scope.mainContainer = {
		view: "selection",
		viewConfig: null,
		itemsWrapper: {
			items: []
		}
	};

}])
.directive('ddMainContainer', [ function() {
	
	/**
	 * For manipulating the DOM
	 * @param  scope   
	 * @param  element jqLite-wrapped element that matches this directive.
	 * @param  attrs   hash object with key-value pairs of normalized attribute names and their corresponding attribute values.
	 */
	function link(scope, element, attrs) {
		scope.statusBarConfig = {
			message: "",
			show: false
		};

		scope.extraContainerConfig = {
			target: "",
			type: "",
			action: null,
			show: false
		};

		scope.$watch('extraContainerConfig.action', extraContainerAction);

		scope.$on('postErrorBanner', function (event, args) {
			if (!args || !args.message) {
				return;
			}
			scope.statusBarConfig.message = args.message;
			scope.statusBarConfig.show = true;
		})

		scope.$on('deleteItem', function (event, args) {
			if (!args || !args.item) {
				return;
			}
			scope.extraContainerConfig.target = args.item.name;
			scope.extraContainerConfig.type = "Delete";
			scope.extraContainerConfig.show = true;
			scope.extraContainerConfig.action = null;
		});

		scope.$on('editItem', function (event, args) {
			editItemInput(args.item);
			scope.statusBarConfig.show = false;
			scope.mainContainer.view = "edit";
		});

		scope.$on('changeView', function (event, args) {
			if (!args || !args.view) {
				return
			}
			scope.statusBarConfig.show = false;
			scope.mainContainer.view = args.view;
			resetTempValueInput();
		});

		scope.$on('createItem', function (event, args) {
			resetItemInput();
			scope.statusBarConfig.show = false;
			scope.mainContainer.view = "create";
		});

		scope.$on('selectItemType', function (event, args) {
			if (!args || !args.itemTypeConfig) {
				return
			}
			scope.mainContainer.viewConfig = args.itemTypeConfig;
		});

		scope.$on('getItemsOfType', function (event, args) {
			if (!args || !args.items) {
				return
			}

			scope.statusBarConfig.show = false;
			scope.mainContainer.view = "overview";
			scope.mainContainer.itemsWrapper.items = args.items;
		});

		function extraContainerAction() {
			if (!scope.extraContainerConfig.action) {
				return;
			}
			if (scope.extraContainerConfig.action === "confirm") {
				// @TODO: remove item
			}
		}

		function resetItemInput() {
			var i, 
				itemInputs = scope.mainContainer.viewConfig.input;

			for (i=0; i < itemInputs.length; i++) {
				itemInputs[i].value = "";
			}
		}

		function resetTempValueInput() {
			var i, 
				itemInputs = scope.mainContainer.viewConfig.input;

			for (i=0; i < itemInputs.length; i++) {
				itemInputs[i].tempValue = null;
			}
		}

		function setTempValueInputToValue() {
			var i, 
				itemInputs = scope.mainContainer.viewConfig.input;

			for (i=0; i < itemInputs.length; i++) {
				itemInputs[i].tempValue = itemInputs[i].value;
			}
		}

		/**
		 * Adds the value of the given item to the config object sent to the create view.
		 */
		function editItemInput(item) {
			var i, j,
				itemInputs = scope.mainContainer.viewConfig.input,
				itemKeys;

			if (!item) {
				resetItemInput();
			}

			itemKeys = Object.keys(item);
			for (i = 0; i < itemKeys.length; i++) {
				for (j = 0; j < itemInputs.length; j++) {
					if (itemInputs[j].key === itemKeys[i]) {
						itemInputs[j].value = item[itemKeys[i]];
					}
				}
			}

			setTempValueInputToValue();
		}
	}

	/**
	 * restrict: directive is triggered by element (E) name
	 * scope: isolated scope to $scope.mainContainer only
	 * templateUrl: where we find the template.html
	 * link: for manipulating the DOM
	 */
	return {
		restrict: 'E',
		templateUrl: 'views/main-container.html',
		link: link
	};
}]);