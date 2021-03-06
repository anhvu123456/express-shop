require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csurf = require('csurf');
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/express-demo', { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) throw err;
    console.log('Connect successfullyy!!');
});


var authRoute = require('./routes/auth.route');
var userRoute = require('./routes/user.route');
var productRoute = require('./routes/product.route');
var cartRoute = require('./routes/cart.route');
var transfeRoute = require('./routes/transfer.route');

var authMiddleware = require('./middlewares/auth.middleware');

var port = 3000;
var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static('public'));


//Routes
app.get('/', function(req, res) {
    res.render('index', {
      name: 'AAA'
    });
  });

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);
app.use('/transfer', authMiddleware.requireAuth, transfeRoute);

app.listen(port, function(){
    console.log('Server listening on port ' + port)
})