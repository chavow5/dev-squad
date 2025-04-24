import express from "express";
import cors from "cors";
import { conectarDB, db } from "./db.js";  // la función y la DB
import authRouter from "./auth.js";
importrocess.env.PORT ?? 3000; // si el puerto 3000 esta en uso busca otro puerto

// Interpretar JSON en body y habilitar cors
app.use(express.json());
app.use(cors());
ulos", vehiculosRouter);

// Ruta Historial
app.use("/historial", historialRouter);

//Ruta Cabinas
app.use("/cabinas", cabinasRouter);

app.listen(port, () => {
  console.log(`La aplicación está funcionando en: http://localhost:${port}`);
});
