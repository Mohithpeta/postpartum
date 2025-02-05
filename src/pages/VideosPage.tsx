import { useState, useMemo } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Play, ThumbsUp, MessageCircle, Verified, Clock } from 'lucide-react';

export function VideosPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = [
    'All',
    'About Postpartum Hypertension',
    'Symptoms of Hypertension',
    'Risk Factors of Hypertension',
    'Screening & Diagnosis',
    'Treatment Options',
    'Prevention',
    'Latest Research'
  ];

  const videos = useMemo(() => [
    {
      id: 1,
      title: 'Lifestyle Changes to Manage Postpartum Hypertension | Complete Guide 2024',
      doctor: {
        name: 'Dr. Dharun Kumar',
        role: 'Psychologist',
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400'
      },
      thumbnail: '/api/placeholder/640/360',
      likes: '1.5K',
      dislikes: '0',
      comments: '44',
      views: '15K',
      duration: '12:45',
      postedAt: '2 weeks ago'
    },
    {
      id: 2,
      title: '10 Practical Tips for Managing Postpartum Hypertension | Expert Advice',
      doctor: {
        name: 'Dr. Siva priya',
        role: 'Obstetrician / Gynecologists',
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400'
      },
      thumbnail: '/api/placeholder/640/360',
      likes: '2.1K',
      dislikes: '2',
      comments: '67',
      views: '23K',
      duration: '18:30',
      postedAt: '3 days ago'
    },
    // Add more videos for grid layout
  ], []);

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
          placeholder="Search videos..."
          onSearch={setSearchQuery}
        />
        <div className="flex-1 overflow-y-auto">
          {/* Categories Bar - Fixed position */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
            <div className="max-w-[1800px] mx-auto px-4">
              <div className="flex space-x-3 overflow-x-auto py-3 scrollbar-hide">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      activeFilter === category
                        ? 'bg-[#a32e76] text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Videos Grid */}
          <div className="max-w-[1800px] mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVideos.map((video) => (
                <div 
                  key={video.id} 
                  className="group cursor-pointer"
                >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    {/* Duration Badge */}
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                    {/* Play Overlay - Only visible on hover */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                      <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex space-x-3">
                    {/* Doctor Avatar */}
                    <div className="flex-shrink-0">
                      <img
                        src={video.doctor.avatar}
                        alt={video.doctor.name}
                        className="w-10 h-10 rounded-full"
                      />
                    </div>

                    {/* Video Info */}
                    <div className="flex-1 min-w-0">
                      {/* Title */}
                      <h3 className="text-base font-medium text-gray-900 line-clamp-2 mb-1 group-hover:text-[#a32e76]">
                        {video.title}
                      </h3>

                      {/* Doctor Info */}
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <span className="truncate">{video.doctor.name}</span>
                        {video.doctor.verified && (
                          <Verified className="w-4 h-4 text-[#a32e76] ml-1" />
                        )}
                      </div>

                      {/* Video Stats */}
                      <div className="flex items-center text-sm text-gray-600 space-x-2">
                        <span>{video.views} views</span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {video.postedAt}
                        </span>
                      </div>

                      {/* Engagement Stats */}
                      <div className="mt-2 flex items-center space-x-4 text-xs text-gray-600">
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="w-3 h-3" />
                          <span>{video.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-3 h-3" />
                          <span>{video.comments}</span>
                        </div>
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