import { Socket } from "socket.io";

export type ID = string;    // in our case we will use the wallet address
export type Name = string;  // user can choose the name

export interface Instance {
  uid: ID;
  name: Name;
  roomID: string;
  connection: Socket;
  data: any;
}