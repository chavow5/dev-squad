import express from "express";
import { db } from "./db.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// API CRUD - Historial Vehículo

// GET /historial - Obtener todos los registros del historial de vehículos
router.get("/historial", async (req, res) => {
  try {
    const [historial] = await db.execute(`
      SELECT * FROM .historial_vehiculo
    `);

    if (historial.length === 0) {
      return res.status(404).send({ message: "No hay registros en el historial de vehículos" });
    }

    res.send({ historial });
  } catch (error) {
    console.error("Error al consultar historial:", error);
    res.status(500).send({ message: "Error al consultar el historial de vehículos" });
  }
});

// GET /historial/:id - Obtener un registro del historial por ID
router.get("/historial/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [historial] = await db.execute(`
      SELECT * FROM historial_vehiculo
    `);

    if (historial.length === 0) {
      return res.status(404).send({ message: "Registro de historial no encontrado" });
    }

    res.send({ historial: historial[0] });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al consultar el registro del historial" });
  }
});

// POST /historial - Crear un nuevo registro en el historial
router.post(
  "/historial",
  body("id_vehiculo").isInt().notEmpty(),
  body("id_usuario").isInt().optional(),
  body("id_monto").isDecimal().optional(),
  body("fecha").isISO8601().optional(),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      return res.status(400).send({ errores: validacion.array() });
    }

    const { id_vehiculo, id_usuario, id_monto, fecha } = req.body;

    try {
      const [result] = await db.execute(
        "INSERT INTO historial_vehiculo (id_vehiculo, id_usuario, id_monto, fecha) VALUES (?, ?, ?, ?)",
        [id_vehiculo, id_usuario || null, id_monto || null, fecha || null]
      );
      res.status(201).send({
        historial: {
          id_historial_vehiculo: result.insertId,
          id_vehiculo,
          id_usuario,
          id_monto,
          fecha,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error al crear el registro en el historial" });
    }
  }
);

// DELETE /historial/:id - Eliminar un registro del historial
router.delete("/historial/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute("DELETE FROM historial_vehiculo WHERE id_historial_vehiculo = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Registro de historial no encontrado" });
    }
    res.status(200).send({ message: "Registro de historial eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al eliminar el registro del historial" });
  }
});

export default router;

// // const [historial] = await db.execute(`
// SELECT hv.id_historial_vehiculo, hv.fecha, hv.id_monto, 
// hv.id_usuario, u.nombre AS usuario, 
// hv.id_vehiculo, v.categoria AS vehiculo
// FROM historial_vehiculo hv
// LEFT JOIN usuarios u ON hv.id_usuario = u.id
// LEFT JOIN vehiculo v ON hv.id_vehiculo = v.id_vehiculo
// WHERE hv.id_historial_vehiculo = ?
// `, [id]);