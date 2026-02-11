import { Camera, User, X } from 'lucide-react';
import { useUpdateGroup } from '../hooks/useUpdateGroup';
import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import Input from '../../../shared/components/Input';
import Button from '../../../shared/components/Button';

interface EditGroupModalProps {
  onClose: () => void;
}

export default function EditGroupModal({ onClose }: EditGroupModalProps) {
  const { update, isLoading, formData, errors, handleChange } =
    useUpdateGroup();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [groupImage, setGroupImage] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    update('groupId', formData); // Replace 'groupId' with the actual group ID
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setGroupImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
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

        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-30 h-30 rounded-full bg-blue-200 flex items-center justify-center self-center relative"
        >
          {groupImage ? (
            <img
              src={groupImage}
              alt="Grupo"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User size={48} className="text-blue-600" />
          )}

          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-white absolute bottom-0 right-0 rounded-full p-2 cursor-pointer"
          >
            <Camera size={20} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col p-3 gap-4">
          <Input
            id="name"
            name="name"
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
            id="description"
            name="description"
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
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
