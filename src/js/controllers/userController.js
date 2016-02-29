superhero.controller( "userController", [
    "$scope",
    "userService",
    function( $scope, userService ) {

        // Felhasználók.
        $scope.users = [];
        $scope.ths = ['#', 'name', 'email', 'phone'];

        // Felhasználók lekérése.
        userService.getAll()
            .then( function( userData ) {
                $scope.users = userData;
            }, function( err ) {
                console.error( "Error while getting user data: ", err );
            });

    }
]);
