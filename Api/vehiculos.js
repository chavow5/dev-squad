import express from "express";
import { db } from "./db.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// API CRUD - Vehículos

// GET /vehiculos - Obtener todos los vehículos
router.get("/", async (req, res) => {
  try {
    const [vehiculos] = await db.execute(`
      SELECT vehiculos.*, 
             usuarios.username AS usuario 
      FROM vehiculos
      LEFT JOIN historial ON vehiculos.id_vehiculos = historial.id_vehiculo
      LEFT JOIN usuarios ON historial.id_usuario = usuarios.id_usuario
    `);
    res.send({ vehiculos });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al consultar los vehículos" });
  }
});

// GET /vehiculos/:id - Obtener vehículo por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [vehiculo] = await db.execute(
      // "SELECT * FROM vehiculos WHERE id_vehiculos = ?",
      `
      SELECT vehiculos.*, 
             usuarios.username AS usuario 
      FROM vehiculos
      LEFT JOIN historial ON vehiculos.id_vehiculos = historial.id_vehiculo
      LEFT JOIN usuarios ON historial.id_usuario = usuarios.id_usuario
      WHERE vehiculos.id_vehiculos = ?
    `, [id]);
    if (vehiculo.length === 0) {
      return res.status(404).send({ message: "Vehículo no encontrado" });
    }
    res.send({ vehiculo: vehiculo[0] });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al consultar el vehículo" });
  }
});

// POST /vehiculos - Crear un nuevo vehículo
router.post(
  "/",
  body("patente").isString().notEmpty(),
  body("tipo_vehiculo").isString().optional(),
  body("numero_cabina").isInt().optional(),
  body("precio").isDecimal().optional(),
  body("fecha").isDate().optional(),
  body("metodo_pago")
    .isIn(["efectivo", "transferencia", "qr", "chachos"])
    .optional(),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      return res.status(400).send({ errores: validacion.array() });
    }

    const { patente, tipo_vehiculo, numero_cabina, precio, fecha, metodo_pago } = req.body;

    try {
      const [result] = await db.execute(
        "INSERT INTO vehiculos (patente, tipo_vehiculo, numero_cabina, precio, fecha, metodo_pago) VALUES (?, ?, ?, ?, ?, ?)",
        [patente, tipo_vehiculo, numero_cabina, precio, fecha, metodo_pago]
      );
      res.status(201).send({
        vehiculo: {
          id_vehiculos: result.insertId,
          patente,
          tipo_vehiculo,
          numero_cabina,
          precio,
          fecha,
          metodo_pago,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error al crear el vehículo" });
    }
  }
);

// PUT /vehiculos/:id - Actualizar un vehículo
router.put(
  "/:id",
  body("patente").isString().optional(),
  body("tipo_vehiculo").isString().optional(),
  body("numero_cabina").isInt().optional(),
  body("precio").isDecimal().optional(),
  body("fecha").isDate().optional(),
  body("metodo_pago")
    .isIn(["efectivo", "transferencia", "qr", "chachos"])
    .optional(),
  async (req, res) => {
    const { id } = req.params;
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      return res.status(400).send({ errores: validacion.array() });
    }

    const { patente, tipo_vehiculo, numero_cabina, precio, fecha, metodo_pago } = req.body;

    try {
      const [result] = await db.execute(
        `UPDATE vehiculos 
         SET patente = IFNULL(?, patente), 
             tipo_vehiculo = IFNULL(?, tipo_vehiculo), 
             numero_cabina = IFNULL(?, numero_cabina), 
             precio = IFNULL(?, precio), 
             fecha = IFNULL(?, fecha), 
             metodo_pago = IFNULL(?, metodo_pago) 
         WHERE id_vehiculos = ?`,
        [patente, tipo_vehiculo, numero_cabina, precio, fecha, metodo_pago, id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: "Vehículo no encontrado" });
      }
      res.status(200).send({
        message: "Vehículo actualizado correctamente",
        vehiculo: { id_vehiculos: id, patente, tipo_vehiculo, numero_cabina, precio, fecha, metodo_pago },
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error al actualizar el vehículo" });
    }
  }
);

// DELETE /vehiculos/:id - Eliminar un vehículo
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute("DELETE FROM vehiculos WHERE id_vehiculos = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Vehículo no encontrado" });
    }
    res.status(200).send({ message: "Vehículo eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al eliminar el vehículo" });
  }
});



// // API CRUD - Historial esta en historial.js

// // GET /historial - Obtener todos los registros de historial
// router.get("/historial", async (req, res) => {
//   try {
//     const [historial] = await db.execute("SELECT * FROM historial");
//     res.send({ historial });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: "Error al consultar el historial" });
//   }
// });

// // POST /historial - Crear un nuevo registro en el historial
// router.post(
//   "/historial",
//   body("id_cabina").isInt().optional(),
//   body("id_vehiculo").isInt().notEmpty(),
//   body("id_usuario").isInt().optional(),
//   body("monto_pagado").isDecimal().optional(),
//   async (req, res) => {
//     const validacion = validationResult(req);
//     if (!validacion.isEmpty()) {
//       return res.status(400).send({ errores: validacion.array() });
//     }

//     const { id_cabina,id_vehiculo, id_usuario, monto_pagado } = req.body;

//     try {
//       const [result] = await db.execute(
//         "INSERT INTO historial ( id_cabina, id_vehiculo, id_usuario, monto_pagado) VALUES (?, ?, ?, ?)",
//         [
//           id_cabina || null, 
//           id_vehiculo,
//           id_usuario || null, 
//           monto_pagado || null
//         ]
//       );
//       res.status(201).send({
//         historial: {
//           id_historial: result.insertId,
//           id_cabina,
//           id_vehiculo,
//           id_usuario,
//           monto_pagado,
//         },
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send({ message: "Error al registrar en el historial" });
//     }
//   }
// );

export default router;
