import express from 'express';
const router = express.Router();

// importar el modelo nota
import chatSchema from '../models/chat';



router.post('/addchat', async(req, res) => {
  const body = req.body;  
 
  const chat = chatSchema(body)       
  await chat.save()
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