import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';

export function Community() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);
  const [note, setNote] = useState<string>('');
  const [selectedGroup, setSelectedGroup] = useState<{ name: string } | null>(null);
  const [requestedGroups, setRequestedGroups] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const categories: string[] = [
    'All',
    'Postpartum Hypertension',
    'Anal Incontinence',
    'Obesity',
    'Diabetes Mellitus',
    'Dyspareunia',
  ];

  const groups = [
    { name: "Postpartum Hypertension", members: 156, description: "Join the Postpartum Hypertension Community to connect with experts and peers.", category: "Postpartum Hypertension" },
    { name: "Hypertension Management 101", members: 243, description: "Discussion group on hypertension management strategies.", category: "Postpartum Hypertension" },
    { name: "Exercise and Wellness Postpartum", members: 200, description: "Guidance on exercise and wellness for postpartum recovery.", category: "Obesity" },
    { name: "Ask the Experts: Hypertension Q&A", members: 237, description: "Ask questions directly to medical professionals regarding hypertension.", category: "Diabetes Mellitus" },
    { name: "Heart Health for New Moms", members: 103, description: "Community dedicated to heart health for new mothers.", category: "Dyspareunia" }
  ];

  const filteredGroups = groups.filter(group => 
    (selectedCategory === 'All' || group.category === selectedCategory) &&
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <Header onSearch={setSearchQuery} />
        <div className="flex-1 px-6 py-12 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Categories */}
            <div className="my-8">
              <h2 className="text-xl font-semibold mb-4">Community Topics</h2>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 shadow-md hover:shadow-lg ${
                      selectedCategory === category ? 'bg-[#A32E76] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Groups */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Groups You Can Join</h2>
              {filteredGroups.map((group) => (
                <div key={group.name} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="font-medium text-lg">{group.name}</h3>
                  <p className="text-sm text-gray-600 mt-2">{group.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-gray-500">{group.members} Members</span>
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
                Your request to join "{selectedGroup?.name}" has been sent.
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