var express    = require('express');        // Utilizaremos express, aqui lo mandamos llamar

var app        = express();                 // definimos la app usando express
var bodyParser = require('body-parser'); //
var mongoose = require('mongoose'); // Utilizamos la librería de mongoose
var cors = require('cors');
//Creamos la conexión con mongo
mongoose.connect('mongodb://localhost:27017/ucoDB',{ useNewUrlParser: true });
app.use(cors());
var routes = require ('./src/routes/routes');
// configuramos la app para que use bodyParser(), esto nos dejara usar la informacion de los POST
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb'}));

var port = process.env.PORT || 4000;        // seteamos el puerto

var router = express.Router();   //Creamos el router de express

// Le decimos a la aplicación que utilize las rutas que agregamos
app.use('/api', routes);

// Iniciamos el servidor
app.listen(port);
console.log('Aplicación creada en el puerto: ' + port);