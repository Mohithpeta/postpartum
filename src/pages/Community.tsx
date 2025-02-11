import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';

export function Community() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);
  const [note, setNote] = useState<string>('');
  const [selectedGroup, setSelectedGroup] = useState<{ name: string } | null>(null);
  const [requestedGroups, setRequestedGroups] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const groups = [
    { name: "Postpartum Hypertension", members: 156, description: "Join the Postpartum Hypertension Community to connect with experts and peers.", category: "Hypertension" },
    { name: "Hypertension Management 101", members: 243, description: "Discussion group on hypertension management strategies.", category: "Hypertension" },
    { name: "Exercise and Wellness Postpartum", members: 200, description: "Guidance on exercise and wellness for postpartum recovery.", category: "Obesity" },
    { name: "Ask the Experts: Hypertension Q&A", members: 237, description: "Ask questions directly to medical professionals regarding hypertension.", category: "Hypertension" },
    { name: "Heart Health for New Moms", members: 103, description: "Community dedicated to heart health for new mothers.", category: "Urinary Incontinence" }
  ];

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = selectedTopic === 'All' || group.category === selectedTopic;
    return matchesSearch && matchesTopic;
  });

  const handleJoinGroup = (group: { name: string }) => {
    setSelectedGroup(group);
    setShowPopup(true);
  };

  const handleSendNow = () => {
    if (selectedGroup) {
      setIsLoading(true);
      setTimeout(() => {
        setRequestedGroups(prev => [...prev, selectedGroup.name]);
        setShowPopup(false);
        setNote('');
        setSelectedGroup(null);
        setIsLoading(false);
        setShowSuccessPopup(true);
      }, 1000); // Simulate a network request delay
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onSearch={setSearchQuery} 
          onTopicChange={(topic) => setSelectedTopic(topic)}
        />
        <div className="flex-1 px-6 py-12 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-semibold mb-8">Community For You</h2>

            {/* Groups */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGroups.map((group) => (
                <div 
                  key={group.name} 
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center w-64 h-64"
                >
                  {/* Group Name */}
                  <h3 className="font-semibold text-lg text-gray-800">{group.name}</h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {group.description}
                  </p>
                  
                  {/* Members Count */}
                  <span className="text-xs text-gray-500 mt-auto">
                    {group.members} Members
                  </span>
                  
                  {/* Action Button */}
                  <div className="mt-4">
                    {requestedGroups.includes(group.name) ? (
                      <span className="text-sm text-green-500">Request Sent</span>
                    ) : (
                      <button
                        onClick={() => handleJoinGroup(group)}
                        className="px-4 py-2 bg-[#A32E76] text-white text-sm rounded-full hover:bg-[#8E2968] transition-all"
                      >
                        Request to Join
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Join Request Modal */}
      {showPopup && selectedGroup && (
        <div style={{ animation: 'fadeIn 0.3s ease-in-out' }} className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Join {selectedGroup?.name}</h3>
              <button onClick={() => setShowPopup(false)}>
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Add a note (optional):
            </p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-2 w-full h-20 border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A32E76]"
              placeholder="Write your note here..."
            />
            <button
              onClick={handleSendNow}
              disabled={isLoading}
              className="mt-4 w-full py-2 bg-[#A32E76] text-white text-sm font-medium rounded-md hover:bg-[#8E2968] transition-all disabled:opacity-50"
            >
              {isLoading ? 'Sending...' : 'Send Now'}
            </button>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div style={{ animation: 'fadeIn 0.3s ease-in-out' }} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <div className="flex flex-col items-center">
              <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold text-center">Request Sent Successfully!</h3>
              <p className="text-sm text-gray-600 text-center mt-2">
                Your request to join the group has been sent.
              </p>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-4">
                <div style={{ animation: 'progress 1.5s ease-in-out' }} className="bg-green-500 h-1.5 rounded-full" />
              </div>
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="mt-6 px-4 py-2 bg-[#A32E76] text-white text-sm rounded-full hover:bg-[#8E2968] transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inline CSS for animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes progress {
            from { width: 0; }
            to { width: 100%; }
          }
        `}
      </style>
    </div>
  );
}