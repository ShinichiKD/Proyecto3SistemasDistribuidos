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
const { emit } = require('process');
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
const connectedUsers =[];
io.on('connection', (socket) => {
  // Obtener userID y username directamente de la query
  const userID = socket.handshake.query.userID;
  const username = socket.handshake.query.username;

  console.log('Usuario conectado con ID:', userID, 'Username:', username);
  connectedUsers[userID] = { id: userID, username: username };
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

  // Un usuario se une a un canal específico
  socket.on('join channel', (channel) => {
    socket.join(channel);
    console.log(`Usuario ${socket.id} se ha unido al canal: ${channel}`);
  });

  // Unirse a una sala privada
  socket.on('join private room', (roomID) => {
    socket.join(roomID);
    console.log(`Usuario ${socket.id} se ha unido a la sala privada: ${roomID}`);
  });

  // Manejar mensaje de chat
  socket.on('chat message', (msg) => {
    const room = msg.canal;
    io.to(room).emit('chat message', msg);
    console.log('message:', msg);
  });
  // Manejar mensaje de broadcast
socket.on('emergencia', (msg) => {
  io.emit('emergencia', msg);
  console.log('Mensaje de emergencai:', msg);
});

  socket.on('disconnect', () => {
    console.log('Usuario desconectado con ID:', userID);
    // Eliminar el usuario utilizando el userID en lugar del socket.id
    delete connectedUsers[userID];
    // Actualizar la lista de usuarios conectados
    io.emit('update user list', Object.values(connectedUsers));
});
});

// Puerto
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}
);