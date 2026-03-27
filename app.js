const express = require('express');
const logger = require('morgan');
const bodyPaser = require('body-parser');

const http = require('http');
const app = express();

app.use(logger('dev'));
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({extended: false}));

app.get('/',(req,res)=>res.status(200).send({
    menssage:'Bienvenido a mi API de tienda virtual Pao Rodriguez',
}));

require('./routes/route_categoria')(app);

const port= parseInt(process.env.PORT,10)|| 8000;
app.set('port',port);
const server = http.createServer(app);
server.listen(port);
module.exports=app;