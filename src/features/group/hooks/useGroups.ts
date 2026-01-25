import { useEffect, useState } from "react";
import { useToast } from "../../../shared/hooks/useToast";
import type { Group } from "../types/group.types";
import { groupService } from "../service/groupService";

export const useGroups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
  }, [addToast]);

  return { groups, isLoading };
};
