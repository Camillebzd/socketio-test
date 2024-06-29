import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import RoomManager from './RoomManager';

const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = 3020;

const manager = new RoomManager(io);

app.get('/', (req, res) => {
  res.status(200).send('Running');
});

// Listen to general connection event
io.on('connection', (socket) => {
  console.log('a user connected');

  // Socket requests to be added to a room
  socket.on("joinRoom", ({ walletAddress, name, roomID }) => {
    /**
     * This function adds the member to an interal list
     * of members and returns the created member
     */
    const newMember = manager.createMember(walletAddress, name, socket);

    /**
     * Add him to a room. If a room doesn't exist
     * yet it will be created 
     */
    manager.addMemberToRoom(newMember, roomID);
  });

  // Socket requests to leave a room
  socket.on("leaveRoom", ({ walletAddress, roomID }) => {
    const member = manager.getMemberByID(walletAddress);

    manager.removeMemberFromRoom(member, roomID);
  });
});

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});