/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { parse } from 'node:url';
import { createServer } from 'node:http';
import next from 'next';
import { Server as SocketIOServer } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

let players: Record<string, { x: number; y: number }> = {};

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

    players[socket.id] = { x: 0, y: 0 };

    socket.on('move', (dir: string) => {
      console.log('Movimentação recebida:', dir);
      const player = players[socket.id];
      if (!player) return;

      switch (dir) {
        case "ArrowLeft":
          player.x -= 1;
          break;
        case "ArrowRight":
          player.x += 1;
          break;
        case "ArrowUp":
          player.y -= 1;
          break;
        case "ArrowDown":
          player.y += 1;
          break;
      }

      // Envia a nova posição só para o jogador
      socket.emit("position", { userId: "123", position: player });

      // Se quiser atualizar todos os outros:
      // socket.broadcast.emit("playerMoved", { id: socket.id, ...player });
    });

    socket.on('rotate', (dir: string) => {
      console.log('Rotate recebida:', dir);
      

      // Envia a nova posição só para o jogador
      // socket.emit("rotate", player);

      // Se quiser atualizar todos os outros:
      // socket.broadcast.emit("playerMoved", { id: socket.id, ...player });
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
