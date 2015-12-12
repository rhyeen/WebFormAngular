'use strict';

/**
 * @ngdoc overview
 * @name ddAngularApp
 * @description
 * # ddAngularApp
 *
 * Main module of the application.
 */
angular
  .module('ddAngularApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .otherwise({
          redirectTo: '/'
      });
  });
