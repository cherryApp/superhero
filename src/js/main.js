var superhero = angular.module( "superhero", [] );

superhero.controller( "nameController", [ "$scope", function( $scope ) {
    $scope.yourName = "Joe";
}]);
