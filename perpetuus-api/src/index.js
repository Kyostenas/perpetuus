require('dotenv').config();  // Para archivos .env 

// (o-----------------------------------------( IMPORTACIONES ))
const express = require('express');
// const https = require('https')
const mongoose = require('mongoose');
const body_parser = require('body-parser');
// const fs = require('fs')
const { graphqlHTTP } = require('express-graphql');

const { syslog } = require('./utiles/logs');
const { schema, root } = require('./graphql.schema');

mongoose.Promise = global.Promise

// RUTAS
// ...

// (o-----------------------------------------( CONFIGURACIONES ))

const app = express();
const json_parser = body_parser.json();
const urlencoded_parser = body_parser.urlencoded({ extended: false });

// LOGS REQUESTS
app.use((req, res, next) => {
    syslog.__request(req.method, req.url);
    next();
});

// CONSTANTES ENV
const PORT = process.env.PORT || 9000;

// URI DB
// ...

// (o-----------------------------------------( RUTAS ))

// rutas importadas aquí...
app.use(json_parser);

// GRAPHQL
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);
syslog.success(__filename, 'ejecutando graphql');

// RUTAS INDEX
app.get('/', (req, res) => {
  res.send('API funcionando.');
});

// (o-----------------------------------------( CONECCION MONGODB ))

// ...

// (o-----------------------------------------( ESCUCHAR ))

app.listen(PORT, () => {
  syslog.warning(__filename, `escuchando en el puerto ${PORT}`);
});
