import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Users } from 'lucide-react';

export function Community() {
  const groups = [
    {
      name: "Pregnancy Support Group",
      members: 234,
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "Mental Health Support",
      members: 156,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=150"
    }
  ];

  const recentChats = [
    {
      user: "Dr. Sarah Johnson",
      message: "Thank you for joining the session!",
      time: "2m ago",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=150"
    },
    {
      user: "Support Group",
      message: "New meeting scheduled for tomorrow",
      time: "5m ago",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=150"
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold">Community</h1>
            <button className="px-4 py-2 bg-[#E91E63] text-white rounded-md hover:bg-[#D81B60]">
              Create Group
            </button>
          </div>

          {/* Groups */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Groups you can join</h2>
            <div className="space-y-4">
              {groups.map((group, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={group.image}
                      alt={group.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{group.name}</h3>
                      <p className="text-sm text-gray-600">{group.members} members</p>
                    </div>
                    <button className="ml-auto px-4 py-2 text-[#E91E63] font-medium">
                      Join Group
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Chats */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Chats</h2>
            <div className="space-y-4">
              {recentChats.map((chat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={chat.image}
                      alt={chat.user}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{chat.user}</h3>
                      <p className="text-sm text-gray-600">{chat.message}</p>
                    </div>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}