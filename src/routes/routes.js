var express= require('express');
var router = express.Router();
var Operations = require('../models/operation.schema');   //Creamos el router de express

// Seteamos la ruta principal
router.get('/', function(req, res) {
    res.json({ message: 'Hooolaa :)'});
});
//
// Obtenemos todas las operaciones
router.route('/operations')
  //Para listar GET es el estandar
  .get(function(req, res) {
    //Usamos la funcion find de mongoose para encontrar todos los registros
    Operations.find(function(err, operations) {
    //Si hay un error, lo regresamos
    if (err){
      res.send(err);
    }
    //Si no hay errores, regresamos los registros
    res.json(operations);
  });
  })

  router.route('/operation/:id')
    .get((req,res)=>{
        Operations.find({idOperation : req.params.id},(err,operation)=>{
            if (err){
                res.send(err);
            }
            res.json(operation)
        })
    })


    router.route('/operation/:id')
        .delete((req,res)=>{
            Operations.remove({idOperation : req.params.id},(err,operation)=>{
                if (err){
                    res.send(err);
                }
                res.json({message:`La operación ${req.params.id} fue eliminada correctamente`});
            })
        })
// Le decimos a la aplicación que utilize las rutas que agregamos

module.exports=router;