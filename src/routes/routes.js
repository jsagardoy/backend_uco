var express = require('express');
var router = express.Router();
const Operations = require('../models/operation.schema');   //Creamos el router de express
const Users = require('../models/user.schema');

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

//login Entity
//getAll users
router.route('/login')
    .get((req, res) => {
        Users.find({}).exec((err, login) => {
            if (err) {
                res.send(err);
            }
            console.log(login);
            res.json(login);
        })
    })
//get particular user
router.route('/login/:user')
    .get((req, res) => {
        Users.findOne({ user: req.params.user }).exec((err, login) => {
            if (err) {
                res.send(err);
            }
            console.log(login);
            res.json(login);
        })
    })
//update a particular user
router.route('/login/:user')
    .put((req, res) => {
        Users.findOne({ user:req.params.user }, (err, response) => {
            if (response) {
                Users.findOneAndUpdate({ user: req.params.user },
                    req.body,
                    ((err, user) => {
                        if (err) {
                            return res.status(500).send(err); 
                        }else {
                            return res.send({ message: `El usuario ${user} se ha actualizado con ${req.body.user}` });
                        }
                    })
                )
            }else{
                return res.send({ message: `No se encuentra el registro` });
            }
        })
    });
//add a new user
    router.route('/createUser')
    .put((req, res) => {
        Users.findOne({ user:req.body.user }, (err, response) => {
            if (response) {
                return res.send({ message: `El usuario ${req.body.user} ya existe, por favor indique otro usuario`});
            }else{
                const newUser = new Users(req.body);
                newUser.save(err => {
                    if (err) return res.status(500).send(err);
                    return res.status(200).send(newUser);
                })
            }
        })
    });

router.route('/login/:user')
    .delete((req, res) => {
        Users.deleteOne({ user: req.params.user }, (err, response) => {
            if (err) {
                res.send(err);
            }
            console.log(response);
            if (response.n>0){
                res.json({ message: `La operación ${req.params.user} fue eliminada correctamente` });
            }else{
                res.json({ message: `El elemento ${req.params.user} no existe` });
            }
            
        })
    });
// Le decimos a la aplicación que utilize las rutas que agregamos

module.exports = router;