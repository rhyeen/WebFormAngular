'use strict';


angular.module('ddAngularApp').factory('tableQueryService', ['$q', '$http', function($q, $http) {
	var SERVER_ROOT = "/dm",
		CREATE_ITEM_URL = SERVER_ROOT + "/table-query/create/",
		CHECK_UNIQUE_URL = SERVER_ROOT + "/table-query/is-unique/",
		EDIT_ITEM_URL = SERVER_ROOT + "/table-query/edit/",
		DELETE_ITEM_URL = SERVER_ROOT + "/table-query/delete/";


	return {
		checkUnique: function(table, inputKey, inputValue) {
			var url = CHECK_UNIQUE_URL + table;

			var deferred = $q.defer();

			var data = {
				key: inputKey,
				value: inputValue
			};

			$http.post(url, data).then(function(data, status) {
				deferred.resolve(data.data);
			}, function(data, status) {
				deferred.reject(data.data);
			});

			return deferred.promise;
		},


		addItem: function(table, input) {
			var url = CREATE_ITEM_URL + table;

			var deferred = $q.defer();

			var data = {
				input: input
			};

			$http.post(url, data).then(function(data, status) {
				deferred.resolve(data.data);
			}, function(data, status) {
				deferred.reject(data.data);
			});

			return deferred.promise;
		},

		editItem: function(table, input) {
			var url = EDIT_ITEM_URL + table;

			var deferred = $q.defer();

			var data = {
				input: input
			};

			$http.post(url, data).then(function(data, status) {
				deferred.resolve(data.data);
			}, function(data, status) {
				deferred.reject(data.data);
			});

			return deferred.promise;
		},

		deleteItem: function(table, itemName) {
			var url = DELETE_ITEM_URL + table;

			var deferred = $q.defer();

			var data = {
				itemName: itemName
			};

			$http.post(url, data).then(function(data, status) {
				deferred.resolve(data.data);
			}, function(data, status) {
				deferred.reject(data.data);
			});

			return deferred.promise;
		}
	};
}]);