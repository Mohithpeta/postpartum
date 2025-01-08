import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Search } from 'lucide-react';

export function Home() {
  const categories = ['All', 'Postpartum Hypertension', 'Anal Incontinence', 'Obesity', 'Diabetes Mellitus', 'Dyspareunia'];
  
  const personalizedContent = [
    {
      title: 'About Postpartum Hypertension',
      image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80&w=400',
      experts: '15 Experts'
    },
    {
      title: 'Health Guidance',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=400',
      experts: '23 Experts'
    },
    {
      title: 'Lifestyle & Nutrition',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400',
      experts: '72 Experts'
    },
    {
      title: 'Emotional & Psychological Support',
      image: 'https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?auto=format&fit=crop&q=80&w=400',
      experts: '45 Experts'
    }
  ];

  const experts = [
    {
      name: "Dr. Sarah Johnson",
      specialization: "OBGYN",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Dr. Michael Chen",
      specialization: "Pediatrician",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Dr. Lisa Williams",
      specialization: "Family Medicine",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Dr. James Wilson",
      specialization: "Cardiologist",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Search and Categories */}
          <div className="mb-8">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search LifeCourse"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <div className="flex space-x-3 overflow-x-auto pb-2">
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
          </div>

          {/* Personalized Content */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6">Personalized for you</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {personalizedContent.map((content, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <img src={content.image} alt={content.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900">{content.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{content.experts}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LifeCourse Experts */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-6">LifeCourse experts for you</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {experts.map((expert, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <img src={expert.image} alt={expert.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900">{expert.name}</h3>
                    <p className="text-sm text-gray-600">{expert.specialization}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="text-[#E91E63] font-medium mt-4">
              View all LifeCourse Experts →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}