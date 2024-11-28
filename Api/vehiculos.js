import express from "express";
import { db } from "./db.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// API CRUD - Vehículos

// GET /vehiculo - Obtener todos los vehículos
router.get("/", async (req, res) => {
  try {
    const [vehiculos] = await db.execute("SELECT * FROM vehiculo");
    res.send({ vehiculos });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al consultar los vehículos" });
  }
});

// GET /vehiculo/:id - Obtener vehículo por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [vehiculo] = await db.execute("SELECT * FROM vehiculo WHERE id_vehiculo = ?", [id]);
    if (vehiculo.length === 0) {
      return res.status(404).send({ message: "Vehículo no encontrado" });
    }
    res.send({ vehiculo: vehiculo[0] });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al consultar el vehículo" });
  }
});

// POST /vehiculo - Crear un nuevo vehículo
router.post(
  "/",
  body("categoria").isString().notEmpty(),
  body("precio").isDecimal().notEmpty(),
  body("metodo_pago").isString().optional(),
  body("fecha").isISO8601().optional(),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      return res.status(400).send({ errores: validacion.array() });
    }

    const { categoria, precio, metodo_pago, fecha } = req.body;

    try {
      const [result] = await db.execute(
        "INSERT INTO vehiculo (categoria, precio, metodo_pago, fecha) VALUES (?, ?, ?, ?)",
        [categoria, precio, metodo_pago || null, fecha || null]
      );
      res.status(201).send({
        vehiculo: {
          id_vehiculo: result.insertId,
          categoria,
          precio,
          metodo_pago,
          fecha,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error al crear el vehículo" });
    }
  }
);

// PUT /vehiculo/:id - Actualizar un vehículo
router.put(
  "/:id",
  body("categoria").isString().optional(),
  body("precio").isDecimal().optional(),
  body("metodo_pago").isString().optional(),
  body("fecha").isISO8601().optional(),
  async (req, res) => {
    const { id } = req.params;
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      return res.status(400).send({ errores: validacion.array() });
    }

    const { categoria, precio, metodo_pago, fecha } = req.body;

    try {
      const [result] = await db.execute(
        `UPDATE vehiculo
         SET 
           categoria = IFNULL(?, categoria),
           precio = IFNULL(?, precio),
           metodo_pago = IFNULL(?, metodo_pago),
           fecha = IFNULL(?, fecha)
         WHERE id_vehiculo = ?`,
        [categoria, precio, metodo_pago, fecha, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).send({ message: "Vehículo no encontrado" });
      }

      res.status(200).send({
        message: "Vehículo actualizado correctamente",
        vehiculo: { id_vehiculo: id, categoria, precio, metodo_pago, fecha },
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error al actualizar el vehículo" });
    }
  }
);

// DELETE /vehiculo/:id - Eliminar un vehículo
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute("DELETE FROM vehiculo WHERE id_vehiculo = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Vehículo no encontrado" });
    }
    res.status(200).send({ message: "Vehículo eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al eliminar el vehículo" });
  }
});

export default router;
