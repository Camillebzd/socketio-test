import { Middleware } from "redux";
// Actions
import { Room, socketActions } from "./socketSlice";
// Socket Factory
import SocketFactory from "@/sockets/SocketFactory";
import type { SocketInterface } from "@/sockets/SocketFactory";
import { connect } from "./authSlice";

enum SocketEvent {
  // Native events
  Connect = "connect",
  Disconnect = "disconnect",
  // Emit events
  CreateMember = "createMember",
  CreateNewRoom = "createNewRoom",
  JoinRoom = "joinRoom",
  LeaveRoom = "leaveRoom",
  EnterFight = "enterFight",
  SelectSkill = "selectSkill",
  // On events
  Error = "err",
  RoomCreated = "roomCreated",
  RoomJoined = "roomJoined",
  RoomLeaved = "roomLeaved",
  SkillSelected = "skillSelected",
  AllSkillsSelected = "allSkillsSelected",
  AllEntities = "allEntities"
}

const socketMiddleware: Middleware = (store) => {
  let socket: SocketInterface;

  return (next) => (action) => {
    // Middleware logic for the `initSocket` action
    if (socketActions.initSocket.match(action)) {
      if (!socket && typeof window !== "undefined") {
        // Client-side-only code
        // Create/ Get Socket Socket
        socket = SocketFactory.create();

        socket.socket.on(SocketEvent.Connect, () => {
          store.dispatch(socketActions.connectionEstablished());
          console.log("socket connected.");
        });

        // handle all Error events
        socket.socket.on(SocketEvent.Error, (message) => {
          console.error(message);
          // TODO dispatch errors and create an error provider at
          // the route of the project to handle them
        });

        // Handle disconnect event
        socket.socket.on(SocketEvent.Disconnect, (reason) => {
          store.dispatch(socketActions.connectionLost());
          console.log("socket disconnected.");
        });

        // Handle the creation of a room
        socket.socket.on(SocketEvent.RoomCreated, (data) => {
          store.dispatch(socketActions.roomJoined(data));
          console.log("Room created:", data.id);
        });

        // Handle the joining of a room
        socket.socket.on(SocketEvent.RoomJoined, (data) => {
          store.dispatch(socketActions.roomJoined(data));
          console.log("Room joined:", data.id);
        });

        // Handle the leaving of a room
        socket.socket.on(SocketEvent.RoomLeaved, (roomId) => {
          store.dispatch(socketActions.roomLeaved(roomId));
          console.log("Room leaved:", roomId);
        });

        // Handle the selection of a skill by a player in the room
        socket.socket.on(SocketEvent.SkillSelected, (data) => {
          store.dispatch(socketActions.skillSelected(data));
          console.log("Skill selected:", data);
        });

        // Retrieve all the skills from all the players
        socket.socket.on(SocketEvent.AllSkillsSelected, (data) => {
          store.dispatch(socketActions.allSkillsSelected(data));
          console.log("Update all the skills:", data);
        });

        // Retrieve all the members
        socket.socket.on(SocketEvent.AllEntities, (data) => {
          store.dispatch(socketActions.allEntities(data));
          console.log("Retrieved all the members:", data);
        });
      }
    }

    // Listen for the user to connect using the auth Slice to create the user on the server
    if (connect.match(action) && socket) {
      socket.socket.emit(SocketEvent.CreateMember, action.payload);
    }

    // handle create a room action
    if (socketActions.createNewRoom.match(action) && socket) {
      // Ask to create a room to the server
      socket.socket.emit(SocketEvent.CreateNewRoom, action.payload.password);
    }

    // handle the joinRoom action
    if (socketActions.joinRoom.match(action) && socket) {
      const roomId = action.payload.id;
      const password = action.payload.password;
      // Join room
      socket.socket.emit(SocketEvent.JoinRoom, { roomId, password });
      // Then Pass on to the next middleware to handle state
      // ...
    }

    // handle leaveRoom action
    if (socketActions.leaveRoom.match(action) && socket) {
      let room = action.payload.room;
      socket.socket.emit(SocketEvent.LeaveRoom, room);
      // Then Pass on to the next middleware to handle state
      // ...
    }

    // handle enterFight action
    if (socketActions.enterFight.match(action) && socket) {
      socket.socket.emit(SocketEvent.EnterFight, action.payload);
      // Then Pass on to the next middleware to handle state
      // ...
    }

    // handle selectSkill action
    if (socketActions.selectSkill.match(action) && socket) {
      socket.socket.emit(SocketEvent.SelectSkill, action.payload);
      // Then Pass on to the next middleware to handle state
      // ...
    }

    next(action);
  };
};

export default socketMiddleware;