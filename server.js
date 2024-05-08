const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const dbClient = require('./db');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Manejo de notificaciones de la base de datos
dbClient.on('notification', (msg) => {
  if (msg.channel === 'friend_update') {
    const payload = JSON.parse(msg.payload);

    // Emitir a todos los clientes conectados con la información del cambio
    io.emit('data_update', {
      table: 'my_friends',  // Nombre de la tabla
      action: payload.action,  // Tipo de cambio
      previous_data: payload.old_data,  // Valor anterior
      new_data: payload.new_data  // Valor nuevo
    });
  }
});

app.get('/', (req, res) => {
  res.send('Backend is running.');
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
