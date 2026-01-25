import type { User } from "../../user/types/user.types";

export interface Group {
  _id: string;
  name: string;
  description: string;
  creatorId: User;
  membersId: User[];
  adminsId: User[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateGroupRequest {
  name: string;
  description: string;
  membersId: string[];
}

