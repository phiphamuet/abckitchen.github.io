angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'home/lazyload',
			controller: 'MainController'
		})

		.when('/index', {
			templateUrl: 'home/lazyload',
			controller: 'MainController'
		})

		.when('/news', {
			templateUrl: 'news/lazyload',
			controller: ''
		})
		.when('/reviews',{
			templateUrl:'reviews/lazyload',
			controller: ''
		})
		.when('/reservations',{
			templateUrl:'reservations/lazyload',
			controller: ''
		})
		.when('/menu',{
			templateUrl: 'menu/lazyload',
			controller:''
		})
		.when('/contact',{
			templateUrl: 'contact/lazyload',
			controller: ''
		})
		.when('/home',{
			templateUrl: 'home/lazyload',
			controller: ''
		})
		.when('/login',{
			templateUrl: 'login/lazyload',
			controller:''
		})
		.when('/user',{
			templateUrl: 'user/lazyload',
			controller:	'UserController'
		});

	$locationProvider.html5Mode({
		enabled:true,
		requireBase: false
	});

}]);