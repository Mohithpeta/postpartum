import  { useState, useMemo } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import {  Star } from 'lucide-react';

export function LifeCourseExperts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
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

  const filteredExperts = useMemo(() => {
    return experts.filter((expert) => {
      const matchesSearch = 
        searchQuery.trim() === '' ||
        expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expert.specialization.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesFilter = 
        activeFilter === 'All' ||
        expert.specialization.includes(activeFilter); 

      return matchesSearch && matchesFilter;
    });
  }, [experts, searchQuery]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-hidden flex flex-col">
        <Header
          placeholder="Search LifeCourse Experts" 
          onSearch={setSearchQuery} 
        />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-semibold">LifeCourse Experts</h1>
            </div>

            {/* Categories */}
            <div className="flex space-x-3 overflow-x-auto mb-8 pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                    activeFilter === category 
                      ? 'bg-[#A32E76] text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Experts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredExperts.map((expert, index) => ( 
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <img src={expert.image} alt={expert.name} className="w-full h-48 object-cover" />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
                      <span className="text-[#A32E76] font-medium mr-1">{expert.rating}</span>
                      <Star className="w-4 h-4 text-[#A32E76] fill-current" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900">{expert.name}</h3>
                    <p className="text-sm text-gray-600">{expert.specialization}</p>
                    <div className="mt-3 flex justify-between items-center">
                      <button className="text-[#A32E76] text-sm font-medium hover:text-[#D81B60]">
                        View Profile
                      </button>
                      <button className="px-3 py-1 bg-[#A32E76] text-white text-sm rounded-full hover:bg-[#D81B60]">
                        Book Now
                      </button>
                    </div>
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