superhero.controller( "userController", [
    "$scope",
    "userService",
    "userFactory",
    function( $scope, userService, userFactory ) {

        // Felhasználók.
        $scope.users = [];
        $scope.ths = ['#', 'name', 'email', 'phone', 'actions'];

        // Felhasználók lekérése.
        userService.getAll()
            .then( function( userData ) {
                $scope.users = userData;
            }, function( err ) {
                console.error( "Error while getting user data: ", err );
            });

        // Adatok frissítése.
        $scope.updateRecord = function( row ) {
            userFactory.saveUser(row)
                .then( function() {
                    alert( "User saved!" );
                });
        };

        // Adatsor törlése.
        $scope.deleteUser = function( row ) {
            userFactory.deleteUser( row )
                .then( function( deleted ) {
                    if ( deleted.ok ) {
                        alert( "User deleted: " + row.name );
                    } else {
                        alert( "Error, not deleted: " + row.name );
                    }
                });
        };

    }
]);
