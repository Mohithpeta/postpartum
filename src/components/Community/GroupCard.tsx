import { Group } from "./types";
import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi"; // Three-dot menu
import { FaArrowRight } from "react-icons/fa"; // Arrow for button

interface GroupCardProps {
  group: Group;
  onJoinRequest: (group: Group) => void;
  isRequested: boolean;
}

export function GroupCard({ group, onJoinRequest, isRequested }: GroupCardProps) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      className={`flex bg-white rounded-lg shadow-lg p-4 border border-gray-200 relative 
                  transition-all cursor-pointer ${isSelected ? "border-2 border-[#a32e76]" : ""}`}
      onClick={() => setIsSelected(!isSelected)}
    >
      {/* Group Image */}
      <img
        src={group.image || "/default-group.png"} // Default if no image
        alt={group.name}
        className="rounded-lg object-cover w-[100px] h-[100px] mr-4"
      />

      {/* Group Details */}
      <div className="flex-1">
        {/* Menu Icon */}
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <FiMoreVertical size={20} />
        </button>

        <h3 className="text-lg font-bold text-gray-900">{group.name}</h3>

        {/* Join Button */}
        <div className="mt-4">
          {isRequested ? (
            <span className="text-sm text-green-500">Request Sent</span>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click effect
                onJoinRequest(group);
              }}
              className="flex items-center justify-center px-4 py-1 border-2 border-[#a32e76] 
                         text-[#a32e76] font-medium rounded-full hover:bg-[#a32e76] 
                         hover:text-white transition-colors text-sm"
            >
              Join Group <FaArrowRight className="ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
