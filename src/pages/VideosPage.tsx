import { useState, useEffect, useMemo } from 'react';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import axios,{AxiosError} from 'axios';
import ReactPlayer from 'react-player/youtube';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';

interface Doctor {
  name: string;
  role: string;
  verified: boolean;
  avatar: string;
}

interface Video {
  _id: string;
  title: string;
  description?: string;
  doctor?: Doctor;
  thumbnail: string;
  views: number;
  duration?: string;
  upload_date: string;
  comments?: number;
  likes?: number;
  youtube_url: string;
}

const getYouTubeVideoID = (url: string): string | null => {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname.includes("youtu.be")) {
      return parsedUrl.pathname.substring(1);
    }
    return parsedUrl.searchParams.get("v");
  } catch {
    console.error("Invalid YouTube URL:", url);
    return null;
  }
};

export function VideosPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [watchHistory, setWatchHistory] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize: number = 12;

  const categories: string[] = [
    'All', 'About Postpartum Hypertension', 'Symptoms of Hypertension',
    'Risk Factors of Hypertension', 'Screening & Diagnosis', 'Treatment Options',
    'Prevention', 'Latest Research', 'Pregnancy'
  ];

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to view videos.');
        setLoading(false);
        return;
      }

      try {
        const apiBase = process.env.NODE_ENV === 'development'
          ? 'http://127.0.0.1:8000'
          : 'https://deepvital-backend.onrender.com';

        const [videosResponse, historyResponse] = await Promise.all([
          axios.get(`${apiBase}/videos/`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${apiBase}/auth/watch-history`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        setVideos(videosResponse.data as Video[]);
        setWatchHistory(historyResponse.data.map((item: { video_id: string }) => item.video_id));
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load videos. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  
    const handlePlay = async (video: Video): Promise<void> => {
      if (activeVideo?._id === video._id) return; // Prevent duplicate calls
      setActiveVideo(video);
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('user_id');
  
      console.log('Sending watch history update:', { user_id: userId, video_id: video._id });
  
      // Validate userId and token
      if (!userId || userId.trim() === '') {
        console.error('Missing or invalid user_id:', { userId });
        setError('User not logged in. Please log in to update watch history.');
        return;
      }
      if (!token || token.trim() === '') {
        console.error('Missing or invalid token:', { token });
        setError('Authentication token missing. Please log in again.');
        return;
      }
  
      // Ensure video._id is a valid string
      if (!video._id || typeof video._id !== 'string' || video._id.trim() === '') {
        console.error('Invalid video_id:', { video_id: video._id });
        setError('Invalid video selected. Please try again.');
        return;
      }
  
      try {
        const apiBase = process.env.NODE_ENV === 'development'
          ? 'http://127.0.0.1:8000'
          : 'https://deepvital-backend.onrender.com';
  
        const response = await axios.post(
          `${apiBase}/auth/watch-history`,
          { user_id: userId, video_id: video._id }, // Exact match with WatchHistoryRequest
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('Watch history updated successfully:', response.data);
  
        setWatchHistory((prev) => {
          const newHistory = [video._id, ...prev.filter((id) => id !== video._id)];
          return newHistory.slice(0, 50);
        });
      } catch (err: unknown) { // Change to 'unknown' to comply with TypeScript 4.9+
        // Narrow the type to AxiosError if possible
        const errorMessage = (err instanceof AxiosError)
          ? err.response?.data?.detail || err.message || 'Unknown error occurred'
          : 'An unexpected error occurred';
        console.error('Error updating watch history:', errorMessage);
        setError(`Failed to update watch history: ${errorMessage}`);
      }
    };

  const filteredVideos = useMemo<Video[]>(() => {
    const filtered = videos.filter((video) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (video.doctor?.name.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      const matchesFilter = activeFilter === 'All' || video.title.includes(activeFilter);
      return matchesSearch && matchesFilter;
    });

    return filtered.sort((a, b) => {
      const aInHistory = watchHistory.includes(a._id);
      const bInHistory = watchHistory.includes(b._id);
      return bInHistory ? 1 : aInHistory ? -1 : 0;
    });
  }, [videos, searchQuery, activeFilter, watchHistory]);

  const relatedVideos = useMemo<Video[]>(() => {
    return filteredVideos.filter((v) => v._id !== activeVideo?._id).slice(0, 5);
  }, [filteredVideos, activeVideo]);

  const currentVideos = useMemo<Video[]>(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredVideos.slice(startIndex, startIndex + pageSize);
  }, [filteredVideos, currentPage]);

  const totalPages = Math.ceil(filteredVideos.length / pageSize);

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex">
      {/* Fixed Sidebar */}
      <div className="fixed top-0 left-0 h-screen w-64 z-20">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Fixed Header */}
        <div className="fixed top-0 left-64 right-0 bg-white z-20 shadow-sm">
          <Header placeholder="Search videos..." onSearch={setSearchQuery} onTopicChange={() => {}} />
        </div>

        {/* Scrollable Content */}
        <div className="mt-16 pt-4 pb-8 px-6 overflow-y-auto h-[calc(100vh-4rem)]">
          {/* Filters */}
          <div className="fixed top-16 left-64 right-0 bg-white z-10 py-2 px-6 border-b border-gray-200">
            <div className="flex space-x-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-3 py-1 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                    activeFilter === category
                      ? 'bg-[#a32e76] text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Video Player and Suggestions */}
          <div className="mt-14 max-w-[1280px] mx-auto">
            {loading ? (
              <p className="text-center text-gray-500 mt-8">Loading videos...</p>
            ) : error ? (
              <p className="text-center text-red-500 mt-8">{error}</p>
            ) : (
              <>
                {/* Video Player (Matching Screenshot) */}
                {activeVideo && (
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-2/3">
                      <div className="aspect-video">
                        <ReactPlayer
                          url={activeVideo.youtube_url}
                          width="100%"
                          height="100%"
                          playing={false} // Removed playing and controls since not in screenshot
                          controls={false}
                          className="rounded-lg overflow-hidden"
                          config={{
                            youtube: {
                              playerVars: { modestbranding: 1, rel: 0 },
                            },
                          }}
                        />
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                        <h1 className="text-lg font-semibold text-gray-900 mb-2">
                          {activeVideo.title}
                        </h1>
                        <p className="text-sm text-gray-600 mb-2">
                          {activeVideo.description || 'No description available.'}
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                          <span>{activeVideo.views} Views</span>
                          <span>{new Date(activeVideo.upload_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1 text-[#a32e76]" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                            </svg>
                            {activeVideo.likes || 0} Likes
                          </span>
                          {activeVideo.comments && <span>{activeVideo.comments} Comments</span>}
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <img
                            src={activeVideo.doctor?.avatar || 'default-avatar.png'} // Placeholder for doctor avatar
                            alt={activeVideo.doctor?.name || 'Doctor'}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-sm text-gray-700">{activeVideo.doctor?.name || 'Unknown'}</span>
                          {activeVideo.doctor?.verified && (
                            <svg className="w-4 h-4 text-[#a32e76]" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                          )}
                          <button className="ml-2 text-sm text-[#a32e76] hover:text-[#8a2663]">Following</button>
                          <button className="ml-2 text-sm text-[#a32e76] hover:text-[#8a2663]">Follow</button>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <button className="text-sm text-[#a32e76] hover:text-[#8a2663] flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                            </svg>
                            2.6k
                          </button>
                          <button className="text-sm text-[#a32e76] hover:text-[#8a2663] flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                            </svg>
                            Download
                          </button>
                        </div>
                        <p className="mt-2 text-xs text-gray-500">
                          LifeCourse ©2024 | Terms & Privacy Policy
                        </p>
                      </div>
                    </div>
                    <div className="w-full lg:w-1/3 mt-4 lg:mt-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggested For You</h3>
                      <div className="space-y-3">
                        {relatedVideos.map((video) => (
                          <div
                            key={video._id}
                            className="flex gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                            onClick={() => handlePlay(video)}
                          >
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-40 h-24 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-[#a32e76]">
                                {video.title}
                              </h4>
                              <p className="text-xs text-gray-500 mt-1">
                                {video.doctor?.name || 'Unknown'}
                              </p>
                              <div className="text-xs text-gray-500 mt-1 flex items-center space-x-2">
                                <span>{video.views} Views</span>
                                <span>{new Date(video.upload_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* All Videos (Homepage) when no video is active */}
                {!activeVideo && (
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {currentVideos.map((video) => (
                        <div
                          key={video._id}
                          className="cursor-pointer group"
                          onClick={() => handlePlay(video)}
                        >
                          <div className="relative aspect-video rounded-lg overflow-hidden">
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                            {video.duration && (
                              <span className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
                                {video.duration}
                              </span>
                            )}
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity">
                              <Play className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </div>
                          <div className="mt-2">
                            <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-[#a32e76]">
                              {video.title}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                              {video.doctor?.name || 'Unknown'}
                            </p>
                            <div className="text-xs text-gray-500 mt-1 flex items-center space-x-2">
                              <span>{video.views} Views</span>
                              <span>{new Date(video.upload_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center mt-6 space-x-4">
                      <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        className="p-2 text-[#a32e76] disabled:text-gray-400 hover:text-[#8a2663] disabled:hover:text-gray-400"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <span className="text-sm text-gray-700">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        className="p-2 text-[#a32e76] disabled:text-gray-400 hover:text-[#8a2663] disabled:hover:text-gray-400"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideosPage;