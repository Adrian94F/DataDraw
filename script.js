// script.js

// create the module and name it drawApp
// also include ngRoute for all our routing needs
var drawApp = angular.module('drawApp', ['ngRoute']);

// configure our routes
drawApp.config(function($routeProvider, $locationProvider) {
	$routeProvider
		// route for the home page
		.when('/', {
			templateUrl : 'pages/home.html',
			controller  : 'mainController'
		})

		// route for the about page
		.when('/about', {
			templateUrl : 'pages/about.html',
			controller  : 'aboutController'
		})

		// route for the contact page
		.when('/draw', {
			templateUrl : 'pages/draw.html',
			controller  : 'contactController'
		});

	$locationProvider.html5Mode(true);
});

// create the controller and inject Angular's $scope
drawApp.controller('mainController', function($scope) {

	// create a message to display in our view
	$scope.message = 'Everyone come and see how good I look!';
});

drawApp.controller('aboutController', function($scope) {

	$scope.message = 'Look! I am an about page.';
});

drawApp.controller('contactController', function($scope) {
	
	$scope.message = 'Contact us! JK. This is just a demo.';
});