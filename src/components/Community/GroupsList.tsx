import { useState } from 'react';
import { GroupCard } from './GroupCard';
import { JoinRequestModal } from './JoinRequestModal';
import { Group } from './types';
import { FaCheckCircle } from 'react-icons/fa';

interface GroupsListProps {
  groups: Group[];
}

function GroupsList({ groups }: GroupsListProps) {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [requestedGroups, setRequestedGroups] = useState<string[]>([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleJoinRequest = () => {
    if (selectedGroup) {
      setRequestedGroups(prev => [...prev, selectedGroup.name]);
      setSelectedGroup(null);
      setShowSuccessPopup(true);
    }
  };

  return (
    <main className="flex-1 p-8 bg-gray-100">
      <h2 className="text-2xl font-bold mb-8 text-[#5e17eb]">Available Groups</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {groups.map(group => (
          <GroupCard
            key={group.name}
            group={group}
            onJoinRequest={setSelectedGroup}
            isRequested={requestedGroups.includes(group.name)}
          />
        ))}
      </div>

      <JoinRequestModal
        group={selectedGroup}
        onClose={() => setSelectedGroup(null)}
        onSubmit={handleJoinRequest}
      />

      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <div className="flex flex-col items-center">
              <FaCheckCircle className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold text-center">
                Request Sent Successfully!
              </h3>
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="mt-6 px-4 py-2 bg-[#5e17eb] text-white text-sm rounded-full 
                             hover:bg-[#8e2968] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default GroupsList;
