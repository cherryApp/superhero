// Userek lekérése.
$.getJSON('users', function (users) {
    console.log('all users', users);
});

// Check user.
function checkUser( user ) {
    if ( user.role > 4 ) {
        return true;
    } else {
        return false;
    }
}
