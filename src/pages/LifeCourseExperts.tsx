import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Search } from 'lucide-react';

export function LifeCourseExperts() {
  const categories = ['All', 'Postpartum Hypertension', 'Anal Incontinence', 'Obesity', 'Diabetes Mellitus', 'Dyspareunia'];
  
  const experts = [
    {
      name: "Dr. Sarah Johnson",
      specialization: "OBGYN",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Dr. Michael Chen",
      specialization: "Pediatrician",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Dr. Lisa Williams",
      specialization: "Family Medicine",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Dr. James Wilson",
      specialization: "Cardiologist",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400"
    },
    // Duplicate experts to fill the grid
    {
      name: "Dr. Sarah Johnson",
      specialization: "OBGYN",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Dr. Michael Chen",
      specialization: "Pediatrician",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Dr. Lisa Williams",
      specialization: "Family Medicine",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Dr. James Wilson",
      specialization: "Cardiologist",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold">LifeCourse Experts</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search LifeCourse Experts"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          {/* Categories */}
          <div className="flex space-x-3 overflow-x-auto mb-8 pb-2">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  index === 1 ? 'bg-[#E91E63] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Experts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experts.map((expert, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img src={expert.image} alt={expert.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-medium text-gray-900">{expert.name}</h3>
                  <p className="text-sm text-gray-600">{expert.specialization}</p>
                  <div className="mt-2 flex items-center">
                    <span className="text-[#E91E63] font-medium">{expert.rating}</span>
                    <div className="ml-1 flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(expert.rating) ? 'text-[#E91E63]' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}