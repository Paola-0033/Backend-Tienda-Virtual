const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const usuario = db.tbc_usuario;

const jwtSecret = process.env.JWT_SECRET || 'mi_clave_secreta';

module.exports = {
    async create(req, res) {
        try {
            const { nombre, direccion, telefono, email, password, rol, fecha_registro } = req.body;

            if (!nombre || !direccion || !telefono || !email || !password || !fecha_registro) {
                return res.status(400).send({ mensaje: 'Faltan campos obligatorios' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const nuevoUsuario = await usuario.create({
                nombre,
                direccion,
                telefono,
                email,
                password: hashedPassword,
                rol,
                fecha_registro
            });

            return res.status(201).send({
                id: nuevoUsuario.id,
                nombre: nuevoUsuario.nombre,
                direccion: nuevoUsuario.direccion,
                telefono: nuevoUsuario.telefono,
                email: nuevoUsuario.email,
                rol: nuevoUsuario.rol,
                fecha_registro: nuevoUsuario.fecha_registro
            });
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    list(_, res) {
        return usuario.findAll({})
            .then(usuario => res.status(200).send(usuario))
            .catch(error => res.status(400).send(error));
    },

    find(req, res) {
        return usuario.findAll({
            where: {
                id: req.params.id,
            }
        })
            .then(usuario => res.status(200).send(usuario))
            .catch(error => res.status(400).send(error));
    },

    async update(req, res) {
        try {
            const { nombre, direccion, telefono, email, password, rol, fecha_registro } = req.body;
            const datosActualizar = {
                nombre,
                direccion,
                telefono,
                email,
                rol,
                fecha_registro
            };

            if (password) {
                datosActualizar.password = await bcrypt.hash(password, 10);
            }

            await usuario.update(datosActualizar, {
                where: {
                    id: req.params.id,
                }
            });

            return res.status(200).send({ mensaje: 'Datos actualizados correctamente' });
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    delete(req, res) {
        return usuario.destroy({
            where: {
                id: req.params.id,
            }
        })
            .then(() => res.status(200).send({ mensaje: 'Datos eliminados correctamente' }))
            .catch(error => res.status(400).send(error));
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).send({ mensaje: 'Email y contraseña son obligatorios' });
            }

            const usuarioEncontrado = await usuario.findOne({ where: { email } });
            if (!usuarioEncontrado) {
                return res.status(401).send({ mensaje: 'Credenciales inválidas' });
            }

            let passwordValido = await bcrypt.compare(password, usuarioEncontrado.password);
            if (!passwordValido) {
                // Soporte temporal para usuarios creados antes de habilitar bcrypt
                if (password === usuarioEncontrado.password) {
                    passwordValido = true;
                    const hashedPassword = await bcrypt.hash(password, 10);
                    await usuario.update({ password: hashedPassword }, { where: { id: usuarioEncontrado.id } });
                }
            }

            if (!passwordValido) {
                return res.status(401).send({ mensaje: 'Credenciales inválidas' });
            }

            const token = jwt.sign(
                {
                    id: usuarioEncontrado.id,
                    email: usuarioEncontrado.email,
                    rol: usuarioEncontrado.rol
                },
                jwtSecret,
                { expiresIn: '1h' }
            );

            return res.status(200).send({
                token: token
            });
        } catch (error) {
            return res.status(400).send(error);
        }
    }
};
