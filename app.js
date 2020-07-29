var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

//set up template engine
app.set('view engine','ejs');


//static files
app.use('/', express.static('public'));


todoController(app);


///listen to port
let port = process.env.PORT || 8080;
app.listen(3000);
console.log('You are listening to port '+port);