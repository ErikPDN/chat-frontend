import { useState } from 'react';
import { groupService } from '../service/groupService';
import type { CreateGroupRequest, Group } from '../types/group.types';

interface CreateGroupResult {
  success: boolean;
  data?: Group;
  error?: string;
}

export const useCreateGroup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createGroup = async (data: CreateGroupRequest): Promise<CreateGroupResult> => {
    setIsLoading(true);
    try {
      const newGroup = await groupService.createGroup(data);
      return { success: true, data: newGroup };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erro ao criar grupo';
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { createGroup, isLoading };
};
