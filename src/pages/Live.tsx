import React from 'react';
import { Sidebar } from '../components/Sidebar';

export function Live() {
  const liveSession = {
    title: "Understanding Pregnancy Health",
    doctor: "Dr. Sarah Johnson",
    time: "Starting in 5 minutes",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=150"
  };

  const upcomingSessions = [
    {
      title: "Mental Health Awareness",
      doctor: "Dr. Michael Chen",
      time: "Today at 3:00 PM",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=150"
    },
    {
      title: "Pediatric Care Basics",
      doctor: "Dr. Lisa Williams",
      time: "Today at 4:30 PM",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150"
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold mb-8">Ongoing Live Sessions</h1>
          
          {/* Current Live Session */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center space-x-4">
              <img
                src={liveSession.image}
                alt={liveSession.doctor}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{liveSession.title}</h3>
                <p className="text-sm text-gray-600">{liveSession.doctor} • {liveSession.time}</p>
              </div>
              <button className="ml-auto px-6 py-2 bg-[#E91E63] text-white rounded-md hover:bg-[#D81B60]">
                Join Now
              </button>
            </div>
          </div>

          {/* Upcoming Sessions */}
          <h2 className="text-xl font-semibold mb-4">Upcoming Live Sessions</h2>
          <div className="space-y-4">
            {upcomingSessions.map((session, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={session.image}
                    alt={session.doctor}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium">{session.title}</h3>
                    <p className="text-sm text-gray-600">{session.doctor} • {session.time}</p>
                  </div>
                  <button className="ml-auto px-4 py-2 text-[#E91E63] font-medium">
                    Set Reminder
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}