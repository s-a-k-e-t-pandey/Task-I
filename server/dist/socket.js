"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
let io;
const initSocket = (httpServer) => {
    if (io) {
        console.warn('Socket is already initialized. Returning existing instance.');
        return io;
    }
    exports.io = io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);
        socket.on('disconnect', (reason) => {
            console.log(`Client disconnected: ${socket.id} (Reason: ${reason})`);
        });
    });
    return io;
};
exports.initSocket = initSocket;
