import { useState, useMemo } from 'react';
import { Sidebar } from '../components/Sidebar';
import { X, Users} from 'lucide-react';
import { Header } from '../components/Header';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    'All',
    'Mental Health',
    'Anxiety Disorders',
    'Obesity',
    'Diabetes Mellitus',
    'Nutrition',
    'Hypertension',
    'Exercise',
    'Incontinence',
    'Dyspareunia',
    'Secondary Infertility',
    'Back Pain',
    'Pelvic Organ Prolapse',
  ];

  const personalizedContent = useMemo(() => [
    {
      title: 'Mental Health',
      image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80&w=400',
      experts: '15 Experts',
      category: 'Mental Health',
    },
    {
      title: 'Exercise',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=400',
      experts: '23 Experts',
      category: 'Exercise',
    },
    {
      title: 'Nutrition',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400',
      experts: '72 Experts',
      category: 'Nutrition',
    },
    {
      title: 'Anxiety Disorders',
      image: 'https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?auto=format&fit=crop&q=80&w=400',
      experts: '45 Experts',
      category: 'Anxiety Disorders',
    },
  ], []);

  const experts = useMemo(() => [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialization: 'OBGYN',
      category: 'Mental Health',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialization: 'Pediatrician',
      category: 'Obesity',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 3,
      name: 'Dr. Lisa Williams',
      specialization: 'Family Medicine',
      category: 'Diabetes Mellitus',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      specialization: 'Cardiologist',
      category: 'Anxiety Disorders',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    },
  ], []);

  const toggleFilter = (category: string) => {
    if (category === 'All') {
      setActiveFilters([]);
      return;
    }
    setActiveFilters((prev) =>
      prev.includes(category)
        ? prev.filter((f) => f !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setSearchQuery('');
  };

  const handleSearch = (query: string) => {
    setIsLoading(true);
    setSearchQuery(query);
    setTimeout(() => setIsLoading(false), 500);
  };

  const filteredContent = useMemo(() => {
    let filtered = personalizedContent;

    if (activeFilters.length > 0) {
      filtered = filtered.filter((item) =>
        activeFilters.includes('All') || activeFilters.includes(item.category)
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [personalizedContent, activeFilters, searchQuery]);

  const filteredExperts = useMemo(() => {
    let filtered = experts;

    if (activeFilters.length > 0) {
      filtered = filtered.filter((expert) =>
        activeFilters.includes('All') || activeFilters.includes(expert.category)
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((expert) =>
        expert.name.toLowerCase().includes(query) ||
        expert.specialization.toLowerCase().includes(query) ||
        expert.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [experts, activeFilters, searchQuery]);

  const totalResults = filteredContent.length + filteredExperts.length;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-hidden flex flex-col">
        <Header placeholder="Search LifeCourse" onSearch={handleSearch} onTopicChange={() => {}} />
        
        {/* Categories Bar */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="max-w-[1800px] mx-auto px-4">
            <div className="flex space-x-3 overflow-x-auto py-3 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    (category === 'All' && activeFilters.length === 0) ||
                    activeFilters.includes(category)
                      ? 'bg-[#a32e76] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
              {activeFilters.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1800px] mx-auto p-4">
            {/* Results Count */}
            <div className="mb-4 text-sm text-gray-600">
              {isLoading ? (
                <span>Searching...</span>
              ) : (
                <span>Found {totalResults} results</span>
              )}
            </div>

            {/* No Results */}
            {!isLoading && totalResults === 0 && (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h2 className="text-xl font-semibold mb-4">No Results Found</h2>
                <p className="text-gray-600">Try adjusting your search or filters.</p>
              </motion.div>
            )}

            {/* Personalized Content */}
            {filteredContent.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xl font-semibold mb-6">Personalized for you</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredContent.map((content, index) => (
                    <div key={index} className="group cursor-pointer">
                      <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                        <img
                          src={content.image}
                          alt={content.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all" />
                      </div>

                      <div className="flex space-x-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-medium text-gray-900 line-clamp-2 mb-1 group-hover:text-[#a32e76]">
                            {content.title}
                          </h3>
                          <div className="flex items-center text-sm text-gray-600 mb-1">
                            <Users className="w-4 h-4 mr-1" />
                            <span>{content.experts}</span>
                          </div>
                          <div className="mt-2 flex items-center space-x-4 text-xs text-gray-600">
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experts Section */}
            {filteredExperts.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-6">LifeCourse experts for you</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredExperts.map((expert) => (
                    <Link key={expert.id} to={`/profile/${expert.id}`} className="block">
                      <div className="group cursor-pointer">
                        <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                          <img
                            src={expert.image}
                            alt={expert.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all" />
                        </div>

                        <div className="flex space-x-3">
                          <div className="flex-shrink-0">
                            <img
                              src={expert.image}
                              alt={expert.name}
                              className="w-10 h-10 rounded-full"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center">
                              <h3 className="text-base font-medium text-gray-900 truncate group-hover:text-[#a32e76]">
                                {expert.name}
                              </h3>
                            </div>
                            <p className="text-sm text-gray-600">{expert.specialization}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
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