import GroupCard from '../../../shared/components/GroupCard';
import { useGroups } from '../hooks/useGroups';

export default function GroupList() {
  const { groups, isLoading } = useGroups();

  if (isLoading) {
    return <div>Carregando grupos...</div>;
  }

  return (
    <div className="space-y-2">
      {groups.map((group) => (
        <GroupCard
          key={group._id}
          group={group}
          onClick={() => {/* navegar para chat do grupo */ }}
        />
      ))}
    </div>
  );
}
