<<<<<<< HEAD
import dotenv from 'dotenv';  // Para archivos .env
dotenv.config()

// (o-----------------------------------------( IMPORTACIONES ))
import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
mongoose.set('strictQuery', false)
import { syslog as _syslog } from './utiles/logs';
const syslog = _syslog(module)
import { Resp } from './utiles/response';
mongoose.Promise = global.Promise

import { RUTA_ROL } from './componentes/usuario/rol-usuario/rol-usuario.routes';
=======
// (o-----------------------------------------( IMPORTACIONES ))
import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
mongoose.set('strictQuery', false);
import { syslog as _syslog } from './utils/logs.utils';
const syslog = _syslog(module);
import { Resp } from './utils/response.utils';
mongoose.Promise = global.Promise;
// import cors from 'cors';

import { URI_DB, PORT } from './config';
>>>>>>> main

// (o-----------------------------------------( CONFIGURACIONES ))

const app: Application = express();

<<<<<<< HEAD
=======
// app.use(cors());

>>>>>>> main
// LOGS REQUESTS
app.use((req, res, next) => {
    syslog.__request(req.method, req.url);
    next();
});

// BODY PARSING
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

<<<<<<< HEAD
// CONSTANTES ENV
const PORT = process.env.PORT || 9000;
const URI_DB = process.env.URI_DB

// (o-----------------------------------------( RUTAS ))

app.get('/', async (req: Request, res: Response): Promise<Response> => {
  return new Resp(res, __filename, { mensaje: 'API Funcionando' })._200_ok()
});

app.use('/roles', RUTA_ROL());
=======
// (o-----------------------------------------( RUTAS ))

app.all('*', (req, res, next)=>{
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  syslog.debug('FULL URL: ' + fullUrl)
  next()
});

app.get('/api', async (req: Request, res: Response): Promise<Response> => {
  return new Resp(res, __filename, { mensaje: 'API Funcionando' })._200_ok()
});

// app.use('/roles', RUTA_ROL());
// app.use('/api/multi-consulta', RUTA_MULTI_CONSULTA())
>>>>>>> main

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
<<<<<<< HEAD
}
=======
}
>>>>>>> main
