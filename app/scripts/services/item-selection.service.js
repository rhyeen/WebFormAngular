'use strict';


angular.module('ddAngularApp').factory('itemSelectionService', ['$q', '$http', function($q, $http) {
	var SERVER_ROOT = "/dm",
		GET_ITEM_TYPES_URL = SERVER_ROOT + "/table-selection/all",
		GET_SELECTED_ITEM_TYPE_URL = SERVER_ROOT + "/table-selection/type/",
		GET_ITEMS_OF_TYPE_URL = SERVER_ROOT + "/table-selection/items/";


	return {
		
		getItemTypes: function() {
			var url = GET_ITEM_TYPES_URL;

			var deferred = $q.defer();

			$http.get(url).then(function(data, status) {
				deferred.resolve(data.data);
			}, function(data, status) {
				deferred.reject(data.data);
			});

			return deferred.promise;
		},

		getItemSelectedType: function(itemType) {
			var url = GET_SELECTED_ITEM_TYPE_URL + itemType;

			var deferred = $q.defer();

			$http.get(url).then(function(data, status) {
				deferred.resolve(data.data);
			}, function(data, status) {
				deferred.reject(data.data);
			});

			return deferred.promise;
		},

		getItemsOfType: function(itemType) {
			var url = GET_ITEMS_OF_TYPE_URL + itemType;

			var deferred = $q.defer();

			$http.get(url).then(function(data, status) {
				deferred.resolve(data.data);
			}, function(data, status) {
				deferred.reject(data.data);
			});

			return deferred.promise;
		}
	};
}]);