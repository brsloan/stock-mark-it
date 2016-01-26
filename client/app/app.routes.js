angular.module('stock-mark-it')
    .config([
      '$stateProvider',
      '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider){
        $stateProvider
          .state('home', {
            url: '/home',
            templateUrl: 'app/components/home/homeView.html',
            controller: 'MainCtrl'
        })
    
        $urlRouterProvider.otherwise('home');
    }]);