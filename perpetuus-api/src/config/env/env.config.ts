import dotenv from 'dotenv';  // Para archivos .env
dotenv.config();

/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
/*                        ENVIRONMENT VARIABLES (START)                       */
/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

/* ---------------------------------- logs ---------------------------------- */
export const SHOW_LOGS = JSON.parse(process.env.MOSTRAR_LOGS ?? 'true');
export const SHOW_SYS_REGS = JSON.parse(process.env.SHOW_SYS_REGS ?? 'true');
export const SHOW_REQ_LOGS = JSON.parse(process.env.SHOW_REQ_LOGS ?? 'true');
export const DEBUG_LOGS = JSON.parse(process.env.DEBUG_LOGS ?? 'false');
export const SAVE_LOGS_ON_FILE = JSON.parse(process.env.SAVE_LOGS_ON_FILE ?? 'false');

/* -------------------------------- mongo bd -------------------------------- */
export const URI_DB = process.env.URI_DB;

/* ------------------------------- aplicacion ------------------------------- */
export const PORT = process.env.PORT || 9000;
export const URL_GUI_LOCAL = process.env.URL_GUI_LOCAL;

/* ---------------------------------- auth ---------------------------------- */
export const COOKIE_SECRET = process.env.COOKIE_SECRET;
export const AUTH_SECRET = process.env.AUTH_SECRET;


/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
/*                         ENVIRONMENT VARIABLES (END)                        */
/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */