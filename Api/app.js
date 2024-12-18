import express from "express";
import cors from "cors";
import { conectarDB, db } from "./db.js";  // la función y la DB
import authRouter from "./auth.js";
import usuariosRouter from "./usuarios.js";
import vehiculosRouter from "./vehiculos.js"; 
import historialRouter from "./historial.js";
import cabinasRouter from "./cabinas.js"

// Conectar a DB
conectarDB();
console.log("Conectado a base de datos");

const app = express();
const port = process.env.PORT ?? 3000; // si el puerto 3000 esta en uso busca otro puerto

// Interpretar JSON en body y habilitar cors
app.use(express.json());
app.use(cors());

// Ruta para mostrar usuarios
app.get("/", async (_, res) => {
  const [usuarios] = await db.execute("select id_usuario, username, id_rol from usuarios");
  res.send({ usuarios });
});

// Ruta usuarios y autenticación
app.use("/usuarios", usuariosRouter);
app.use("/auth", authRouter);

// Ruta vehiculos
app.use("/vehiculos", vehiculosRouter);

// Ruta Historial
app.use("/historial", historialRouter);

//Ruta Cabinas
app.use("/cabinas", cabinasRouter);

app.listen(port, () => {
  console.log(`La aplicación está funcionando en: http://localhost:${port}`);
});
