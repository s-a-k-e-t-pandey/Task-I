import { Server } from 'socket.io';
import * as http from 'http';


let io;

export const initSocket = (httpServer: http.Server) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*", 
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
  });

  return io;
};

export { io };
