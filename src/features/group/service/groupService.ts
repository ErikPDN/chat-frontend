import api from '../../../shared/utils/api';
import type {
  CreateGroupRequest,
  UpdateGroupRequest,
} from '../types/group.types';

export const groupService = {
  getAllGroups: async () => {
    const response = await api.get('/groups');
    return response.data;
  },

  createGroup: async (groupData: CreateGroupRequest) => {
    const response = await api.post('/groups', groupData);
    return response.data;
  },

  getGroupById: async (groupId: string) => {
    const response = await api.get(`/groups/${groupId}`);
    return response.data;
  },

  updateGroup: async (groupId: string, data: Partial<UpdateGroupRequest>) => {
    const response = await api.put(`/groups/${groupId}`, data);
    return response.data;
  },
};
