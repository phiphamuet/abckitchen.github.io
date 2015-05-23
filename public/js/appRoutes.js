angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'home/lazyload',
			controller: 'MainController',
			data:{
				requireLogin: false
			}
		})

		.when('/index', {
			templateUrl: 'home/lazyload',
			controller: 'MainController',
			data:{
				requireLogin: false
			}
		})

		.when('/news', {
			templateUrl: 'news/lazyload',
			controller: '',
			data:{
				requireLogin: false
			}
		})
		.when('/reviews',{
			templateUrl:'reviews/lazyload',
			controller: '',
			data:{
				requireLogin: false
			}
		})
		//.when('/reservations',{
		//	templateUrl:'reservations/lazyload',
		//	controller: ''
		//})
		.when('/menu',{
			templateUrl: 'menu/lazyload',
			controller:'',
			data:{
				requireLogin: false
			}
		})
		.when('/contact',{
			templateUrl: 'contact/lazyload',
			controller: '',
			data:{
				requireLogin: false
			}
		})
		.when('/home',{
			templateUrl: 'home/lazyload',
			controller: '',
			data:{
				requireLogin: false
			}
		})
		.when('/login',{
			templateUrl: 'login/lazyload',
			controller:'LoginController',
			data:{
				requireLogin: false
			}
		})
		.when('/user',{
			templateUrl: 'user/lazyload',
			controller:	'UserController',
			data:{
				requireLogin: true
			}
		})
		.when('/admin',{
			templateUrl: 'admin/lazyload',
			controller:	'',
			data:{
				requireLogin: false
			}
		})
		.when('/logout',{
			controller:'LogoutController'
		});

	$locationProvider.html5Mode({
		enabled:true,
		requireBase: false
	});

}]);