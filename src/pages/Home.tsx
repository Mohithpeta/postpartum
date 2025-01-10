import  { useState, useMemo } from 'react';
import { Sidebar } from '../components/Sidebar';
import {  X } from 'lucide-react';
import { Header } from '../components/Header';

export function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  // const [showMoreCategories, setShowMoreCategories] = useState(false);
  
  const categories = ['All', 'Mental Health', 'Anxiety Disorders', 'Obesity', 'Diabetes Mellitus', 'Nutrition','Hypertension','Exercise','Incontinence','Dyspareunia','Secondary Infertility','Back Pain','Pelvic Organ Prolapse'];
  
  const personalizedContent = [
    {
      title: 'Mental Health',
      image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80&w=400',
      experts: '15 Experts',
      category: 'Mental Health'
    },
    {
      title: 'Exercise',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=400',
      experts: '23 Experts',
      category: 'Exercise'
    },
    {
      title: 'Nutrition',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400',
      experts: '72 Experts',
      category: 'Nutrition'
    },
    {
      title: 'Anxiety Disorders',
      image: 'https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?auto=format&fit=crop&q=80&w=400',
      experts: '45 Experts',
      category: 'Anxiety Disorders'
    }
  ];

  const experts = [
    {
      name: "Dr. Sarah Johnson",
      specialization: "OBGYN",
      category: "Mental Health",
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
      category: "Anxiety Disorders",
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

  const filteredContent = useMemo(() => {
    let filtered = personalizedContent;
    
    if (activeFilters.length > 0) {
      filtered = filtered.filter(item => 
        activeFilters.includes('All') || activeFilters.includes(item.category)
      );
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [personalizedContent, activeFilters, searchQuery]);

  const filteredExperts = useMemo(() => {
    let filtered = experts;
    
    if (activeFilters.length > 0) {
      filtered = filtered.filter(expert => 
        activeFilters.includes('All') || activeFilters.includes(expert.category)
      );
    }
    
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
      <main className="flex-1 overflow-hidden flex flex-col">
        <Header placeholder="Search LifeCourse" onSearch={setSearchQuery} />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Categories */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-2 pb-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => toggleFilter(category)}
                    className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                      (category === 'All' && activeFilters.length === 0) || activeFilters.includes(category)
                        ? 'bg-[#E91E63] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
                {activeFilters.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="px-3 py-1.5 rounded-full text-sm whitespace-nowrap bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-4 text-sm text-gray-600">
              Found {filteredContent.length + filteredExperts.length} results
            </div>

            {/* No Results Message */}
            {filteredContent.length === 0 && filteredExperts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No results found</p>
                <button
                  onClick={clearFilters}
                  className="mt-2 text-[#A32E76] hover:text-[#D81B60]"
                >
                  Clear filters and try again
                </button>
              </div>
            )}

            {/* Personalized Content */}
            {filteredContent.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xl font-semibold mb-6">Personalized for you</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredContent.map((content, index) => (
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
            {filteredExperts.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-6">LifeCourse experts for you</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredExperts.map((expert, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <img src={expert.image} alt={expert.name} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900">{expert.name}</h3>
                        <p className="text-sm text-gray-600">{expert.specialization}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}