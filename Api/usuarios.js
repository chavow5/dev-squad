import express from "express";
import { db } from "./db.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";

const router = express.Router();

// API CRUD - USUARIOS
// GET /usuarios  - Consultar todos los usuarios
router.get("/", async (req, res) => {
  const [usuarios] = await db.execute("select id_usuario,username,id_rol, mail from usuarios");
  res.send({ usuarios });
});

// GET /usuarios/:id - Consultar usuario por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [usuario] = await db.execute("SELECT id_usuario, username, id_rol, mail FROM usuarios WHERE id = ?", [id]);
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
    minLength: 8, // Minino de 8 caracteres (letras y numeros)
    minLowercase: 1, // Al menos una letra minuscula
    minUppercase: 1, // Al menos una letra mayusculas
    minNumbers: 1, // Al menos un numero
    minSymbols: 0, // Sin simbolos
  }),
  body("id_rol").isIn([1, 2]),
  body("mail").isEmail().notEmpty(),
  async (req, res) => {
    // Enviar errores de validacion en caso de ocurrir alguno.
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errores: validacion.array("agrega datos") });
      return;
    }

    const { username, password, id_rol, mail } = req.body;

    // hash de la contraseña
    const passwordHashed = await bcrypt.hash(password, 10);

    // Inserta en la base de datos 
    const [result] = await db.execute(
      "INSERT INTO usuarios (username, password, id_rol, mail) VALUES (?, ?, ?, ?)",
      [username, passwordHashed, id_rol, mail]
    );
    res.status(201).send({ usuario: 
    { 
        id: result.insertId,
      username,
      id_rol,
      mail,
    } });
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
  body("rol").optional().isString().isIn(["administrador", "operador"]),
  body("mail").optional().isEmail(),
  async (req, res) => {
    const { id } = req.params;
    const { username, password, id_rol, mail } = req.body;

    // Enviar errores de validación si es necesario
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      return res.status(400).send({ errores: validacion.array() });
    }

    // Preparar el conjunto de actualizaciones
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
    if (rol) {
      updates.push("id_rol = ?");
      values.push(rol);
    }
    if (mail_usuario) {
      updates.push("mail = ?");
      values.push(mail_usuario);
    }
    // Si no hay datos para actualizar, tira un error
    if (updates.length === 0) {
      return res.status(400).send({ error: "No hay datos para actualizar" });
    }

    // Actualizar en la base de datos
    values.push(id); // El id debe ser el último valor para la condición WHERE
    await db.execute(
      `UPDATE usuarios SET ${updates.join(", ")} WHERE id_usuario = ?`,
      values
    );

    res.status(200).send({ message: "Usuario actualizado correctamente" });
  }
);

// DELETE /usuarios/:id  - Eliminar un usuario por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute("DELETE FROM usuarios WHERE id_usuario = ?", [id]);
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
