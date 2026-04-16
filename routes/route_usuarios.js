const usuarioController = require('../Controllers/controller_usuario');

module.exports = (app) => {
    app.get('/api/usuarios', usuarioController.list);
    app.get('/api/usuario/:id', usuarioController.find);
    app.post('/api/usuario', usuarioController.create);
    app.get('/api/login', (_, res) => res.status(405).send({ mensaje: 'Use POST /api/login con JSON { email, password }' }));
    app.post('/api/login', usuarioController.login);
    app.delete('/api/usuario/:id', usuarioController.delete);
    app.put('/api/usuario/:id', usuarioController.update);
};
