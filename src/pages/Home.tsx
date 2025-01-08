import React, { useState, useMemo } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Search, X } from 'lucide-react';

export function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  const categories = ['All', 'Postpartum Hypertension', 'Anal Incontinence', 'Obesity', 'Diabetes Mellitus', 'Dyspareunia'];
  
  const personalizedContent = [
    {
      title: 'About Postpartum Hypertension',
      image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80&w=400',
      experts: '15 Experts',
      category: 'Postpartum Hypertension'
    },
    {
      title: 'Health Guidance',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=400',
      experts: '23 Experts',
      category: 'Health'
    },
    {
      title: 'Lifestyle & Nutrition',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400',
      experts: '72 Experts',
      category: 'Nutrition'
    },
    {
      title: 'Emotional & Psychological Support',
      image: 'https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?auto=format&fit=crop&q=80&w=400',
      experts: '45 Experts',
      category: 'Mental Health'
    }
  ];

  const experts = [
    {
      name: "Dr. Sarah Johnson",
      specialization: "OBGYN",
      category: "Postpartum Hypertension",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Dr. Michael Chen",
      specialization: "Pediatrician",
      category: "Obesity",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Dr. Lisa Williams",
      specialization: "Family Medicine",
      category: "Diabetes Mellitus",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Dr. James Wilson",
      specialization: "Cardiologist",
      category: "Dyspareunia",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400"
    }
  ];

  const toggleFilter = (category: string) => {
    if (category === 'All') {
      setActiveFilters([]);
      return;
    }
    
    setActiveFilters(prev => {
      if (prev.includes(category)) {
        return prev.filter(f => f !== category);
      }
      return [...prev, category];
    });
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setSearchQuery('');
  };

  const filteredAndSearchedContent = useMemo(() => {
    let filtered = personalizedContent;
    
    // Apply category filters
    if (activeFilters.length > 0) {
      filtered = filtered.filter(item => 
        activeFilters.includes(item.category)
      );
    }
    
    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [personalizedContent, activeFilters, searchQuery]);

  const filteredAndSearchedExperts = useMemo(() => {
    let filtered = experts;
    
    // Apply category filters
    if (activeFilters.length > 0) {
      filtered = filtered.filter(expert => 
        activeFilters.includes(expert.category)
      );
    }
    
    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(expert =>
        expert.name.toLowerCase().includes(query) ||
        expert.specialization.toLowerCase().includes(query) ||
        expert.category.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [experts, activeFilters, searchQuery]);

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search LifeCourse"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex items-center space-x-3 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                    category === 'All' && activeFilters.length === 0 || activeFilters.includes(category)
                      ? 'bg-[#E91E63] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
              {(activeFilters.length > 0 || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 rounded-full text-sm whitespace-nowrap bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4 text-sm text-gray-600">
            Found {filteredAndSearchedContent.length + filteredAndSearchedExperts.length} results
          </div>

          {/* No Results Message */}
          {filteredAndSearchedContent.length === 0 && filteredAndSearchedExperts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No results found</p>
              <button
                onClick={clearFilters}
                className="mt-2 text-[#E91E63] hover:text-[#D81B60]"
              >
                Clear filters and try again
              </button>
            </div>
          )}

          {/* Personalized Content */}
          {filteredAndSearchedContent.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-semibold mb-6">Personalized for you</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredAndSearchedContent.map((content, index) => (
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
          )}

          {/* LifeCourse Experts */}
          {filteredAndSearchedExperts.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-6">LifeCourse experts for you</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredAndSearchedExperts.map((expert, index) => (
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
          )}
        </div>
      </main>
    </div>
  );
}