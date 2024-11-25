import express from "express";
import { db } from "./db.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// api crud - Vehiculos 

// GET /vehiculos
router.get("/", async (req, res) => {
    try {
      const [vehiculos] = await db.execute("SELECT * FROM `db-lab4`.vehiculos");
      res.send({ vehiculos });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error al consultar los vehículos" });
    }
  });
  
// GET /vehiculos/:id  -  vehiculo por ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const [vehiculo] = await db.execute("SELECT idvehiculos, tipo_vehiculo, precio_vehiculo, pago_vehiculo, fecha_vehiculo, categoria_precio, id_usuario, username FROM `db-lab4`.vehiculos WHERE idvehiculos = ?", [id]);
      if (vehiculo.length === 0) {
        return res.status(404).send({ message: "Vehículo no encontrado" });
      }
      res.send({ vehiculo: vehiculo[0] });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error al consultar el vehículo" });
    }
});

// POST /vehiculos - Crear nuevo vehículo
router.post(
    "/",
    body("tipo_vehiculo").isString().notEmpty(),
    body("precio_vehiculo").isInt({ min: 1 }).notEmpty(),
    body("pago_vehiculo").isString().notEmpty(),
    body("categoria_precio").isString().notEmpty(),
    body("id_usuario").isInt(),
    body("username").isString().isLength({ max: 25 }).optional(),  // username es opcional si id_usuario está presente
    async (req, res) => {
      const validacion = validationResult(req);
      if (!validacion.isEmpty()) {
        return res.status(400).send({ errores: validacion.array() });
      }
  
      const { tipo_vehiculo, precio_vehiculo, pago_vehiculo, categoria_precio, id_usuario, username } = req.body;
  
      // Inserta en la base de datos
      try {
        const [result] = await db.execute(
          "INSERT INTO `db-lab4`.vehiculos (tipo_vehiculo, precio_vehiculo, pago_vehiculo, categoria_precio, id_usuario, username) VALUES (?, ?, ?, ?, ?, ?)",
          [tipo_vehiculo, precio_vehiculo, pago_vehiculo, categoria_precio, id_usuario, username]
        );
        res.status(201).send({
          vehiculo: {
            idvehiculos: result.insertId,
            tipo_vehiculo,
            precio_vehiculo,
            pago_vehiculo,
            categoria_precio,
            id_usuario,
            username,
          },
        });
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al cargar el vehículo" });
      }
    }
  );

  
// PUT /vehiculos/:id - Editar vehículo ID
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { tipo_vehiculo, precio_vehiculo, pago_vehiculo, categoria_precio, id_usuario, username } = req.body;
  
    try {
      // Actualizar vehículo en la base de datos
      const [result] = await db.execute(
        "UPDATE `db-lab4`.vehiculos SET tipo_vehiculo = ?, precio_vehiculo = ?, pago_vehiculo = ?, categoria_precio = ?, id_usuario = ?, username = ? WHERE idvehiculos = ?",
        [tipo_vehiculo, precio_vehiculo, pago_vehiculo, categoria_precio, id_usuario, username, id]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: "Vehículo no encontrado" });
      }
  
      res.status(200).send({ message: "Vehículo actualizado correctamente" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error al actualizar el vehículo" });
    }
  });
  
// DELETE /vehiculos/:id Eliminar vehículo por ID
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await db.execute("DELETE FROM `db-lab4`.vehiculos WHERE idvehiculos = ?", [id]);
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