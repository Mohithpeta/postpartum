import { useState, useMemo } from 'react';
import { Sidebar } from '../components/Sidebar';
import { X, ChevronRight } from 'lucide-react';
import { Header } from '../components/Header';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    'All',
    'Nutrition',
    'Lifestyle',
    'Frequent Dizziness',
    'High BP',
    'Chest Pressure',
    'Back Headache',
    'Diet Plan',
    'Mental Health',
    'Anxiety Disorders',
    'Obesity',
    'Diabetes Mellitus',
    'Hypertension',
    'Exercise',
    'Incontinence',
    'Dyspareunia',
    'Secondary Infertility',
    'Back Pain',
    'Pelvic Organ Prolapse',
  ];

  const experts = useMemo(() => [
    {
      id: 1,
      name: 'Dr. Dharun Kumar',
      specialization: 'Obstetrician/Gynecologists',
      category: 'Hypertension',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 2,
      name: 'Dr. Shanthi Vel',
      specialization: 'Obstetrician/Gynecologists',
      category: 'Hypertension',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 3,
      name: 'Dr. Anushiya Sharma',
      specialization: 'Obstetrician/Gynecologists',
      category: 'Hypertension',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 4,
      name: 'Dr. Santhosh Kumar',
      specialization: 'Obstetrician/Gynecologists',
      category: 'Hypertension',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    },
  ], []);

  const recentVideos = useMemo(() => [
    {
      title: '10 Practical tips for managing postpartum Hy...',
      expert: 'Dr. Anjali Kumar',
      time: '2 hours ago',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400',
    },
    {
      title: '10 Practical tips for managing postpartum Hy...',
      expert: 'Dr. Anjali Kumar',
      time: '2 hours ago',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    },
    {
      title: '10 Practical tips for managing postpartum Hy...',
      expert: 'Dr. Anjali Kumar',
      time: '2 hours ago',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    },
    {
      title: 'Nutrition and Exercise for postpartum Hypertension: A Comprehensive Guide',
      expert: 'Dr. Varsha Bhaskar',
      time: '2 hours ago',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400',
    },
  ], []);

  const ongoingLive = useMemo(() => ({
    title: 'LIVE | Postpartum Recovery: What to Expect | Navigating physical and emotional changes after delivery.',
    expert: 'Ongoing Live by Dr. Revathi Kumar',
    watching: '542 Watching',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
  }), []);

  const testimonials = useMemo(() => [
    {
      text: 'Navigating postpartum hypertension was overwhelming, but the live sessions were a game-changer. Dr. Priya’s guidance helped me manage my health while focusing on my baby.',
      author: 'Ankita R, 28 yrs',
    },
    {
      text: 'After delivery, managing postpartum hypertension felt daunting. Dr. Aruna’s live sessions gave me practical tips and confidence to prioritize my health while caring for my baby.',
      author: 'Ritika P, 26 yrs',
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

  const totalResults = filteredExperts.length;

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
                      ? 'bg-[#5E17EB] text-white shadow-md'
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

            {/* Experts Section */}
            {filteredExperts.length > 0 && (
              <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6 ">LifeCourse Experts for you</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredExperts.map((expert) => (
                <Link key={expert.id} to={`/profile/${expert.id}`} className="block group">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative aspect-video">
                    <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#5E17EB] truncate">
                    {expert.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{expert.specialization}</p>
                    <button className="text-sm font-medium text-[#5E17EB] hover:text-[#7a33d1] flex items-center">
                    View Profile
                    <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                  </div>
                </Link>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link
                to="/experts"
                className="text-lg font-medium text-[#5E17EB] hover:text-[#7a33d1] flex items-center justify-center"
                >
                View All LifeCourse Experts
                <ChevronRight className="w-5 h-5 ml-1" />
                </Link>
              </div>
              </div>
            )}

            {/* Recent Videos Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Recent Videos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recentVideos.map((video, index) => (
                <div key={index} className="group cursor-pointer">
                <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                  <img
                  src={video.image}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-base font-medium text-gray-900 line-clamp-2 mb-1 group-hover:text-[#5E17EB]">
                  {video.title}
                  </h3>
                  <p className="text-sm text-gray-600">{video.expert}</p>
                  <p className="text-sm text-gray-600">{video.time}</p>
                </div>
                </div>
              ))}
              </div>
            </div>

            {/* Ongoing Live Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Ongoing Live</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="relative aspect-video rounded-xl overflow-hidden" style={{ height: '250px' }}>
                  <img
                    src={ongoingLive.image}
                    alt={ongoingLive.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-base font-medium text-gray-900 mb-2">{ongoingLive.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{ongoingLive.expert}</p>
                  <p className="text-sm text-gray-600 mb-4">{ongoingLive.watching} Watching</p>
                  <button className="bg-white text-[#5E17EB] font-medium py-2 px-4 rounded-full border border-[#5E17EB] hover:bg-gray-100 transition-colors w-fit">
                    Join Now
                  </button>
                </div>
              </div>
            </div>

            {/* Testimonials Section */}
            <div>
              <h2 className="text-xl font-semibold mb-6 ">Testimonials Curated For You</h2>
              <div className="flex overflow-x-auto space-x-4 scrollbar-hide justify-start" style={{ height: '200px' }}>
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md p-4 w-80 flex-shrink-0">
                    <p className="text-sm text-gray-700 italic mb-2">"{testimonial.text}"</p>
                    <p className="text-xs text-gray-500">- {testimonial.author}</p>
                  </div>
                ))}
                <div className="flex items-center">
                  <ChevronRight className="w-6 h-6 text-gray-500 hover:text-[#5E17EB] cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
