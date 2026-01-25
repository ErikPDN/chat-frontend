import api from "../../../shared/utils/api";
import type { CreateGroupRequest } from "../types/group.types";

export const groupService = {
  getAllGroups: async () => {
    const response = await api.get("/groups");
    return response.data;
  },

  createGroup: async (groupData: CreateGroupRequest) => {
    const response = await api.post("/groups", groupData);
    return response.data;
  },

  getGroupById: async (groupId: string) => {
    const response = await api.get(`/groups/${groupId}`);
    return response.data;
  }
}
