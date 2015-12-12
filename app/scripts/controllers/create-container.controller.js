'use strict';

/**
 * @ngdoc function
 * @name ddAngularApp.controller:CreateContainer
 * @description
 *
 * # CreateContainer
 * Controller of the ddAngularApp
 */
angular.module('ddAngularApp')
.controller('CreateContainer', ['$scope', function($scope) {
	this.components = [
		'HTML5 Boilerplate',
		'AngularJS',
		'Karma'
	];

	$scope.createContainer = {
		
	};

}])
.directive('ddCreateContainer', ['tableQueryService', function(tableQueryService) {

	/**
	 * For manipulating the DOM
	 * @param  scope   
	 * @param  element jqLite-wrapped element that matches this directive.
	 * @param  attrs   hash object with key-value pairs of normalized attribute names and their corresponding attribute values.
	 */
	function link(scope, element, attrs) {
		scope.addedAttributes = {

		};

		/**
		 * Add the given extraAttribute to the input list, right after the parent attribute's index.
		 */
		function updateAttributes(parentAttributeIndex, extraAttributes, isExpandedAttribute) {
			var i, newIndex, tempAttr, j, keys, tempObj;
			// remove any already expanded attribute under the same parent attribute
			if (isExpandedAttribute && scope.config.input[parentAttributeIndex + 1].isChildAttribute) {
				scope.config.input.splice(parentAttributeIndex + 1, 1);
				// recursively remove all expanded attributes
				updateAttributes(parentAttributeIndex, extraAttributes, isExpandedAttribute);
				return;
			}
			for (i = 0; i < extraAttributes.length; i++) {
				// add to the input array right after parentAttribute
				newIndex = parentAttributeIndex + 1 + i;
				extraAttributes[i].isChildAttribute = true;

				// expanding attributes
				if (isExpandedAttribute) {
					scope.config.input.splice(newIndex, 0, extraAttributes[i]);
				}
				// otherwise, we are adding attributes and want to have unique keys for each added attribute
				else if (!scope.addedAttributes[extraAttributes[i].key]) {
					scope.addedAttributes[extraAttributes[i].key] = {
						count: 0,
						originalKey: extraAttributes[i].key
					}
				}
				// generate a new attribute with a unique key based on the addAttribute template
				if (scope.addedAttributes[extraAttributes[i].key]) {
					tempAttr = scope.addedAttributes[extraAttributes[i].key];
					tempAttr.count++;

					// copy the attribute to avoid changes to the reference object
					tempObj = {};
					keys = Object.keys(extraAttributes[i]);
					for (j = 0; j < keys.length; j++) {
						tempObj[keys[j]] = extraAttributes[i][keys[j]];
					}
					tempObj.key = tempAttr.originalKey + " " + tempAttr.count;
					scope.config.input.splice(newIndex, 0, tempObj);
				}
			}
		}

		scope.$on('addAttribute', function (event, args) {
			var i;
			if (!args || !args.addAttributeInput) {
				console.log("ERROR: addAttribute params not set correctly");
				return;
			}
			// find the right attribute
			for (i = 0; i < scope.config.input.length; i++) {
				if (scope.config.input[i].key === args.addAttributeInput.key) {
					// want the parent to be the previous attribute 
					// since we want the "add attribute" to always be below the newly added attributes
					updateAttributes(i - 1, args.addAttributeInput.addAttribute, false);
					return;
				}
			}
		});

		scope.$on('checkRequirements', function (event, args) {
			var input;
			if (!args || !args.input) {
				console.log("ERROR: addAttribute params not set correctly");
				return;
			}
			checkInputRequirements(args.input);			
		});

		function checkInputRequirements(input) {
			input.confirmed = null;
			input.error = null;
			if (!checkRequired(input)) {
				return false;
			}
			if (input.type === "textunique") {
				return checkUnique(input);
			}
			else if (input.type === "dropdowndefined") {
				return checkDefinedDropdown(input);
			}
			else if (input.type === "dropdownsuggested") {
				return true;
			}
			else if (input.type === "textarea") {
				return true;
			}
			else if (input.type === "number" || input.type === "negnumber" || input.type === "bignumber") {
				return checkIfNumber(input);
			}
			else if (input.type === "dicenumber") {
				return checkIfDiceNumber(input);
			}

		}

		function checkIfNumber(input) {
			var number = parseInt(input.tempValue);
			if(isNaN(number)) {
				input.error = "Input must be a number";
				return false;
			}
			if (input.type === "number") {
				if (number < 0 || number > 10000) {
					input.error = "Input must be a number 0-10000";
					return false;
				}
			}
			else if (input.type === "bignumber") {
				if (number < 0 || number > 1000000000) {
					input.error = "Input must be a number 0-1000000000";
					return false;
				}
			}
			else if (input.type === "negnumber") {
				if (number < -10000 || number > 10000) {
					input.error = "Input must be a number 0-10000";
					return false;
				}
			}
			else {
				console.log("create-container.checkIfNumber: unexpected state");
				input.error = "ERROR: unexpected state";
				return false;
			}

			input.error = null;
			return true;
		}

		scope.changeToOverview = function() {
			scope.$emit('changeView', {view: "overview"});
		};

		/**
		 * Checks if the given key of the item is unqiue among all the items in the table
		 */
		function checkUnique(input) {
			tableQueryService.checkUnique(scope.config.title.singular, input.key, input.tempValue)
			.then(function(data) {
				input.error = null;
				input.confirmed = true;
				// does not matter, is async so we can't return true or false here anyway
				return;
			}, function(error) {
				if (error === "ERROR: not unique") {
					input.error = "Input must be unique";
					return;
				}
				input.error = null;
				scope.$emit('postErrorBanner', {message: error});
			});
			// just assume true, we will check again once submitted
			return true;
		}

		function checkRequired(input) {
			// not set
			if (input.required && !input.tempValue) {
				input.error = "Input is required";
				return false;
			}
			// set
			input.error = null;
			return true;
		}

		/**
		 * Checks whether an input value is from the defined dropdown list
		 */
		function checkDefinedDropdown(input) {
			var i;

			// if it isn't required and doesn't exist
			if (!checkRequired(input) && !input.tempValue) {
				input.confirmed = false;
				return false;
			}
			// UNEXPECTED STATE: if the dropdown has no items to pick from
			if (!input.dropdownItems || !input.dropdownItems.length) {
				console.log("create-container.checkDefinedDropdown: unexpected state");
				input.error = "UNEXPECTED STATE";
				input.confirmed = false;
				return false;
			}
			// check all entries in dropdown to make sure it exists
			for (i = 0; i < input.dropdownItems.length; i++) {
				if (input.dropdownItems[i] === input.tempValue) {
					input.confirmed = true;
					input.error = null;
					// is it an item that adds additional input
					checkAdditionalInput(input.tempValue, input);
					return true;
				}
			}
			input.error = "Must be an item from the dropdown";
			input.confirmed = false;
			return false;
		}

		function checkAdditionalInput(key, input) {
			if (!input.moreAttributes || !input.moreAttributes[key]) {
				return false;
			}
			// we need more input attributes
			expandAttribute(input, input.moreAttributes[key]);
		}


		function expandAttribute (parentAttribute, childAttributes) {
			var i;
			if (!parentAttribute || !childAttributes) {
				console.log("create-container.expandAttribute: unexpected state");
				return;
			}
			// find the right attribute
			for (i = 0; i < scope.config.input.length; i++) {
				if (scope.config.input[i].key === parentAttribute.key) {
					updateAttributes(i, childAttributes, true);
					return;
				}
			}
		};

		/**
		 * Formats the input for optimized information needed for sending to back-end.
		 */
		function formatInput(input) {
			var returnArray;
			if (!input || !input.length) {
				console.log("create-container.formatInput: unexpected state");
				return null;
			}

			// [x], x = {key, originalValue, value}
			// if scope.view === "edit", keep scope.input[x].value as originalValue
			// keep scope.input[x].tempValue as value
			return returnArray;
		}


		/**
		 * Run a sweep of all inputs to see if they bring back an error, if so return false.
		 * Otherwise, return true.
		 */
		function checkErrors() {
			var i, errorFree = true;

			for (i = 0; i < scope.config.input.length; i++) {
				// if we haven't found any errors, such to make sure we are still error free
				if (errorFree) {
					errorFree =	checkInputRequirements(scope.config.input[i]);
				}
				// if we've already found an error, just keep checking for errors so view shows correctly
				else {
					checkInputRequirements(scope.config.input[i]);
				}
			}

			return errorFree;
		}

		scope.submit = function() {
			if(!checkErrors()) {
				return;
			}

			var formattedInput = formatInput(scope.config.input);
			if (scope.view === "create") {
				tableQueryService.addItem(scope.config.title.singular, formattedInput)
				.then(function(data) {

				}, function(error) {
					if (error === "ERROR: not unique") {
						return;
					}
					scope.$emit('postErrorBanner', {message: error});
				});
			}
			else if (scope.view === "edit") {
				tableQueryService.addItem(scope.config.title.singular, formattedInput)
				.then(function(data) {

				}, function(error) {
					if (error === "ERROR: not unique") {
						return;
					}
					scope.$emit('postErrorBanner', {message: error});
				});
			}
			else {
				console.log("create-container.submit: unexpected state");
				return;
			}
		};
	}

	/**
	 * restrict: directive is triggered by element (E) name
	 * scope: isolated scope to $scope.createContainer only
	 * templateUrl: where we find the template.html
	 * link: for manipulating the DOM
	 */
	return {
		restrict: 'E',
		scope: {
			config: '=config',
			view: '=view'
		},
		templateUrl: 'views/create-container.html',
		link: link
	};
}]);