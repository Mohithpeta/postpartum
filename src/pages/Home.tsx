import { useState, useMemo } from 'react';
import { Sidebar } from '../components/Sidebar';
import { X, Users } from 'lucide-react';
import { Header } from '../components/Header';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state for search

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

  const personalizedContent = [
    {
      title: 'Mental Health',
      image:
        'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80&w=400',
      experts: '15 Experts',
      category: 'Mental Health',
    },
    {
      title: 'Exercise',
      image:
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=400',
      experts: '23 Experts',
      category: 'Exercise',
    },
    {
      title: 'Nutrition',
      image:
        'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400',
      experts: '72 Experts',
      category: 'Nutrition',
    },
    {
      title: 'Anxiety Disorders',
      image:
        'https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?auto=format&fit=crop&q=80&w=400',
      experts: '45 Experts',
      category: 'Anxiety Disorders',
    },
  ];

  const experts = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialization: 'OBGYN',
      category: 'Mental Health',
      image:
        'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialization: 'Pediatrician',
      category: 'Obesity',
      image:
        'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 3,
      name: 'Dr. Lisa Williams',
      specialization: 'Family Medicine',
      category: 'Diabetes Mellitus',
      image:
        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      specialization: 'Cardiologist',
      category: 'Anxiety Disorders',
      image:
        'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    },
  ];

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
    setTimeout(() => setIsLoading(false), 500); // Simulate search delay
  };

  const filteredContent = useMemo(() => {
    let filtered = personalizedContent;

    if (activeFilters.length > 0) {
      filtered = filtered.filter(
        (item) =>
          activeFilters.includes('All') || activeFilters.includes(item.category)
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [personalizedContent, activeFilters, searchQuery]);

  const filteredExperts = useMemo(() => {
    let filtered = experts;

    if (activeFilters.length > 0) {
      filtered = filtered.filter(
        (expert) =>
          activeFilters.includes('All') || activeFilters.includes(expert.category)
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (expert) =>
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
        <Header placeholder="Search LifeCourse" onSearch={handleSearch} />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Categories Section */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-2 pb-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => toggleFilter(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      (category === 'All' && activeFilters.length === 0) ||
                      activeFilters.includes(category)
                        ? 'bg-[#A32E76] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
                {activeFilters.length > 0 && (
                  <motion.button
                    onClick={clearFilters}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1.5 rounded-full text-sm bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear All
                  </motion.button>
                )}
              </div>
            </div>

            {/* Results Display */}
            <div className="mb-4 text-sm text-gray-600">
              {isLoading ? (
                <span>Searching...</span>
              ) : (
                <span>Found {totalResults} results</span>
              )}
            </div>

            {/* No Results Found */}
            {!isLoading && totalResults === 0 && (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h2 className="text-xl font-semibold mb-4">No Results Found</h2>
                <p className="text-gray-600">
                  Try adjusting your search or filters.
                </p>
              </motion.div>
            )}

            {/* Personalized Content */}
            {filteredContent.length > 0 && (
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-xl font-semibold mb-6">Personalized for you</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredContent.map((content, index) => (
                    <motion.div
                      key={index}
                      className="bg-white rounded-lg shadow-sm overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                    >
                      <img
                        src={content.image}
                        alt={content.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900">{content.title}</h3>
                        <Link
                          to="/experts"
                          className="mt-2 inline-flex items-center gap-2 text-sm text-[#A32E76] hover:text-[#8E2968] transition-colors"
                        >
                          <Users className="w-4 h-4" />
                          {content.experts}
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Experts Section */}
            {filteredExperts.length > 0 && (
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-xl font-semibold mb-6">LifeCourse experts for you</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredExperts.map((expert) => (
                    <Link
                      key={expert.id}
                      to={`/profile/${expert.id}`}
                      className="block"
                    >
                      <motion.div
                        className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                        whileHover={{ scale: 1.05 }}
                      >
                        <img
                          src={expert.image}
                          alt={expert.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="font-medium text-gray-900">{expert.name}</h3>
                          <p className="text-sm text-gray-600">{expert.specialization}</p>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}