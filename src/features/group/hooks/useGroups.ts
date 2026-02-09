import { useEffect } from 'react';
import { useToast } from '../../../shared/hooks/useToast';
import { groupService } from '../service/groupService';
import { useGroupStore } from '../stores/useGroupStore';

export const useGroups = () => {
  const { groups, isLoading, setGroups, setIsLoading } = useGroupStore();
  const { addToast } = useToast();

  useEffect(() => {
    const fetchGroups = async () => {
      setIsLoading(true);
      try {
        const data = await groupService.getAllGroups();
        setGroups(data);
      } catch (error) {
        const errorMessage =
          (error as any).response?.data?.message || 'Erro ao carregar grupos';
        addToast(errorMessage, 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroups();
  }, [addToast, setGroups, setIsLoading]);

  return { groups, isLoading };
};
