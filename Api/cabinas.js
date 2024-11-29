import express from "express";
import { db } from "./db.js"; 

const router = express.Router();

// Ruta para obtener todas las cabinas
router.get("/", async (req, res) => {
  try {
    const [cabinas] = await db.execute("SELECT * FROM cabinas");
    res.send({ cabinas });
  } catch (error) {
    console.error("Error al obtener las cabinas:", error);
    res.status(500).send({ message: "Error al obtener las cabinas" });
  }
});

export default router;
