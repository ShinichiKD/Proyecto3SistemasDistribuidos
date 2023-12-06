import express from "express";
const router = express.Router();

// importar el modelo nota
import chatSchema from "../models/chat";
import mensajeSchema from '../models/mensaje';
router.post("/addchat", async (req, res) => {
  const body = req.body;
  console.log(body);

  const chat = chatSchema(body);
  await chat
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});
router.post("/addmensajetochat", async (req, res) => {
  // Obtenemos el tipo del body
  const tipo = req.body.tipo;
  // Obtenemos el mensaje del body
  const mensaje = req.body.mensaje;
  console.log(req.body);
  // Añadir un mensaje
  await mensajeSchema(mensaje)
    .save()
    .then(async (result) => {
      console.log(result);
      await chatSchema
        .findOneAndUpdate(
          { tipo: tipo },
          { $push: { mensaje: result._id } },
          { new: true }
        )
        .then(() => {
          res.json({ respuesta: true });
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.get("/getchat/:tipo", async (req, res) => {
  const tipo = req.params.tipo;
  const chat = await chatSchema
    .findOne({ tipo: tipo })
    .populate({ path: "mensaje" })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

module.exports = router;
