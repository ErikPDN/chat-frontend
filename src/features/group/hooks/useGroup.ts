import { useEffect, useState } from 'react';
import { useToast } from '../../../shared/hooks/useToast';
import type { Group } from '../types/group.types';
import { groupService } from '../service/groupService';

export const useGroup = (groupId: string) => {
  const [group, setGroup] = useState<Group | null>(null);
  const [isLoadingMembers, setIsLoadingMembers] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchGroup = async () => {
      setIsLoadingMembers(true);
      try {
        const data = await groupService.getGroupById(groupId);
        setGroup(data);
      } catch (error) {
        const errorMessage =
          (error as any).response?.data?.message || 'Erro ao carregar grupo';
        addToast(errorMessage, 'error');
      } finally {
        setIsLoadingMembers(false);
      }
    };
    fetchGroup();
  }, [groupId, addToast]);

  return { group, isLoadingMembers };
};
