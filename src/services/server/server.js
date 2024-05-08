// server.js
import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { AlldbServices } from '../indexServices';
import MyFriend from '../../models/my_friends.model';

const { dbServices } = AlldbServices;

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

// Manejo de notificaciones de la base de datos
dbServices.config.query('LISTEN friend_update');

dbServices.config.connectionManager.pool.on('notification', async (msg) => {
  if (msg.channel === 'friend_update') {
    const payload = JSON.parse(msg.payload);

    // Obtener el registro actualizado utilizando el modelo MyFriend
    const friend = await MyFriend.findByPk(payload.friend_id);

    // Emitir a todos los clientes conectados con la información del cambio
    io.emit('data_update', {
      table: 'my_friends',  // Nombre de la tabla
      action: payload.action,  // Tipo de cambio
      previous_data: payload.old_data,  // Valor anterior
      new_data: friend.toJSON()  // Nuevo registro obtenido del modelo MyFriend
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
