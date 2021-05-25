var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csurf = require('csurf');
var mongoose = require('mongoose');


var authRoute = require('./routes/auth.route');

var port = 3000;
var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 


app.use(express.static('public'));

//Routes
app.get('/', function(req, res) {
    res.render('index', {
      name: 'AAA'
    });
  });

app.use('/auth', authRoute);

app.listen(port, function(){
    console.log('Server listening on port ' + port)
})