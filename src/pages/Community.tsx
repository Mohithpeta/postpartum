import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { useState } from 'react';
import { MessageCircle, Users, Lock, Shield, Star, ThumbsUp, X, CheckCircle } from 'lucide-react';

export function Community() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [note, setNote] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<null | typeof groups[number]>(null);

  const categories = [
    'All',
    'Pregnancy',
    'Mental Health',
    'Pediatrics',
    'Cardiology',
    'Nutrition',
  ];

  const groups = [
    {
      name: "Pregnancy Support Group",
      members: 234,
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=150",
      description: "Expert-led discussions on pregnancy health and wellness",
      isVerified: true,
      doctorModerated: true,
      lastActive: "2 hours ago",
    },
    {
      name: "Mental Health Support",
      members: 156,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=150",
      description: "Professional mental health guidance and peer support",
      isVerified: true,
      doctorModerated: true,
      lastActive: "5 minutes ago",
    },
  ];

  const discussions = [
    {
      title: "Managing Pregnancy Anxiety",
      author: "Dr. Sarah Johnson",
      authorRole: "OBGYN Specialist",
      replies: 45,
      views: 1200,
      likes: 89,
      isLocked: false,
      timestamp: "2 hours ago",
      tags: ["Pregnancy", "Mental Health"],
      preview: "Anxiety during pregnancy is common. Here are evidence-based strategies...",
    },
    {
      title: "COVID-19 Vaccination During Pregnancy",
      author: "Dr. Michael Chen",
      authorRole: "Immunologist",
      replies: 156,
      views: 3400,
      likes: 245,
      isLocked: true,
      timestamp: "1 day ago",
      tags: ["Pregnancy", "Vaccination"],
      preview: "Latest research and guidelines for COVID-19 vaccination...",
    },
  ];

  const handleJoinGroup = (group: typeof groups[number]) => {
    setSelectedGroup(group);
    setShowPopup(true);
  };

  const handleSendNow = () => {
    if (selectedGroup) {
      console.log(`Joining group: ${selectedGroup.name} with note: ${note}`);
      setShowPopup(false);
      setNote('');
      setSelectedGroup(null);
      setShowSuccessPopup(true);

      // Automatically close success popup after 2.5 seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 1500);
    }
  };

  const filteredDiscussions = discussions.filter((discussion) =>
    discussion.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header onSearch={setSearchQuery} />
        <div className="flex-1 px-6 py-12 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Community Guidelines Banner */}
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between animate-fade-in">
              <div className="flex items-center space-x-3">
                <Shield className="text-[#A32E76] w-6 h-6" />
                <span className="text-gray-600 text-sm">
                  This is a moderated healthcare community. All discussions are reviewed by medical professionals.
                </span>
              </div>
              <button className="text-[#A32E76] text-sm font-medium hover:underline">View Guidelines</button>
            </div>

            {/* Categories */}
            <div className="my-8">
              <h2 className="text-xl font-semibold mb-4">Topics</h2>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 shadow-md hover:shadow-lg ${
                      selectedCategory === category
                        ? 'bg-[#A32E76] text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Discussion Area */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-xl font-semibold">Recent Discussions</h2>
                {filteredDiscussions.map((discussion, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          {discussion.title}
                          {discussion.isLocked && (
                            <Lock className="w-5 h-5 text-gray-400" />
                          )}
                        </h3>
                        <p className="text-sm text-gray-600 mt-2">{discussion.preview}</p>
                      </div>
                    </div>
                    <div className="flex items-center mt-4 text-sm text-gray-500 gap-4">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-5 h-5" />
                        {discussion.replies} replies
                      </div>
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="w-5 h-5" />
                        {discussion.likes} likes
                      </div>
                      <div className="flex items-center gap-3 ml-auto">
                        <img
                          src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=150"
                          alt={discussion.author}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="font-medium text-[#A32E76]">{discussion.author}</span>
                        <span className="text-gray-400">•</span>
                        <span>{discussion.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sidebar with Groups */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Featured Groups</h2>
                  {groups.map((group, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center space-x-4">
                        <img
                          src={group.image}
                          alt={group.name}
                          className="w-14 h-14 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-medium flex items-center gap-2">
                            {group.name}
                            {group.isVerified && (
                              <Star className="w-5 h-5 text-[#A32E76]" />
                            )}
                          </h3>
                          <p className="text-sm text-gray-500 flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            {group.members} members
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-4">{group.description}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Active {group.lastActive}
                        </span>
                        <button
                          onClick={() => handleJoinGroup(group)}
                          className="px-4 py-2 bg-[#A32E76] text-white text-sm rounded-full hover:bg-[#8E2968] transition-all"
                        >
                          Join Group
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Community Stats */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="font-semibold text-lg mb-4">Community Stats</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Active Members</span>
                      <span className="font-medium">1,234</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Verified Doctors</span>
                      <span className="font-medium">45</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Topics Discussed</span>
                      <span className="font-medium">789</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Popup Modal */}
          {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-96 animate-fade-in">
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
                  className="mt-4 w-full py-2 bg-[#A32E76] text-white text-sm font-medium rounded-md hover:bg-[#8E2968] transition-all"
                >
                  Send Now
                </button>
              </div>
            </div>
          )}

          {/* Success Popup */}
          {showSuccessPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-80 animate-fade-in">
                <div className="flex flex-col items-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
                  <h3 className="text-lg font-semibold text-center">Request Sent Successfully!</h3>
                  <p className="text-sm text-gray-600 text-center mt-2">
                    Your request to join "{selectedGroup?.name}" has been sent.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
