var express    = require('express');        // Utilizaremos express, aqui lo mandamos llamar

var app        = express();                 // definimos la app usando express
var bodyParser = require('body-parser'); //
var mongoose = require('mongoose'); // Utilizamos la librería de mongoose
var cors = require('cors');

var jwt = require('./src/helpers/jwt');
var errorHandler = require('./src/helpers/error-handler');

var fs = require('fs');
//var https = require('https');
var http =  require('http');
var isHttps=false;

//var prodURL=`mongodb+srv://user:12345@cluster0-ohrxc.mongodb.net/test?retryWrites=true&w=majority`;
//Creamos la conexión con mongo
mongoose.connect('mongodb+srv://user:12345@cluster0-ohrxc.mongodb.net/ucoDB?retryWrites=true&w=majority',{
    useCreateIndex: true,
    useNewUrlParser: true
  });

/* mongoose.connect('mongodb://localhost:27017/ucoDB',{
    useCreateIndex: true,
    useNewUrlParser: true
  }); */
  
app.use(cors());
var routes = require ('./src/routes/routes');
// configuramos la app para que use bodyParser(), esto nos dejara usar la informacion de los POST
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb'}));
// use JWT auth to secure the api
app.use(jwt());
//const port =80; // seteamos el puerto
//app.set('port', (process.env.PORT || 5000));



var port = process.env.PORT || 4000;

//var router = express.Router();   //Creamos el rout

// Le decimos a la aplicación que utilize las rutas que agregamos
app.use('/api', routes);
// api routes
app.use('/users', require('./src/users/user.controller'));
// global error handler
app.use(errorHandler);
// Iniciamos el servidor

/* app.listen(port);
console.log(`Running on port ${port}`); */
if (isHttps){
 /*https.createServer({
    key: fs.readFileSync('./certificatesUCO/uco.key'),
    cert: fs.readFileSync('./certificatesUCO/uco.crt')
  }, app).listen(port, function(){
    console.log("My https server listening on port " + port + "...");
  });*/
}else{
  http.createServer(app).listen(port, function(){
    console.log("My http server listening on port " + port + "...");
  });
}