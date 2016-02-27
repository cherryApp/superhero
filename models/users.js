// Mongodb adatmodell.
// Kezeli a megadott táblát.
var db,
    Users;
function setConnection( mongodb ) {
    db = mongodb;
    setModel();
}

// Kollekció modell.
function setModel() {

    Users = db.model( 'Users', {
        name: String,
        email: String,
        phone: String,
        address: String,
        role: Number,
        meta: {
            birthsday: Date,
            hobby: String
        }
    }, 'Users' );

}

// Adatok olvasása a kollekcióból.
function read( where, callBack ) {
    Users.find( where, function( err, data ) {
        if ( err ) {
            console.error( 'Error in query: ', where );
            callBack( {} );
        } else {
            callBack( data );
        }
    });
}

// Új dokumentum beszúrása az adatbázisba.
function create( document, callBack ) {

    var user = new Users( document );
    user.save( function( err ) {
        if ( err ) {
            console.error( "Save error: ", err );
            callBack( {} );
        } else {
            callBack( user );
        }
    });

}

// Publikus elemek.
module.exports = {
    setConnection: setConnection,
    read: read,
    create: create
};
