// Slice of store that manages Socket connections
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import * as Member from '../../../../socketio-server/src/@types/Member';
import { RoomId } from '../../../../socketio-server/src/@types/Room';
import { SkillsSelected, Skill } from '../../../../socketio-server/src/@types/Skill';

export type Room = {
  id: RoomId,
  password: string
  skillsSelected: { [id: Member.ID]: Skill }
  entities: { [id: Member.ID]: Member.FrontInstance }
};

export const DEFAULT_ROOM_ID = "NULL_ID";

const DefaultRoom = {
  id: DEFAULT_ROOM_ID,
  password: "",
  skillsSelected: {},
  entities: {}
};

export interface SocketState {
  isConnected: boolean;
  room: Room;
};

const initialState: SocketState = {
  isConnected: false,
  room: DefaultRoom
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

    createNewRoom: (state, action: PayloadAction<{ password: string }>) => {
      // not store for the request, waiting for the server to confirm before joining
      return;
    },
    joinRoom: (state, action: PayloadAction<{ id: RoomId, password: string }>) => {
      // not store for the request, waiting for the server to confirm before joining
      return;
    },
    leaveRoom: (state, action: RoomAction) => {
      // not store for the request, waiting for the server to confirm before leaving
      return;
    },
    enterFight: (state, action: PayloadAction<RoomId>) => {
      // not store for the request, waiting for the server to confirm before leaving
      return;
    },
    selectSkill: (state, action: PayloadAction<Skill>) => {
      // not store for the request, waiting for the server to confirm before leaving
      return;
    },

    roomJoined: (state, action: PayloadAction<{ id: RoomId, password: string }>) => {
      // After the socket receive the event from the server in the middleware
      state.room.id = action.payload.id;
      state.room.password = action.payload.password;
      // state.room.skillsSelected = new Map<Member.ID, Skill>();
      // state.room.entities = new Map<Member.ID, Member.Instance>();
      return;
    },
    roomLeaved: (state) => {
      // After the socket receive the event from the server in the middleware
      state.room = DefaultRoom;
      return;
    },
    skillSelected: (state, action: PayloadAction<{ [id: Member.ID]: Skill }>) => {
      // After the socket receive the event from the server in the middleware
      // state.room.skillsSelected.set(action.payload.member, action.payload.skill);
      state.room.skillsSelected = {... state.room.skillsSelected, ...action.payload};
      return;
    },
    allSkillsSelected: (state, action: PayloadAction<{ [id: Member.ID]: Skill }>) => {
      // After the socket receive the event from the server in the middleware
      // action.payload.forEach((value) => {
      //   if (state.room.skillsSelected)
      //     // state.room.skillsSelected.set(value.member, value.skill);
      //     state.room.skillsSelected[value.member] = value.skill;
      // });
      state.room.skillsSelected = action.payload;
      return;
    },
    allEntities: (state, action: PayloadAction<{ [id: Member.ID]: Member.FrontInstance }>) => {
      // After the socket receive the event from the server in the middleware
      // action.payload.forEach((value) => {
      //   if (state.room.entities)
      //     // state.room.entities.set(value.entityId, value.entity);
      //     state.room.entities[value.entityId] = value.entity;
      // });
      state.room.entities = action.payload;
      return;
    },
  },
});

// Don't have to define actions, they are automatically generated
export const socketActions = socketSlice.actions;
// Export the reducer for this slice
export default socketSlice.reducer;