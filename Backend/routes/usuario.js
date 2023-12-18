const express = require('express');
const router = express.Router();

// importar el modelo nota
const usuarioSchema = require('../models/usuario');


router.post("/addUsuario", async (req, res) => {
  const body = req.body;

  const usuario = usuarioSchema(body);
  await usuario
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});
router.post("/login", async (req, res) => {
  const body = req.body;
  console.log(body);
  await usuarioSchema
    .findOne({
      correo: body.correo,
      contra: body.contra,
    })
    .then((result) => {
      if (result) {
        res.json({ respuesta: true, usuario: result });
        
      } else {
        res.json({ respuesta: false, usuario: result });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});
router.get("/getUsuarios", async (req, res) => {
  
  await usuarioSchema
    .find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});
router.put("/updateUsuario", async (req, res) => {

  await usuarioSchema.findOneAndUpdate({_id: req.body._id}, req.body, {new: true})
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  });

});

module.exports = router;
