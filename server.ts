/* eslint-disable @typescript-eslint/no-explicit-any */
import { parse } from 'node:url';
import { createServer } from 'node:http';
import next from 'next';
import { Server as SocketIOServer } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  // Cria o servidor HTTP padrão
  const server = createServer((req, res) => {
    handle(req, res, parse(req.url || '', true));
  });

  // Cria o servidor Socket.IO vinculado ao HTTP
  const io = new SocketIOServer(server, {
    path: '/api/socket',
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  // Quando um novo cliente se conecta
  io.on('connection', (socket: any) => {
    console.log('Novo cliente conectado:', socket.id);

    socket.on('moviment', (data: any) => {
      console.log('Movimentação recebida:', data);
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
    });
  });

  // Inicia o servidor
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});
