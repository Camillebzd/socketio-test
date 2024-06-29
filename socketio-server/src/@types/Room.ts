import * as Member from "./Member";

export type ID = string;

export const DefaultID: ID = "unset";

export interface Instance {
  id: ID;
  members: Map<Member.ID, Member.Instance>;
  admin: Member.Instance;
  data: any;
}