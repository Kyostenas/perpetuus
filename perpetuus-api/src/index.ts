// (o-----------------------------------------( IMPORTACIONES ))
import mongoose from 'mongoose';
mongoose.set('strictQuery', false);
mongoose.Promise = global.Promise;

import { syslog as _syslog } from './utils/logs.utils';
const syslog = _syslog(module);

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookie_session from 'cookie-session';
import cookieParser from 'cookie-parser';

import { Resp } from './utils/response.utils';

import { URI_DB, PORT, COOKIE_SECRET, URL_GUI } from './config/env/env.config';

import { RUTA_ROL } from './componentes/usuario/rol-usuario/rol-usuario.routes';
import { RUTA_USUARIO } from './componentes/usuario/usuario/usuario.routes';
import { RUTA_AUTH } from './componentes/auth-login/auth.routes';
import { verificar_jwt } from './middlewares/auth-login/jwt.middleware';
import { _Request } from './tipos-personalizados';






// (o==================================================================o)
//   SERVIDOR EXPRESS (INICIO)
// (o-----------------------------------------------------------\/-----o)

const app: Application = express();

const opciones_cors = {
  origin: URL_GUI,
  methods: 'GET,HEAD,PUT,POST,DELETE,OPTIONS',
  preflightContinue: true,
  credentials: true,
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
}

// (o-----------------------------------------( CONFIGURACIONES ))

app.disable('x-powered-by');
app.use(cors(opciones_cors));

// PARA PARSEAR LAS COOKIES
app.use(cookieParser());

// BODY PARSING
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// LOGS REQUESTS
app.use((req: _Request, res: Response, next: any) => {
    let req_any = <any>req;
    let usuario = req_any?.usuario?.nombre_usuario;

    // Cuando es login, aun no hay objeto usuario en el req
    if (!usuario) {
      usuario = req.body.nombre_usuario;
    }
    if (!usuario) {
      syslog.__request(req.method, req.url);
    } else {
      syslog.__request(req.method, `{${usuario}} ${req.url}`);
    }
    next();
});

app.use(cookie_session({
    name: 'perpetuus-session',
    keys: [<string>COOKIE_SECRET],
    httpOnly: true,
  })
);

app.use((req: _Request, res: Response, next: any) => {
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Content-Type, Accept',
  );
  next();
});

// (o-----------------------------------------( RUTAS ))

app.all('*', (req: _Request, res: Response, next: any)=>{
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  syslog.debug('FULL URL: ' + fullUrl)
  next()
});

app.get('/', async (req: _Request, res: Response): Promise<Response> => {
  return new Resp(res, __filename, { mensaje: 'API Funcionando' })._200_ok()
});

// RUTAS DE INICIO DE SESION, CREACION DE TOKEN
// Y TOKEN DE REFRESCADO
app.use('/auth', RUTA_AUTH());

// VERIFICACION DE TOKEN
// Debe ir despues de la ruta auth, porque esa no
// debe validar el token. Esto es asi porque es
// en base a esas rutas que se genera este mismo.
app.use((req: _Request, res: Response, next: any) => {
  verificar_jwt(req, res, next);
});


app.use('/roles', RUTA_ROL());
app.use('/usuarios', RUTA_USUARIO());

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

// (o-----------------------------------------------------------/\-----o)
//   SERVIDOR EXPRESS (FIN)
// (o==================================================================o)


