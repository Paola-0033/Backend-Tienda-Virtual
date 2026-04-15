const db = require('../models');
const carrito_detalle = db.tbd_carrito_detalle;

module.exports = {
    create(req, res) {
        return carrito_detalle
            .create({
                id_carrito: req.body.id_carrito,
                id_producto: req.body.id_producto,
                precio_unitario: req.body.precio_unitario,
                cantidad: req.body.cantidad
            })
            .then(carrito_detalle => res.status(200).send(carrito_detalle))
            .catch(error => res.status(400).send(error))
    },
    list(_, res) {
        return carrito_detalle.findAll({})
            .then(carrito_detalle => res.status(200).send(carrito_detalle))
            .catch(error => res.status(400).send(error))
    },
    find(req, res) {
        return carrito_detalle.findAll({
            where: {
                id: req.params.id,
            }
        })
            .then(carrito_detalle => res.status(200).send(carrito_detalle))
            .catch(error => res.status(400).send(error))
    },
    update(req, res) {
        return carrito_detalle.update(
            {
                id_carrito: req.body.id_carrito,
                id_producto: req.body.id_producto,
                precio_unitario: req.body.precio_unitario,
                cantidad: req.body.cantidad
            },
            {
                where: {
                    id: req.params.id,
                }
            }
        )
            .then(() => res.status(200).send({ mensaje: "Datos actualizados correctamente" }))
            .catch(error => res.status(400).send(error))
    },
    delete(req, res) {
        return carrito_detalle.destroy({
            where: {
                id: req.params.id,
            }
        })
            .then(() => res.status(200).send({ mensaje: "Datos eliminados correctamente" }))
            .catch(error => res.status(400).send(error))
    },
};
