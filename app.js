var express = require('express');
var http = require('http');
var path = require('path');
var load = require('express-load');
var expressValidator = require("express-validator");
var cookieParser = require('cookie-parser');
var cors = require('cors');


var app = express();
    
// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(cors());
app.use(expressValidator());
app.use(express.json());
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

load('models').
then('controllers').
then('routes').
into(app);


http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
