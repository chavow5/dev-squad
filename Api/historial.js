import express from "express";
import { db } from "./db.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

//Api Crud - HISTORIAL

// GET /historial - Obtener todos los registros de historial
router.get("/historial", async (req, res) => {
  try {
    console.log("Consultando historial...");  // Para verificar si se llega a esta parte
    const [historial] = await db.execute("SELECT * FROM historial");
    res.send({ historial });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al consultar el historial" });
  }
});

// POST /historial - Crear un nuevo registro en el historial
router.post(
  "/historial",
  body("id_cabina").isInt().optional(),
  body("id_vehiculo").isInt().notEmpty(),
  body("id_usuario").isInt().optional(),
  body("monto_pagado").isDecimal().optional(),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      console.log(validacion.array());  // Esto te ayudará a ver qué errores estás recibiendo
      return res.status(400).send({ errores: validacion.array() });
    }

    const { id_cabina, id_vehiculo, id_usuario, monto_pagado } = req.body;

    console.log(req.body);  // Esto te ayudará a ver qué datos está enviando el cliente

    try {
      const [result] = await db.execute(
        "INSERT INTO historial (id_cabina, id_vehiculo, id_usuario, monto_pagado) VALUES (?, ?, ?, ?)",
        [
          id_cabina || null,
          id_vehiculo,
          id_usuario || null,
          monto_pagado || null
        ]
      );
      res.status(201).send({
        historial: {
          id_historial: result.insertId,
          id_cabina,
          id_vehiculo,
          id_usuario,
          monto_pagado,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error al registrar en el historial" });
    }
  }
);


  export default router;