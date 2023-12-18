const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();


const URL='mongodb+srv://sistemasdistribuidosproyecto3:kRtvoXObVBrTJoDe@cluster0.c8buvrs.mongodb.net/?retryWrites=true&w=majority';

const options = {useNewUrlParser: true};
// Or using promises
mongoose.connect(URL, options).then(
  () => { console.log('Conectado a DB') },
  err => { console.log(err) }
);

// Middleware
app.use(morgan('tiny'));
const corsOptions = {
  origin: 'http://localhost:8080/', 
  optionsSuccessStatus: 200 // 
};
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Middleware para Vue.js router modo history


app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal que muestra "Hola Mundo"
app.get('/', (req, res) => {
    res.send('Hola Mundo');
});



app.use('/api', require('./routes/usuario'));
app.use('/api', require('./routes/mensaje'));
app.use('/api', require('./routes/chat'));
// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('puerto', process.env.PORT || 8080);
app.listen(app.get('puerto'), () => {
  console.log('Example app listening on port'+ app.get('puerto'));
});


