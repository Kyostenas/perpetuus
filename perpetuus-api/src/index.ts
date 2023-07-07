import dotenv from 'dotenv';  // Para archivos .env
dotenv.config()

// (o-----------------------------------------( IMPORTACIONES ))
import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import { syslog } from './utiles/logs';
mongoose.Promise = global.Promise

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

// URI DB
// ...

// (o-----------------------------------------( RUTAS ))

app.get('/', async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: 'API funcionando.'
  });
});

// (o-----------------------------------------( CONECCION MONGODB ))

// ...

// (o-----------------------------------------( ESCUCHAR ))

try {
  app.listen(PORT, (): void => {
    syslog.warning(__filename, `escuchando en el puerto ${PORT}`);
  });
} catch (error: any) {
  syslog.danger(__filename, `Ocurrió un error antes de escuchar en el puerto: ${error.message}`)
}
