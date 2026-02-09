import { useState, type ChangeEvent } from 'react';
import { useToast } from '../../../shared/hooks/useToast';
import { useGroupStore } from '../stores/useGroupStore';
import type { Group } from '../types/group.types';
import { groupService } from '../service/groupService';

interface UpdateGroupResult {
  success: boolean;
  error?: string;
  data?: Group;
}

interface UpdateGroupErrors {
  name?: string;
  description?: string;
}

export const useUpdateGroup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { updateGroup } = useGroupStore();
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [errors, setErrors] = useState<UpdateGroupErrors>({});

  const validateForm = (): boolean => {
    const newErrors: UpdateGroupErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'O nome do grupo é obrigatório';
    } else if (formData.name.length < 2) {
      newErrors.name = 'O nome do grupo deve ter ao menos 2 caracteres';
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const update = async (
    groupId: string,
    data: Partial<Group>,
  ): Promise<UpdateGroupResult | null> => {
    if (!validateForm()) return null;
    setIsLoading(true);

    try {
      const updatedGroup = await groupService.updateGroup(groupId, data);
      updateGroup(groupId, updatedGroup);
      addToast('Grupo atualizado com sucesso!', 'success');
      return { success: true, data: updatedGroup };
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Erro ao atualizar grupo';
      addToast(errorMessage, 'error');
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const setField = (name: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setField(name as keyof typeof formData, value);
  };

  return { errors, isLoading, formData, handleChange, update };
};
