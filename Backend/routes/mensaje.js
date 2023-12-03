import express from 'express';
const router = express.Router();

// importar el modelo nota
import mensajeSchema from '../models/mensaje';



router.post('/addmensaje', async(req, res) => {
  const body = req.body;  
 
  const mensaje = mensajeSchema(body)       
  await mensaje.save()
  .then((result) => {
    res.json(result)
    
  })
  .catch((err) => {
    console.log(err)
    res.json(err)
  }); 
  }
);




module.exports = router;