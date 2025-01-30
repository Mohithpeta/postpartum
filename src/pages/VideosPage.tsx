import { useState, useMemo } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Play, ThumbsUp, MessageCircle, Share2, Verified } from 'lucide-react';

export function VideosPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = [
    'All',
    'About Postpartum Hypertension',
    'Symptoms of Hypertension',
    'Risk Factors of Hypertension',
    'Screening & Diagnosis'
  ];

  const videos = [
    {
      id: 1,
      title: 'Lifestyle Changes to Manage Postpartum Hypertension',
      doctor: {
        name: 'Dr. Dharun Kumar',
        role: 'Psychologist',
        verified: true
      },
      thumbnail: '/api/placeholder/640/360',
      likes: '1.5K',
      dislikes: '0',
      comments: '44'
    },
    {
      id: 2,
      title: '10 Practical tips for managing postpartum hypertension',
      doctor: {
        name: 'Dr. Siva priya',
        role: 'Obstetrician / Gynecologists',
        verified: true
      },
      thumbnail: '/api/placeholder/640/360',
      likes: '2.1K',
      dislikes: '2',
      comments: '67'
    },
    // Add more video entries as needed
  ];

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.doctor.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        activeFilter === 'All' ||
        video.title.includes(activeFilter);

      return matchesSearch && matchesFilter;
    });
  }, [videos, searchQuery, activeFilter]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-hidden flex flex-col">
        <Header
          placeholder="Search Backpain"
          onSearch={setSearchQuery}
        />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Categories */}
            <div className="flex space-x-3 overflow-x-auto mb-8 pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                    activeFilter === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Videos Grid */}
            <div className="grid grid-cols-1 gap-8">
              {filteredVideos.map((video) => (
                <div key={video.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <div className="relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <Play className="w-16 h-16 text-white" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg text-gray-900">{video.title}</h3>
                    <div className="mt-2 flex items-center space-x-2">
                      <div className="flex-shrink-0">
                        <img
                          src="/api/placeholder/40/40"
                          alt={video.doctor.name}
                          className="w-10 h-10 rounded-full"
                        />
                      </div>
                      <div>
                        <div className="flex items-center space-x-1">
                          <p className="font-medium text-gray-900">{video.doctor.name}</p>
                          {video.doctor.verified && (
                            <Verified className="w-4 h-4 text-purple-600" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{video.doctor.role}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{video.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{video.comments}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </div>
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

export default VideosPage;