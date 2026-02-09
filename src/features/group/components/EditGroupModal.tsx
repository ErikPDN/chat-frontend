import { Camera, User, X } from 'lucide-react';
import { useUpdateGroup } from '../hooks/useUpdateGroup';
import type { FormEvent } from 'react';
import Input from '../../../shared/components/Input';
import Button from '../../../shared/components/Button';

interface EditGroupModalProps {
  onClose: () => void;
}

export default function EditGroupModal({ onClose }: EditGroupModalProps) {
  const { update, isLoading, formData, errors, handleChange } =
    useUpdateGroup();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    update('groupId', formData); // Replace 'groupId' with the actual group ID
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center background-blur-sm p-4">
      <div className="bg-zinc-800 rounded-2xl shadow-2xl w-full max-w-md flex flex-col p-3 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl text-white font-bold mx-2">Editar Grupo</h2>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-700/50 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="w-30 h-30 rounded-full bg-blue-200 flex items-center justify-center self-center relative">
          <User size={48} className="text-blue-600" />

          <button
            onClick={() => console.log('Change avatar')} // TODO: Implement change avatar functionality
            className="bg-white absolute bottom-0 right-0 rounded-full p-2 cursor-pointer"
          >
            <Camera size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col p-3 gap-4">
          <Input
            id="groupName"
            name="groupName"
            type="text"
            placeholder="Digite o nome do grupo"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            disabled={isLoading}
            autoFocus
            className="text-white"
          />

          <Input
            id="groupDescription"
            name="groupDescription"
            type="text"
            placeholder="Digite a descrição do grupo"
            value={formData.description}
            onChange={handleChange}
            error={errors.description}
            disabled={isLoading}
            className="text-white"
          />

          <p className="text-sm text-zinc-400 text-justify mx-4">
            As descrições dos grupos serão visíveis para os membros deste grupo
            e para as pessoas que foram convidadas.
          </p>

          <div className="flex justify-end gap-3 mt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="w-24"
              disabled={isLoading}
            >
              Cancelar
            </Button>

            <Button type="submit" isLoading={isLoading} className="w-24">
              Adicionar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
