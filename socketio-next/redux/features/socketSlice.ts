// Slice of store that manages Socket connections
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SocketState {
  isConnected: boolean;
  rooms: string[];
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
    joinRoom: (state, action: RoomAction) => {
      // After the required room is joined through middleware, we manage state here!
      let rooms = action.payload.rooms;
      state.rooms = state.rooms.concat(room);
      return;
    },
    leaveRoom: (state, action: RoomAction) => {
      // After the required room is joined through middleware, we manage state here!
      let rooms = action.payload.rooms;
      state.rooms = [];
      return;
    },    
  },
});

// Don't have to define actions, they are automatically generated
export const {
  initSocket,
  connectionEstablished,
  connectionLost,
  joinRoom
} = socketSlice.actions;
// Export the reducer for this slice
export default socketSlice.reducer;