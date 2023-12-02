const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();


// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

// Socket.io de la Wea
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});
let waitingUser = null;
const connectedUsers = {};
io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);
  connectedUsers[socket.id] = { id: socket.id, username: 'NombreUsuario' }; 
  // Emitir la lista actualizada de usuarios conectados a todos los clientes
  io.emit('update user list', Object.values(connectedUsers));
  

  if (waitingUser) {
    // Si hay un usuario esperando, agrégalo a la misma sala
    const room = `room_${waitingUser.id}_${socket.id}`;
    waitingUser.join(room);
    socket.join(room);
    io.to(room).emit('room joined', room);
    // Reiniciar waitingUser
    waitingUser = null;
  } else {
    waitingUser = socket;
  }

  socket.on('chat message', (msg) => {
    const room = Array.from(socket.rooms)[1];
    io.to(room).emit('chat message', msg);
    console.log('message:', msg);
  });

  socket.on('user connect', (user) => {
    const room = Array.from(socket.rooms)[1];
    io.to(room).emit('user connect', user);
    console.log('user:', user);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
    delete connectedUsers[socket.id];
    io.emit('update user list', Object.values(connectedUsers));
  });
});

// Puerto
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}
);