import { useState, useEffect, useMemo } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Play } from 'lucide-react';
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
  youtube_url: string;
}

const getYouTubeVideoID = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname.includes("youtu.be")) {
      return parsedUrl.pathname.substring(1);
    }
    return parsedUrl.searchParams.get("v");
  } catch{
    console.error("Invalid YouTube URL:", url);
    return null;
  }
};

export function VideosPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; // Number of videos per page

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

  // Pagination Logic
  const totalPages = Math.ceil(filteredVideos.length / pageSize);
  const currentVideos = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredVideos.slice(startIndex, startIndex + pageSize);
  }, [filteredVideos, currentPage, pageSize]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-hidden flex flex-col">
        <Header placeholder="Search videos..." onSearch={setSearchQuery} onTopicChange={() => {}} />

        <div className="flex-1 overflow-y-auto">
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

          {loading ? (
            <p className="text-center text-gray-500 mt-8">Loading videos...</p>
          ) : error ? (
            <p className="text-center text-red-500 mt-8">{error}</p>
          ) : currentVideos.length === 0 ? (
            <p className="text-center text-gray-500 mt-8">No videos found.</p>
          ) : (
            <div className="max-w-[1800px] mx-auto p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentVideos.map((video) => {
                  const videoId = getYouTubeVideoID(video.youtube_url);

                  return (
                    <div key={video._id} className="group cursor-pointer" onClick={() => setActiveVideo(video._id)}>
                      {activeVideo === video._id && videoId ? (
                        <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                          <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1&disablekb=1`}
                            title={video.title}
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                          ></iframe>
                        </div>
                      ) : (
                        <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                          {video.duration && (
                            <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                              {video.duration}
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                            <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      )}
                      <h3 className="text-base font-medium text-gray-900 line-clamp-2 mb-1 group-hover:text-[#a32e76]">
                        {video.title}
                      </h3>
                    </div>
                  );
                })}
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-center mt-6 space-x-3">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default VideosPage;
