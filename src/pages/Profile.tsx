import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Camera, Edit2 } from 'lucide-react';

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Sarah Anderson');
  const [email, setEmail] = useState('sarah.anderson@example.com');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [interests, setInterests] = useState(['Pregnancy', 'Mental Health', 'Nutrition', 'Fitness']);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset to original profile details if needed
    setName('Sarah Anderson');
    setEmail('sarah.anderson@example.com');
    setPhone('+1 (555) 123-4567');
    setInterests(['Pregnancy', 'Mental Health', 'Nutrition', 'Fitness']);
  };

  const handleInterestsChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedInterests = [...interests];
    updatedInterests[index] = e.target.value;
    setInterests(updatedInterests);
  };

  const handleAddInterest = () => {
    setInterests([...interests, '']);
  };

  const handleRemoveInterest = (index: number) => {
    const updatedInterests = interests.filter((_, i) => i !== index);
    setInterests(updatedInterests);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            {/* Profile Header */}
            <div className="flex items-center space-x-6 mb-8">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0 p-2 bg-[#A32E76] text-white rounded-full">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-semibold">{name}</h1>
                <p className="text-gray-600">Member since January 2024</p>
              </div>
              {!isEditing && (
                <button
                  onClick={handleEditProfile}
                  className="px-4 py-2 text-[#A32E76] font-medium flex items-center hover:bg-[#A32E76] hover:text-white rounded-lg"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              )}
            </div>

            {/* Profile Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-3">Personal Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600">Email</label>
                    <p className="font-medium">{email}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Phone</label>
                    <p className="font-medium">{phone}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-3">Interests</h2>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-pink-50 text-[#A32E76] rounded-full text-sm flex items-center"
                    >
                      <span>{interest}</span>
                      <button
                        onClick={() => handleRemoveInterest(index)}
                        className="ml-2 text-gray-400 hover:text-gray-600"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-3">Activity</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Sessions Attended</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Community Posts</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Groups Joined</span>
                    <span className="font-medium">3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal for editing profile */}
      {isEditing && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Interests</label>
                <div className="space-y-2">
                  {interests.map((interest, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="text"
                        value={interest}
                        onChange={(e) => handleInterestsChange(e, index)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                      <button
                        onClick={() => handleRemoveInterest(index)}
                        className="ml-2 text-red-500"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={handleAddInterest}
                    className="text-[#A32E76] mt-2"
                  >
                    + Add Interest
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 text-gray-500 border border-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-[#A32E76] text-white rounded-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
