import express from "express";
import { db } from "./db.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

//Api Crud - HISTORIAL

// GET /historial - Obtener todos los registros de historial
// Obtener historial con detalles
router.get("/", async (req, res) => {
  try {
    const [historial] = await db.execute(`
      SELECT h.id_historial, h.fecha_peaje, c.nombre as cabina, v.patente, u.username, h.monto_pagado
      FROM historial h
      JOIN cabinas c ON h.id_cabina = c.id_cabina
      JOIN vehiculos v ON h.id_vehiculo = v.id_vehiculos
      JOIN usuarios u ON h.id_usuario = u.id_usuario
    `);
    res.send(historial);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al obtener historial" });
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