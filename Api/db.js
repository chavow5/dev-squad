// base de datos 
import mysql from "mysql2/promise";
import dotenv from 'dotenv';
dotenv.config();

export let db;

export async function conectarDB() {
  db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS|| '',
    database: process.env.DB_NAME,
    
  });
  //comprobar si la base de datos se conecto
  console.log("La base de datos se pudo conectar desde Mysql :)");
}
