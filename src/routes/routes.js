var express = require('express');
var router = express.Router();
const Operations = require('../models/operation.schema');   //Creamos el router de express
//const Users = require('../models/user.schema');

// Seteamos la ruta principal
router.get('/', function (req, res) {
    res.json({ message: 'Hooolaa :)' });
});
//
// Obtenemos todas las operaciones
router.route('/operations')
    //Para listar GET es el estandar
    .get(function (req, res) {
        //Usamos la funcion find de mongoose para encontrar todos los registros
        Operations.find(function (err, operations) {
            //Si hay un error, lo regresamos
            if (err) {
                res.send(err);
            }
            //Si no hay errores, regresamos los registros
            res.json(operations);
        });
    })

router.route('/operation/:id')
    .get((req, res) => {
        Operations.find({ idOperation: req.params.id }, (err, operation) => {
            if (err) {
                res.send(err);
            }
            res.json(operation)
        })
    })


router.route('/operation/:id')
    .delete((req, res) => {
        Operations.remove({ idOperation: req.params.id }, (err, operation) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: `La operación ${req.params.id} fue eliminada correctamente` });
        })
    });

router.route('/operation/:id')
    .put((req, res) => {
        Operations.findOneAndUpdate({ idOperation: req.params.id },
            req.body,
            ((err, ope) => {
                if (err) return res.status(500).send(err);
                return res.send({ message: `Se ha actualizado la operación ${req.body.nameOperation} o ${ope.nameOperation}` });
            }))
    });

router.route('/operation')
    .put((req, res) => {
        const newOperationObj = new Operations(req.body);

        newOperationObj.save(err => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(newOperationObj);
        });
    });


module.exports = router;