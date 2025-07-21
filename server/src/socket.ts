import { Server, Socket } from 'socket.io'; 
import * as http from 'http';

let io: Server | undefined; 

export const initSocket = (httpServer: http.Server): Server => { 
  if (io) {
    console.warn('Socket is already initialized. Returning existing instance.');
    return io;
  }

  io = new Server(httpServer, {
    cors: {
      origin: "*", 
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket: Socket) => { 
    console.log('Client connected:', socket.id);

    socket.on('disconnect', (reason: string) => {
      console.log(`Client disconnected: ${socket.id} (Reason: ${reason})`);
    });
  });

  return io;
};

export {io};