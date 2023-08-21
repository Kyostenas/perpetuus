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

// (o-----------------------------------------( CONFIGURACIONES ))

const app: Application = express();

// LOGS REQUESTS
app.use((req, res, next) => {
    syslog.__request(req.method, req.url);
    next();
});

// BODY PARSING
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// CONSTANTES ENV
const PORT = process.env.PORT || 9000;
const URI_DB = process.env.URI_DB

// (o-----------------------------------------( RUTAS ))

app.get('/', async (req: Request, res: Response): Promise<Response> => {
  return new Resp(res, __filename, { mensaje: 'API Funcionando' })._200()
});

app.use('/roles', RUTA_ROL());

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
