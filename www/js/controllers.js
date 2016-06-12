angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('RestauranteCtrl', function($scope, $ionicModal, $http) {
    var restaurantes = [];
 
  
    $scope.listar = function() {
        $scope.busca = {valor : ""};
        
        $http.get('http://127.0.0.1:1337/restaurante').then(function(resp){
            $scope.restaurantes = resp.data;
            restaurantes = resp.data;
        }, function(err){
            console.error('ERR', err);
        });
        
        /**
         * Pesquisa equivalente ao like do SQL, quando tiver 3 ou mais caracteres.
         * Se busca for vazia, lista todos
         */
        $scope.$watch('busca.valor', function(){
            if ($scope.busca.valor.length < 3 && $scope.busca.valor!="") return;
            
            var resultadoFiltro = restaurantes.filter(function(e){
               return e.nome.indexOf($scope.busca.valor) > -1;
            });
            
            $scope.restaurantes = resultadoFiltro;
        }, true);
    };
    
    $ionicModal.fromTemplateUrl('templates/detalheRestaurante.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });
    
    $scope.mostraRestaurante = function(idx) {
        console.log(restaurantes[idx])
        $scope.restaurante = restaurantes[idx];
        $scope.modal.show();
    };
    
    $scope.fecharModal = function() {
        $scope.modal.hide();
    };
})

.controller('CategoriaCtrl', function($scope, $stateParams, $http) {
    $http.get('http://127.0.0.1:1337/categoria').then(function(resp){
        $scope.categorias = resp.data;
	}, function(err){
		console.error('ERR', err);
	});
});