import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import RoomManager from './RoomManager';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

const PORT = 3020;

const manager = new RoomManager(io);

app.get('/', (req, res) => {
  res.status(200).send('Running');
});

// Listen to general connection event
io.on('connection', (socket) => {
  console.log('a user connected');

  // Socket request to create a member (this is done after a user connect his wallets)
  socket.on("createMember", (walletAddress) => {
    /**
     * This function adds the member to an interal list
     * of members and returns the created member
     */
    const newMember = manager.createMember(walletAddress, 'test', socket);
    console.log("New member created:", newMember.uid, newMember.name);
  });

  // Socket request to create a room
  // for the moment the password can be empty
  socket.on("createNewRoom", (password: string) => {
    const member = manager.getMemberByConnectionID(socket.id);

    /**
     * Create a new room with uid base on the wallet of admin
     */
    const roomId = member.uid + '000' + Math.floor(Math.random() * 100) + 1;
    manager.addMemberToRoom(member, roomId, password);
    const room = manager.getRoomByID(roomId);
    console.log('Room created:', room);
    socket.emit('roomCreated', roomId);
  });
  
  // Socket requests to be added to a room
  socket.on("joinRoom", ({ roomID, password }) => {
    const member = manager.getMemberByConnectionID(socket.id);
    console.log('Want to join a room');
    console.log('room id:', roomID);
    console.log('password:', password);

    try {
      // check if room exist first
      if (!manager.getRoomByID(roomID))
        throw Error("Can't join room: room doesn't exist.");
      manager.addMemberToRoom(member, roomID, password);
      socket.emit('roomJoined', roomID);
    } catch (e) {
      console.log(e);
      socket.emit('error', e);
    }
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