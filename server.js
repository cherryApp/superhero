// Beolvassuk a szükséges csomagokat.
var express = require('express');
var fs = require('fs');
var mongoose = require( 'mongoose' );

// Kapcsolódás az adatbázishoz.
mongoose.connect( 'mongodb://localhost/superhero' );

// itf tábla model.
var Users = require('./models/users');
Users.setConnection( mongoose );
//Users.create( {
//    name: 'John Doe',
//    email: 'john.doe@gmail.com',
//    phone: '+3614563214',
//    address: '1122 Budapest, Kiss u. 10.',
//    role: 3,
//    meta: {
//        birthsday: new Date( '1994-07-04' ),
//        hobby: 'golf'
//    }
//}, function( saved ) {
//    console.info( "Saved model: ", saved );
//});
Users.first( { name: new RegExp('doe', 'i') }, function( user ) {
    if ( user !== null ) {
        console.info( "User name: ", user.name );
    } else {
        console.info( "No user!" );
    }

});

// Globális változók.
var port = 3333;
var staticDir = 'build';

// Létrehozunk egy express szerver példányt.
var app = express();
app.set('view engine', 'jade');
app.set('views', './src/view')

// Statikus fájlok.
app.use(express.static(staticDir));

app.use(function (req, res, next) {
  if (req.headers['x-requested-with'] == 'XMLHttpRequest') {
    res.send(JSON.stringify({
      'hello': 'world'
    }));
  } else {
    next();
  }
});

// Definiáljuk a szerver működését.
app.get('/', function (req, res) {
  handleUsers(req, res, false, function (allUsers) {
    res.render('index', {
      title: 'ItFactory Web Superhero',
      message: 'Yes, it is!',
      users: allUsers
    });
  });
});

// Falhasználó modell.
function handleUsers(req, res, next, callBack) {
  fs.readFile('./users.json', 'utf8', function (err, data) {
    if (err) throw err;

    // var path = req.url.split( '/' );
    var users = JSON.parse(data);

    if (callBack) {
      callBack(users);
      return;
    }

    var _user = {};

    // Ha nem kaptunk id-t.
    if (!req.params.id) {
      _user = users;
    } else {
      for (var k in users) {
        if (req.params.id == users[k].id) {
          _user = users[k];
        }
      }
    }

    res.send(JSON.stringify(_user));
  });
}

// Felhasználók beolvasása.
app.get('/users/:id*?', function (req, res) {
  console.log(req.url);
  handleUsers(req, res);
});


// Megadjuk hogy a szerver melyik portot figyelje.
app.listen(port);

console.log("Server running in localhost:" + port);
