import express from "express";
import { db } from "./db.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

//Api Crud - HISTORIAL

// GET /historial - Obtener todos el historial
router.get("/", async (req, res) => {
    try {
      const [historial] = await db.execute("SELECT * FROM `db-lab4`.historial");
      res.send({ historial });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error al consultar el historial" });
    }
  });
  
  // GET /historial/:id - Obtener historial por ID
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const [registro] = await db.execute(
        "SELECT id, fecha_peaje, cobros, id_vehiculo, username FROM `db-lab4`.historial WHERE id = ?",
        [id]
      );
      if (registro.length === 0) {
        return res.status(404).send({ message: "Registro no encontrado" });
      }
      res.send({ registro: registro[0] });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error al obtener registro" });
    }
  });

  // POST /historial - Crear un nuevo registro en el historial
router.post(
    "/",
    body("cobros").isInt({ min: 1 }).notEmpty(),
    body("id_vehiculo").isInt().optional(),
    body("username").isString().isLength({ max: 25 }).optional(),
    async (req, res) => {
      const validacion = validationResult(req);
      if (!validacion.isEmpty()) {
        return res.status(400).send({ errores: validacion.array() });
      }
  
      const { cobros, id_vehiculo, username } = req.body;
  
      try {
        const [result] = await db.execute(
          "INSERT INTO `db-lab4`.historial (cobros, id_vehiculo, username) VALUES (?, ?, ?)",
          [cobros, id_vehiculo, username]
        );
        res.status(201).send({
          historial: {
            id: result.insertId,
            cobros,
            id_vehiculo,
            username,
          },
        });
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al crear un registro del historial" });
      }
    }
  );
  
  export default router;