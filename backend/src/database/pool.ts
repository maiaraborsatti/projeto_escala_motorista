import mysql from 'mysql2/promise';
import { ambiente } from '../config/env.js';

// Pool de conexões reutilizáveis com o MySQL.
export const pool = mysql.createPool({
  // os valores vêm do objeto `ambiente`, já validado pelo zod.
  host: ambiente.banco.host,
  port: ambiente.banco.porta,
  user: ambiente.banco.usuario,
  password: ambiente.banco.senha,
  database: ambiente.banco.nome,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
  timezone: 'local',
});