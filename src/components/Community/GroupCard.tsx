import { Group } from './types';

interface GroupCardProps {
  group: Group;
  onJoinRequest: (group: Group) => void;
  isRequested: boolean;
}

export function GroupCard({ group, onJoinRequest, isRequested }: GroupCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg 
                    transition-shadow duration-300 flex flex-col items-center text-center">
      <h3 className="font-semibold text-xl text-gray-800">{group.name}</h3>
      <p className="text-sm text-gray-600 mt-2 line-clamp-3">
        {group.description}
      </p>
      <span className="text-xs text-gray-500 mt-auto">
        {group.members} Members
      </span>
      <div className="mt-4">
        {isRequested ? (
          <span className="text-sm text-green-500">Request Sent</span>
        ) : (
          <button
            onClick={() => onJoinRequest(group)}
            className="px-4 py-2 bg-[#a32e76] text-white text-sm rounded-full 
                     hover:bg-[#8e2968] transition-colors"
          >
            Request to Join
          </button>
        )}
      </div>
    </div>
  );
}