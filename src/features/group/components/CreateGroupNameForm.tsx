import { ArrowLeft, Camera } from "lucide-react";
import { useState, useRef } from "react";
import { useCreateGroup } from "../hooks/useCreateGroup";
import { useToast } from "../../../shared/hooks/useToast";

interface CreateGroupNameFormProps {
  onBack: () => void;
  selectedMemberIds: string[];
  onSuccess?: () => void;
}

export default function CreateGroupNameForm(
  { onBack, selectedMemberIds, onSuccess }: CreateGroupNameFormProps
) {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupImage, setGroupImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { createGroup, isLoading } = useCreateGroup();
  const { addToast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setGroupImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim()) return;

    const result = await createGroup({
      name: groupName,
      description: groupDescription,
      membersId: selectedMemberIds,
    });

    if (result.success) {
      addToast('Grupo criado com sucesso!', 'success');
      onSuccess?.();
    } else {
      addToast(result.error || 'Erro ao criar grupo', 'error');
    }
  };

  return (
    <div className="flex flex-col h-full bg-zinc-900">
      <div className="h-16 flex items-center px-6">
        <button
          onClick={onBack}
          className="text-white hover:text-blue-400 transition-colors"
          aria-label="Voltar"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1 justify-center flex">
          <h1 className="text-lg text-white font-semibold mr-5">
            Nomear este grupo
          </h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-start pt-8 px-6">
        <div className="relative mb-8">
          <div
            className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-5xl cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => fileInputRef.current?.click()}
          >
            {groupImage ? (
              <img
                src={groupImage}
                alt="Grupo"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span>👥</span>
            )}
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-lg cursor-pointer"
            aria-label="Adicionar foto"

          >
            <Camera size={18} className="text-gray-800" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Nome do grupo (obrigatório)"
          className="w-full max-w-sm px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors mb-3"
        />

        <textarea
          value={groupDescription}
          onChange={(e) => setGroupDescription(e.target.value)}
          placeholder="Descrição do grupo (opcional)"
          rows={3}
          className="w-full max-w-sm px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none mb-6"
        />
      </div>

      <div className="flex justify-end p-6">
        <button
          onClick={handleCreateGroup}
          disabled={!groupName.trim() || isLoading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 disabled:cursor-not-allowed disabled:text-zinc-500 text-white font-bold px-6 py-2 rounded-lg transition-all cursor-pointer"
        >
          Criar
        </button>
      </div>
    </div>
  );
}
