angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'home',
			controller: 'MainController'
		})

		.when('/index', {
			templateUrl: 'home',
			controller: 'NerdController'
		})

		.when('/about', {
			templateUrl: 'about',
			controller: 'GeekController'
		})
		.when('/gallery',{
			templateUrl:'gallery',
			controller: ''
		})
		.when('/menu',{
			templateUrl: 'menu',
			controller:''
		})
		.when('/blog',{
			templateUrl: 'blog',
			controller: ''
		})
		.when('/contact',{
			templateUrl: 'contact',
			controller: ''
		});

	$locationProvider.html5Mode({
		enabled:true,
		requireBase: false
	});

}]);