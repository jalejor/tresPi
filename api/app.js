const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config');
const errors = require('../network/errors');

const product = require('./components/product/network');
const ticket = require('./components/ticket/network');

const app = express();
app.use(bodyParser.json());

//ROUTER
app.use('/api/product',product);
app.use('/api/ticket',ticket);


app.use(errors);

app.listen(config.api.port, ()=>{
    console.log('Api escuchando en el puerto', config.api.port)
})