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

.controller('RestauranteCtrl', function(restauranteFactory, $scope, $ionicModal) {
    $scope.busca = {valor : ""};
    
    restauranteFactory.listarRestaurante(function(lista){
        $scope.restaurantes = lista;
    });
    
    /**
     * Pesquisa equivalente ao like do SQL, quando tiver 3 ou mais caracteres.
     * Se busca for vazia, lista todos.
     * também ignora case.
     */
    $scope.$watch('busca.valor', function(){
        if ($scope.busca.valor.length < 3 || $scope.busca.valor=="") {
            $scope.restaurantes = restauranteFactory.getLista();
            return;
        }
        
        restauranteFactory.filtrar('nome', $scope.busca.valor.toLowerCase(), function(lista){
            $scope.restaurantes = lista;
        });
    }, true);
    
    // MODAL
    $ionicModal.fromTemplateUrl('templates/detalheRestaurante.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });
    
    $scope.mostraRestaurante = function(idx) {
        restauranteFactory.getGeyById(idx, function(restaurante){
            $scope.restaurante = restaurante;
            $scope.modal.show();
        });
    };
    
    $scope.fecharModal = function() {
        $scope.modal.hide();
    };
})

.controller('CategoriaCtrl', function(categoriaFactory, $scope, $stateParams) {
    categoriaFactory.listarCategoria(function(lista){
        $scope.categorias = lista;
    });
});