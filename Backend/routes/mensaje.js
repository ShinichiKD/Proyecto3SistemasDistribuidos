import express from "express";
const router = express.Router();

// importar el modelo nota
import mensajeSchema from "../models/mensaje";

router.get("/getchat/:id1/:id2", async (req, res) => {
  // Obtenemos el id 1
  const id1 = req.params.id1;
  // Obtenemos el id 2
  const id2 = req.params.id2;

  console.log(id1);
  console.log(id2);

  // Buscamos todos los chat en donde id1 y id2 esten en el array de participantes
  await mensajeSchema
    .find({
      participantes: {
        $all: [id1, id2],
        $size: 2,
      },
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.post("/addMensaje", async (req, res) => {
  const body = req.body;

  body.fecha = new Date();

  const mensaje = mensajeSchema(body);
  await mensaje
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

module.exports = router;
