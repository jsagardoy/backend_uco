var express    = require('express');        // Utilizaremos express, aqui lo mandamos llamar

var app        = express();                 // definimos la app usando express
var bodyParser = require('body-parser'); //
var mongoose = require('mongoose'); // Utilizamos la librería de mongoose
var cors = require('cors');

var jwt = require('./src/helpers/jwt');
var errorHandler = require('./src/helpers/error-handler');

//Creamos la conexión con mongo
mongoose.connect('mongodb://localhost:27017/ucoDB',{
    useCreateIndex: true,
    useNewUrlParser: true
  });
  
app.use(cors());
var routes = require ('./src/routes/routes');
// configuramos la app para que use bodyParser(), esto nos dejara usar la informacion de los POST
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb'}));
// use JWT auth to secure the api
app.use(jwt());
const port = process.env.NODE_ENV === 'production' ? 80 : 4000; // seteamos el puerto
//var port = process.env.PORT || 4000;

//var router = express.Router();   //Creamos el rout

// Le decimos a la aplicación que utilize las rutas que agregamos
app.use('/api', routes);
// api routes
app.use('/users', require('./src/users/user.controller'));
// global error handler
app.use(errorHandler);
// Iniciamos el servidor

app.listen(port);
console.log(`Running on port ${port}`);