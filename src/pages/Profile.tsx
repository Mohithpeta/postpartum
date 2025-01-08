import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Camera, Edit2 } from 'lucide-react';

export function Profile() {
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
                <button className="absolute bottom-0 right-0 p-2 bg-[#E91E63] text-white rounded-full">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-semibold">Sarah Anderson</h1>
                <p className="text-gray-600">Member since January 2024</p>
              </div>
              <button className="px-4 py-2 text-[#E91E63] font-medium flex items-center">
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            </div>

            {/* Profile Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-3">Personal Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600">Email</label>
                    <p className="font-medium">sarah.anderson@example.com</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Phone</label>
                    <p className="font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-3">Interests</h2>
                <div className="flex flex-wrap gap-2">
                  {['Pregnancy', 'Mental Health', 'Nutrition', 'Fitness'].map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1 bg-pink-50 text-[#E91E63] rounded-full text-sm"
                    >
                      {interest}
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
    </div>
  );
}