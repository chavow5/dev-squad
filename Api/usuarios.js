import express from "express";
import { db } from "./db.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";

const router = express.Router();

// API CRUD - USUARIOS
// GET /usuarios  - Consultar todos los usuarios
router.get("/", async (req, res) => {
  const [usuarios] = await db.execute(
    "SELECT id, username, id_rol, email FROM usuarios"
  );
  res.send({ usuarios });
});

// GET /usuarios/:id - Consultar usuario por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [usuario] = await db.execute(
      "SELECT id, username, id_rol, email, nombreCompleto FROM usuarios WHERE id = ?",
      [id]
    );
    if (usuario.length === 0) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }
    res.send({ usuario: usuario[0] });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al consultar el usuario" });
  }
});

// POST /usuarios - Crear nuevo usuario
router.post(
  "/",
  body("username").isAlphanumeric().notEmpty().isLength({ max: 25 }),
  body("password").isStrongPassword({
    minLength: 8, 
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0, 
  }),
  body("id_rol").isIn([1, 2]),
  body("mail").isEmail().notEmpty(),
  body("nombreCompleto").notEmpty(),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      return res.status(400).send({ errores: validacion.array() });
    }

    const { username, password, id_rol, mail, nombreCompleto } = req.body;

    // Hash de la contraseña
    const passwordHashed = await bcrypt.hash(password, 10);

    try {
      const [result] = await db.execute(
        "INSERT INTO usuarios (username, password, email, nombreCompleto, id_rol) VALUES (?, ?, ?, ?, ?)",
        [username, passwordHashed, mail, nombreCompleto, id_rol]
      );
      res.status(201).send({
        usuario: {
          id: result.insertId,
          username,
          nombreCompleto,
          id_rol,
          mail,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error al crear el usuario" });
    }
  }
);

// PUT /usuarios/:id - Editar un usuario por ID
router.put(
  "/:id",
  body("username").optional().isAlphanumeric().isLength({ max: 25 }),
  body("password").optional().isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  }),
  body("id_rol").optional().isIn([1, 2]),
  body("mail").optional().isEmail(),
  body("nombreCompleto").optional(),
  async (req, res) => {
    const { id } = req.params;
    const { username, password, id_rol, mail, nombreCompleto } = req.body;

    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      return res.status(400).send({ errores: validacion.array() });
    }

    const updates = [];
    const values = [];

    if (username) {
      updates.push("username = ?");
      values.push(username);
    }
    if (password) {
      const passwordHashed = await bcrypt.hash(password, 10);
      updates.push("password = ?");
      values.push(passwordHashed);
    }
    if (id_rol) {
      updates.push("id_rol = ?");
      values.push(id_rol);
    }
    if (mail) {
      updates.push("email = ?");
      values.push(mail);
    }
    if (nombreCompleto) {
      updates.push("nombreCompleto = ?");
      values.push(nombreCompleto);
    }

    if (updates.length === 0) {
      return res.status(400).send({ error: "No hay datos para actualizar" });
    }

    values.push(id);
    try {
      await db.execute(
        `UPDATE usuarios SET ${updates.join(", ")} WHERE id = ?`,
        values
      );
      res.status(200).send({ message: "Usuario actualizado correctamente" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error al actualizar el usuario" });
    }
  }
);

// DELETE /usuarios/:id - Eliminar un usuario por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute(
      "DELETE FROM usuarios WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }
    res.status(200).send({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al eliminar el usuario" });
  }
});

export default router;
