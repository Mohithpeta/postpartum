import { useState, useEffect, useMemo } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Play, ThumbsUp, MessageCircle, Verified, Clock } from 'lucide-react';
import axios from 'axios';

interface Video {
  _id: string;
  title: string;
  doctor?: {
    name: string;
    role: string;
    verified: boolean;
    avatar: string;
  };
  thumbnail: string;
  views: number;
  duration?: string;
  upload_date: string;
  comments?: number;
  likes?: number;
}

export function VideosPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const categories = [
    'All',
    'About Postpartum Hypertension',
    'Symptoms of Hypertension',
    'Risk Factors of Hypertension',
    'Screening & Diagnosis',
    'Treatment Options',
    'Prevention',
    'Latest Research',
    'Pregnancy'
  ];

  // Fetch videos from backend
  useEffect(() => {
    const fetchVideos = async () => {
      const token = localStorage.getItem('token'); 
      if (!token) {
        setError('You must be logged in to view videos.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/videos', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVideos(response.data);
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError('Failed to load videos. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Filter videos based on search and category
  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (video.doctor?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

      const matchesFilter = activeFilter === 'All' || video.title.includes(activeFilter);

      return matchesSearch && matchesFilter;
    });
  }, [videos, searchQuery, activeFilter]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-hidden flex flex-col">
        <Header placeholder="Search videos..." onSearch={setSearchQuery} onTopicChange={() => {}} />

        <div className="flex-1 overflow-y-auto">
          {/* Categories Bar */}
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

          {/* Loading and Error Messages */}
          {loading ? (
            <p className="text-center text-gray-500 mt-8">Loading videos...</p>
          ) : error ? (
            <p className="text-center text-red-500 mt-8">{error}</p>
          ) : filteredVideos.length === 0 ? (
            <p className="text-center text-gray-500 mt-8">No videos found.</p>
          ) : (
            <div className="max-w-[1800px] mx-auto p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredVideos.map((video) => (
                  <div key={video._id} className="group cursor-pointer">
                    {/* Thumbnail */}
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      {/* Duration Badge */}
                      {video.duration && (
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      )}
                      {/* Play Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                        <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex space-x-3">
                      {/* Doctor Avatar */}
                      <div className="flex-shrink-0">
                        <img
                          src={video.doctor?.avatar || 'https://via.placeholder.com/40'}
                          alt={video.doctor?.name || 'Unknown'}
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
                          <span className="truncate">{video.doctor?.name || 'Unknown'}</span>
                          {video.doctor?.verified && (
                            <Verified className="w-4 h-4 text-[#a32e76] ml-1" />
                          )}
                        </div>

                        {/* Video Stats */}
                        <div className="flex items-center text-sm text-gray-600 space-x-2">
                          <span>{video.views ? video.views.toLocaleString() : '0'} views</span>
                          <span>•</span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {video.upload_date}
                          </span>
                        </div>


                        {/* Engagement Stats */}
                        <div className="mt-2 flex items-center space-x-4 text-xs text-gray-600">
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="w-3 h-3" />
                            <span>{video.likes ?? 0}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-3 h-3" />
                            <span>{video.comments ?? 0}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default VideosPage;
