var express = require('express');
var path = require('path');
var cookieParser = require( 'cookie-parser' );
var favicon = require('serve-favicon');
var ExpressHandleBars  = require('express-handlebars');
var bodyParser = require( 'body-parser' );

// instantiate application
var app = express();
var port = process.env.PORT || 5000;

// Exclude static assets from url routing
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// Register HandleBars as templating engine
app.engine('handlebars', ExpressHandleBars({defaultLayout: ''}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use( favicon( __dirname + '/public/images/favicon.ico' ) );
app.use( cookieParser() );


// send app to router
require('./routes')(app);

// Start the server
app.listen(port, function() {
    console.log('server listening on port ' + port);
});