var express = require('express');
var mainController = require('./controllers/mainController');
var session = require('express-session');
const app = express();

//setting up template engine
app.set('view engine', 'ejs');

//static
app.use(express.static('./assets'));
app.use(session({secret:"asdfghjkl", resave:true, saveUninitialized:true}));

//fire controllers
mainController(app);

//listen to port
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
