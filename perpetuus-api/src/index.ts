// (o-----------------------------------------( IMPORTACIONES ))
import mongoose from 'mongoose';
mongoose.set('strictQuery', false);
mongoose.Promise = global.Promise;

import { syslog as _syslog } from './utils/logs.utils';
const syslog = _syslog(module);

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookie_session from 'cookie-session';

import { Resp } from './utils/response.utils';

import { URI_DB, PORT, COOKIE_SECRET } from './config/env/env.config';

import { RUTA_ROL } from './componentes/usuario/rol-usuario/rol-usuario.routes';
import { RUTA_USUARIO } from './componentes/usuario/usuario/usuario.routes';
import { RUTA_AUTH } from './componentes/auth-login/auth.routes';

// (o-----------------------------------------( CONFIGURACIONES ))

const app: Application = express();

app.use(cors());

// LOGS REQUESTS
app.use((req, res, next) => {
    syslog.__request(req.method, req.url);
    next();
});

// BODY PARSING
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookie_session({
    name: 'perpetuus-session',
    keys: [<string>COOKIE_SECRET],
    httpOnly: true,
  })
);

app.use(function(req: Request, res: Response, next: any) {
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Content-Type, Accept',
  );
  next();
});

// (o-----------------------------------------( RUTAS ))

app.all('*', (req, res, next)=>{
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  syslog.debug('FULL URL: ' + fullUrl)
  next()
});

app.get('/api/v1', async (req: Request, res: Response): Promise<Response> => {
  return new Resp(res, __filename, { mensaje: 'API Funcionando' })._200_ok()
});
app.use('/api/v1/auth', RUTA_AUTH());
app.use('/api/v1/roles', RUTA_ROL());
app.use('/api/v1/usuarios', RUTA_USUARIO());

// (o-----------------------------------------( CONECCION MONGODB ))

mongoose.connect(<string>URI_DB)
  .then( () => {
    syslog.ok( `mongo db conectada`)

  })
  .catch( (error) =>{
    syslog.error( `no se pudo conectar a la bd: ${error}`)
  });

// (o-----------------------------------------( ESCUCHAR ))

try {
  app.listen(PORT, (): void => {
    syslog.info( `escuchando en el puerto ${PORT}`);
  });
} catch (error: any) {
  syslog.error( `Ocurrió un error antes de escuchar en el puerto: ${error.message}`)
}
