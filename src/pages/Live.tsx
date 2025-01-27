import { useState, useEffect, useRef } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { FaPlayCircle } from 'react-icons/fa';

export function Live() {
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  const liveSession = {
    title: "Understanding Pregnancy Health",
    doctor: "Dr. Sarah Johnson",
    time: "Starting in 5 minutes",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=450",  
  };

  const upcomingSessions = [
    {
      title: "Mental Health Awareness",
      doctor: "Dr. Michael Chen",
      time: "Today at 3:00 PM",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=450",
    },
    {
      title: "Pediatric Care Basics",
      doctor: "Dr. Lisa Williams",
      time: "Today at 4:30 PM",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=450",
    },
  ];

  const filteredLiveSession = searchQuery
    ? liveSession.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      liveSession.doctor.toLowerCase().includes(searchQuery.toLowerCase())
      ? [liveSession]
      : []
    : [liveSession];

  const filteredUpcomingSessions = searchQuery
    ? upcomingSessions.filter((session) => {
        return (
          session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          session.doctor.toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
    : upcomingSessions;

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 relative">
       <Sidebar />
       <div className="flex-1 overflow-y-auto">
       <div className="sticky top-0 z-50 bg-gray-100">
          <Header onSearch={(query) => setSearchQuery(query)} />
        </div>
        <div className="max-w-7xl mx-auto">
          {/* <h1 className="text-3xl font-semibold text-gray-900 mb-6">Live Sessions</h1> */}

          {/* Live Session Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ongoing Live Session</h2>
            {filteredLiveSession.map((session, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 flex items-center space-x-6 mb-8"
              >
                <img
                  src={session.image}
                  alt={session.doctor}
                  className="w-32 h-32 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">{session.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{session.doctor}</p>
                  <p className="text-sm text-gray-500 mt-1">{session.time}</p>
                  <button className="mt-4 px-6 py-3 bg-[#A32E76] text-white rounded-full text-sm shadow-lg hover:bg-[#B84F90] transition-all flex items-center space-x-2">
                    <FaPlayCircle />
                    <span>Join Now</span>
                  </button>
                </div>
              </div>
            ))}
          </section>

          {/* Upcoming Sessions Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Live Sessions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredUpcomingSessions.map((session, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-4"
                >
                  <img
                    src={session.image}
                    alt={session.doctor}
                    className="w-full h-40 rounded-lg object-cover mb-4"
                  />
                  <h3 className="text-lg font-medium text-gray-800">{session.title}</h3>
                  <p className="text-sm text-gray-500">{session.doctor}</p>
                  <p className="text-xs text-gray-400">{session.time}</p>
                  <button className="mt-3 px-6 py-2 text-[#A32E76] border border-[#A32E76] rounded-lg text-sm hover:bg-[#A32E76] hover:text-white transition">
                    Notify Me
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Additional Section (Optional) */}
          <section className="mt-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Session Highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Example Highlighted Card */}
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6">
                <h3 className="text-lg font-medium text-gray-800">Postpartum Care Tips</h3>
                <p className="text-sm text-gray-500 mt-2">A quick overview of essential postpartum health tips.</p>
                <button className="mt-4 px-6 py-2 bg-[#A32E76] text-white rounded-lg text-sm hover:bg-[#B84F90] transition">
                  Watch Replay
                </button>
              </div>
              {/* More highlighted cards can go here */}
            </div>
          </section>
        </div>
        </div>
       
    </div>
  );
}
