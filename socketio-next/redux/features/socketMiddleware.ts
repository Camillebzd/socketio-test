import { Middleware } from "redux";
// Actions
import {
  connectionEstablished,
  joinRoom,
  leaveRoom,
  initSocket,
  connectionLost,
} from "./socketSlice";
import { setPrice } from "@/data/Features/price/priceSlice";
// Socket Factory
import SocketFactory from "../../sockets/SocketFactory";
import type { SocketInterface } from "../../sockets/SocketFactory";
// Types
import { IPriceMessage } from "@/types/socket";

enum SocketEvent {
  Connect = "connect",
  Disconnect = "disconnect",
  // Emit events
  JoinRoom = "join-room",
  LeaveRoom = "leave-room",
  // On events
  Error = "err",
  Price = "price",
}

const socketMiddleware: Middleware = (store) => {
  let socket: SocketInterface;

  return (next) => (action) => {
    // Middleware logic for the `initSocket` action
    if (initSocket.match(action)) {
      if (!socket && typeof window !== "undefined") {
        // Client-side-only code
        // Create/ Get Socket Socket
        socket = SocketFactory.create();

        socket.socket.on(SocketEvent.Connect, () => {
          store.dispatch(connectionEstablished());
        });

        // handle all Error events
        socket.socket.on(SocketEvent.Error, (message) => {
          console.error(message);
        });

        // Handle disconnect event
        socket.socket.on(SocketEvent.Disconnect, (reason) => {
          store.dispatch(connectionLost());
        });

        // Handle all price events
        socket.socket.on(SocketEvent.Price, (priceMessage: IPriceMessage) => {
          store.dispatch(setPrice(priceMessage.value));
        });
      }
    }

    // handle the joinRoom action
    if (joinRoom.match(action) && socket) {
      let room = action.payload.room;
      // Join room
      socket.socket.emit(SocketEvent.JoinRoom, room);
      // Then Pass on to the next middleware to handle state
      // ...
    }

    // handle leaveRoom action
    if (leaveRoom.match(action) && socket) {
      let room = action.payload.room;
      socket.socket.emit(SocketEvent.LeaveRoom, room);
      // Then Pass on to the next middleware to handle state
      // ...
    }
    next(action);
  };
};

export default socketMiddleware;