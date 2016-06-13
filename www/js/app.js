// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.factory('loginFactory', function($http) {
   var self = {};
   self.user = {};
   
   self.loginFB = function(cb) {
        window.facebookConnectPlugin.browserInit('1593633617615972');
        window.facebookConnectPlugin.login(["public_profile"], function(resp){
            console.log(resp);
            cb(resp);
        });
   };
   
   self.signup = function() {
       var params = JSON.stringify({});
       $http.post('http://127.0.0.1:1337/auth/signup', params).then(function(resp){
            self.user = resp.data;
        }, function(err){
            console.error('ERR', err);
        });
   };
   
   self.login = function(user, pass, cb) {
       var params = JSON.stringify({
            "password": user,
            "email": pass
       });
        
       $http.post('http://127.0.0.1:1337/auth/signin', params).then(function(resp){
            self.user = resp.data;
            cb(self.user);
        }, function(err){
            console.error('ERR', err);
        });
   };
   
   return self; 
})

.factory('restauranteFactory', function($http) {
    var self = {};
    self.restaurantes = [];
    
    self.listarRestaurante = function(cb) {
        $http.get('http://127.0.0.1:1337/restaurante').then(function(resp){
            self.restaurantes = resp.data;
            cb(self.restaurantes);
        }, function(err){
            console.error('ERR', err);
        });
    };
    
    self.filtrar = function(campo, valor, cb) { 
        var resultado = self.restaurantes.filter(function(e){
            return e[campo].toLowerCase().indexOf(valor.toLowerCase()) > -1;
        });
        cb(resultado);
    };
    
    self.getGeyById = function(id, cb) {
        // Filtra pelo id e pega o primeiro elemento
        cb(self.restaurantes.filter(function(e){
            return e['id'] == id;
        })[0]);
    };
    
    self.getLista = function() {
        return self.restaurantes;
    };
    
	return self;
})


.factory('categoriaFactory', function($http) {
    var self = {};
    self.categorias = [];
    
    self.listarCategoria = function(cb) {
        $http.get('http://127.0.0.1:1337/categoria').then(function(resp){
            self.categorias = resp.data;
            cb(self.categorias);
        }, function(err){
            console.error('ERR', err);
        });
    };
    
    self.getLista = function() {
        return self.categorias;
    };
    
    return self;
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.categoria', {
    url: '/categoria',
    views: {
      'menuContent': {
        templateUrl: 'templates/listaCategoria.html',
        controller: 'CategoriaCtrl'
      }
    }
  })
    .state('app.restaurante', {
      url: '/restaurante',
      views: {
        'menuContent': {
          templateUrl: 'templates/listaRestaurante.html',
          controller: 'RestauranteCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/resturante/:resturanteId',
    views: {
      'menuContent': {
        templateUrl: 'templates/detalheRestaurante.html',
        controller: 'RestauranteCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/restaurante');
});

