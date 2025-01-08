import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { ExpertCard } from '../components/ExpertCard';
import { Search } from 'lucide-react';

const experts = [
  {
    name: "Dr. Sarah Johnson",
    title: "Gynecologist & Women's Health",
    imageUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Dr. Michael Chen",
    title: "Pediatrician",
    imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Dr. Lisa Williams",
    title: "Family Medicine",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Dr. James Wilson",
    title: "Cardiologist",
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400"
  }
];

export function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">LifeCourse Experts</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search experts..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experts.map((expert) => (
              <ExpertCard key={expert.name} {...expert} />
            ))}
          </div>

          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-6">Featured Content</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-video bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-6">Ongoing Live Sessions</h2>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center space-x-4">
                <img
                  src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=150"
                  alt="Session host"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">Understanding Pregnancy Health</h3>
                  <p className="text-sm text-gray-600">Dr. Sarah Johnson • Starting in 5 minutes</p>
                </div>
                <button className="ml-auto px-4 py-2 bg-[#E91E63] text-white rounded-md">
                  Join Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}