// Slice of store that manages Socket connections
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Room = {
  id: string,
  password: string
}

export interface SocketState {
  isConnected: boolean;
  rooms: Room[];
}

const initialState: SocketState = {
  isConnected: false,
  rooms: [],
};

type RoomAction = PayloadAction<{
  room: string;
}>;

// Now create the slice
const socketSlice = createSlice({
  name: "socket",
  initialState,
  // Reducers: Functions we can call on the store
  reducers: {
    initSocket: (state) => {
      return;
    },
    connectionEstablished: (state) => {
      state.isConnected = true;
    },
    connectionLost: (state) => {
      state.isConnected = false;
    },

    createNewRoom: (state, action: PayloadAction<{password: string}>) => {
      // not store for the request, waiting for the server to confirm before joining
      return;
    },    
    joinRoom: (state, action: PayloadAction<Room>) => {
      // not store for the request, waiting for the server to confirm before joining
      return;
    },
    leaveRoom: (state, action: RoomAction) => {
      // not store for the request, waiting for the server to confirm before leaving
      return;
    },

    roomJoined: (state, action: PayloadAction<Room>) => {
      // After the socket receive the event from the server in the middleware
      state.rooms = state.rooms.concat(action.payload);
      return;
    },
    roomLeaved: (state) => {
      // After the socket receive the event from the server in the middleware
      state.rooms = [];
      return;
    },
  },
});

// Don't have to define actions, they are automatically generated
export const socketActions = socketSlice.actions;
// Export the reducer for this slice
export default socketSlice.reducer;